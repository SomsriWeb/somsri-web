import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { repoRoot } from './config';
import { buildManifest } from './manifest';

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1 || args[0] !== 'plan') {
        throw new Error('Usage: bun run scripts/media-migration/cli.ts plan (dry-run only; no other commands or flags supported)');
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
