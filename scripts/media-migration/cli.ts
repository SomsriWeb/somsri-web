import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { repoRoot } from './config';
import { buildManifest } from './manifest';
import { createGcsStorage } from './storage';
import { reconcileManifest, selectEligibleFiles, uploadManifest, validateManifest, verifyManifest } from './upload';

const usage = 'Usage: bun run scripts/media-migration/cli.ts plan | upload --manifest <path> [--limit N] (--dry-run | --execute) | verify --manifest <path> | reconcile --manifest <path>';

function parseUploadArgs(args: string[]) {
    let manifestPath: string | undefined;
    let limit: number | undefined;
    let mode: 'dry-run' | 'execute' | undefined;
    for (let index = 0; index < args.length; index++) {
        const arg = args[index];
        if (arg === '--manifest' && manifestPath === undefined) manifestPath = args[++index];
        else if (arg === '--limit' && limit === undefined) {
            const raw = args[++index];
            if (!raw || !/^[1-9]\d*$/.test(raw)) throw new Error('--limit must be a positive integer');
            limit = Number(raw);
            if (!Number.isSafeInteger(limit)) throw new Error('--limit must be a positive integer');
        } else if (arg === '--dry-run' && mode === undefined) mode = 'dry-run';
        else if (arg === '--execute' && mode === undefined) mode = 'execute';
        else throw new Error(usage);
    }
    if (!manifestPath || manifestPath.startsWith('--') || !mode) throw new Error(usage);
    return { manifestPath, limit, mode };
}

async function loadManifest(path: string) {
    const manifest: unknown = JSON.parse(await readFile(path, 'utf8'));
    validateManifest(manifest);
    return manifest;
}

function storageFromEnvironment() {
    const accessKey = process.env.S3_ACCESS_KEY_ID;
    const secretKey = process.env.S3_SECRET_ACCESS_KEY;
    if (!accessKey || !secretKey) throw new Error('Missing S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY');
    for (const [name, expected] of [
        ['S3_BUCKET', 'somsri-web'],
        ['S3_ENDPOINT', 'https://storage.googleapis.com'],
        ['S3_REGION', 'auto'],
    ]) {
        const actual = process.env[name];
        if (actual && actual !== expected) throw new Error(`${name} differs from the approved migration configuration`);
    }
    return createGcsStorage(accessKey, secretKey);
}

async function checkpoint(path: string, manifest: unknown) {
    const temporary = `${path}.${process.pid}.${randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    await rename(temporary, path);
}

async function main() {
    const args = process.argv.slice(2);
    if (args[0] === 'upload' || args[0] === 'verify' || args[0] === 'reconcile') {
        const upload = args[0] === 'upload';
        const reconcile = args[0] === 'reconcile';
        const options = upload ? parseUploadArgs(args.slice(1)) : undefined;
        if (!upload && (args.length !== 3 || args[1] !== '--manifest' || !args[2])) throw new Error(usage);
        const path = resolve(upload ? options!.manifestPath : args[2]!);
        const manifest = await loadManifest(path);
        if (upload) {
            const eligible = selectEligibleFiles(manifest);
            const selected = selectEligibleFiles(manifest, options!.limit);
            console.log(`Manifest: ${path}`);
            console.log(`Bucket: ${manifest.bucket}`);
            console.log(`Eligible count: ${eligible.length}`);
            console.log(`Process count: ${selected.length}`);
            if (options!.mode === 'dry-run') {
                for (const file of selected) console.log(`${file.sourcePath} -> ${file.objectKey}`);
                console.log('Dry-run complete. No remote requests or manifest changes.');
                return;
            }
            const storage = storageFromEnvironment();
            const lockPath = `${path}.lock`;
            const lock = await open(lockPath, 'wx', 0o600).catch(() => { throw new Error(`Manifest is locked or lock cannot be created: ${lockPath}`); });
            try {
                await lock.writeFile(`${process.pid}\n`);
                const summary = await uploadManifest(manifest, storage, () => checkpoint(path, manifest), repoRoot, options!.limit);
                console.log(`Upload result: ${JSON.stringify(summary)}`);
                const outstanding = {
                    pending: manifest.files.filter((file) => file.status === 'pending').length,
                    failed: manifest.files.filter((file) => file.status === 'failed').length,
                    conflict: manifest.files.filter((file) => file.status === 'conflict').length,
                };
                console.log(`Manifest outstanding: ${JSON.stringify(outstanding)}`);
                if (summary.failed || summary.conflict) process.exitCode = 1;
            } finally {
                await lock.close();
                await unlink(lockPath);
            }
        } else if (reconcile) {
            const storage = storageFromEnvironment();
            const eligible = manifest.files.filter((file) => file.status === 'conflict' || file.status === 'failed').length;
            console.log(`Manifest: ${path}`);
            console.log(`Bucket: ${manifest.bucket}`);
            console.log(`Reconcile candidates: ${eligible}`);
            const lockPath = `${path}.lock`;
            const lock = await open(lockPath, 'wx', 0o600).catch(() => { throw new Error(`Manifest is locked or lock cannot be created: ${lockPath}`); });
            try {
                await lock.writeFile(`${process.pid}\n`);
                const summary = await reconcileManifest(manifest, storage, () => checkpoint(path, manifest));
                console.log(`Reconcile result: ${JSON.stringify(summary)}`);
                if (summary.errors || summary.unresolved) process.exitCode = 1;
            } finally {
                await lock.close();
                await unlink(lockPath);
            }
        } else {
            const storage = storageFromEnvironment();
            const summary = await verifyManifest(manifest, storage);
            console.log(`Verification result: ${JSON.stringify(summary)}`);
            if (summary.failed || summary.conflict) process.exitCode = 1;
        }
        return;
    }
    if (args.length !== 1 || args[0] !== 'plan') {
        throw new Error(usage);
    }
    let sourceCommit: string | null = null;
    try {
        sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch { /* The manifest still describes the working tree without Git metadata. */ }
    const migrationId = `${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID()}`;
    console.log('Planning local media only: hashing public/; no credentials or network requests.');
    const manifest = await buildManifest(repoRoot, migrationId, sourceCommit);
    const outputDirectory = join(repoRoot, 'migrations', 'media', migrationId);
    await mkdir(outputDirectory, { recursive: true });
    const outputPath = join(outputDirectory, 'manifest.json');
    await writeFile(outputPath, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
    console.log(`Manifest: ${outputPath}`);
    console.log(`Files: ${manifest.summary.fileCount}; bytes: ${manifest.summary.totalBytes}; all statuses: pending.`);
    console.log('Dry-run complete. Nothing uploaded, deleted, or replaced.');
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : 'Plan failed');
    process.exitCode = 1;
});
