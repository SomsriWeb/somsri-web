import { readFile, realpath } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { config, mimeTypes, repoRoot } from './config';
import { finishCrc32c, hashLocalFile, resolvePaths, updateCrc32c } from './manifest';
import { isRetryable, retryTransient, StorageError, type ObjectStorage, type RemoteObject } from './storage';

export type FileStatus = 'pending' | 'failed' | 'verified' | 'conflict' | 'uploaded';
export interface ManifestFile {
    sourcePath: string;
    oldPublicPath: string;
    objectKey: string;
    publicUrl: string;
    size: number;
    checksum: { algorithm: 'crc32c'; encoding: 'base64'; value: string };
    mimeType: string;
    status: FileStatus;
    attempts: number;
    generation: string | null;
    createdByMigration: boolean;
    lastError: string | null;
    verifiedAt: string | null;
}
export interface MediaManifest {
    schemaVersion: number;
    bucket: string;
    publicBaseUrl: string;
    endpoint: string;
    region: string;
    connection: string;
    files: ManifestFile[];
    [key: string]: unknown;
}

export interface RunSummary {
    uploaded: number;
    verified: number;
    skipped: number;
    failed: number;
    conflict: number;
}

export interface ReconcileSummary {
    checked: number;
    verified: number;
    unresolved: number;
    errors: number;
    skipped: number;
}

export function emptySummary(): RunSummary {
    return { uploaded: 0, verified: 0, skipped: 0, failed: 0, conflict: 0 };
}

export function selectEligibleFiles(manifest: MediaManifest, limit?: number): ManifestFile[] {
    if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) {
        throw new Error('--limit must be a positive integer');
    }
    const eligible = manifest.files.filter((file) => file.status === 'pending' || file.status === 'failed');
    return limit === undefined ? eligible : eligible.slice(0, limit);
}

export function validateManifest(input: unknown): asserts input is MediaManifest {
    if (!input || typeof input !== 'object') throw new Error('Invalid manifest');
    const manifest = input as MediaManifest;
    if (manifest.schemaVersion !== 1 || manifest.bucket !== config.bucket || Object.hasOwn(manifest, 'prefix')
        || manifest.publicBaseUrl !== config.publicBaseUrl || manifest.endpoint !== config.endpoint
        || manifest.region !== config.region || manifest.connection !== config.connection
        || !Array.isArray(manifest.files) || !manifest.files.length) {
        throw new Error('Manifest configuration differs from the approved PoC settings');
    }
    const keys = new Set<string>();
    for (const file of manifest.files) {
        if (!file || typeof file.sourcePath !== 'string' || !file.sourcePath.startsWith('public/')) throw new Error('Invalid manifest sourcePath');
        const relative = file.sourcePath.slice('public/'.length);
        const expected = resolvePaths(relative);
        if (file.sourcePath !== expected.sourcePath || file.oldPublicPath !== expected.oldPublicPath
            || file.objectKey !== expected.objectKey || file.publicUrl !== expected.publicUrl
            || keys.has(file.objectKey)) throw new Error(`Invalid or duplicate mapping: ${file.sourcePath}`);
        keys.add(file.objectKey);
        if (file.mimeType !== mimeTypes[`.${relative.split('.').pop()?.toLowerCase()}`]
            || !Number.isSafeInteger(file.size) || file.size < 0
            || file.checksum?.algorithm !== 'crc32c' || file.checksum.encoding !== 'base64'
            || !/^[A-Za-z0-9+/]{6}==$/.test(file.checksum.value)
            || !['pending', 'failed', 'verified', 'conflict', 'uploaded'].includes(file.status)
            || !Number.isSafeInteger(file.attempts) || file.attempts < 0) {
            throw new Error(`Invalid manifest metadata: ${file.sourcePath}`);
        }
    }
}

export function matchesRemote(file: ManifestFile, remote: RemoteObject | null): boolean {
    return !!remote && remote.size === file.size && remote.crc32c === file.checksum.value;
}

async function checkLocal(file: ManifestFile, sourceRoot: string): Promise<Uint8Array> {
    const publicRoot = await realpath(join(sourceRoot, 'public'));
    const source = join(sourceRoot, file.sourcePath);
    const resolved = await realpath(source);
    if (!resolved.startsWith(`${publicRoot}${sep}`)) throw new Error('Source resolves outside public/');
    const local = await hashLocalFile(source);
    if (local.size !== file.size || local.checksum.value !== file.checksum.value) throw new Error('Local source differs from manifest');
    // Rehash bytes actually sent to catch changes between the first hash and read.
    const bytes = await readFile(source);
    if (bytes.length !== file.size || finishCrc32c(updateCrc32c(0xffffffff, bytes)) !== file.checksum.value) {
        throw new Error('Local source changed before upload');
    }
    return bytes;
}

function safeError(error: unknown): string {
    if (error instanceof StorageError) return error.message;
    if (error instanceof ConflictError) return error.message;
    if (error instanceof Error && /^(Local source|Source resolves)/.test(error.message)) return error.message;
    return 'Upload or verification failed; inspect local logs without exposing credentials';
}

export async function uploadManifest(manifest: MediaManifest, storage: ObjectStorage, checkpoint: () => Promise<void>, sourceRoot = repoRoot, limit?: number): Promise<RunSummary> {
    const summary = emptySummary();
    const selected = selectEligibleFiles(manifest, limit);
    summary.skipped = manifest.files.length - selected.length;
    for (const file of selected) {
        let wroteObject = false;
        try {
            const bytes = await checkLocal(file, sourceRoot);
            let remote = await retryTransient(() => storage.head(file.objectKey));
            if (remote) {
                if (!matchesRemote(file, remote)) throw new ConflictError();
                file.status = 'verified';
                file.generation = remote.generation;
                file.verifiedAt = new Date().toISOString();
                file.lastError = null;
                summary.verified++;
                summary.skipped++;
                continue;
            }
            for (let retry = 0; ; retry++) {
                file.attempts++;
                try {
                    await storage.put(file.objectKey, bytes, file.mimeType, file.checksum.value);
                    wroteObject = true;
                    summary.uploaded++;
                    break;
                } catch (error) {
                    // A timed-out PUT may have succeeded. Reconcile before any retry.
                    remote = await retryTransient(() => storage.head(file.objectKey));
                    if (remote) {
                        if (!matchesRemote(file, remote)) throw new ConflictError();
                        // Ownership is unknown after an ambiguous response.
                        break;
                    }
                    if (!isRetryable(error) || retry >= 5) throw error;
                    await new Promise((resolve) => setTimeout(resolve, Math.min(8000, 200 * 2 ** retry) + Math.floor(Math.random() * 100)));
                }
            }
            remote = await retryTransient(() => storage.head(file.objectKey));
            if (!matchesRemote(file, remote)) throw new ConflictError();
            file.status = 'verified';
            file.generation = remote!.generation;
            file.createdByMigration = wroteObject;
            file.verifiedAt = new Date().toISOString();
            file.lastError = null;
            summary.verified++;
            if (!wroteObject) summary.skipped++;
        } catch (error) {
            file.status = error instanceof ConflictError ? 'conflict' : 'failed';
            file.lastError = safeError(error);
            summary[file.status]++;
        } finally {
            // One atomic checkpoint per attempted file, including successes and errors.
            await checkpoint();
        }
    }
    return summary;
}

class ConflictError extends Error {
    constructor() { super('Remote object exists but size or CRC32C differs (or CRC32C is unavailable)'); }
}

export async function verifyManifest(manifest: MediaManifest, storage: ObjectStorage): Promise<RunSummary> {
    const summary = emptySummary();
    for (const file of manifest.files) {
        try {
            const remote = await retryTransient(() => storage.head(file.objectKey));
            if (!remote) {
                if (file.status === 'pending' || file.status === 'failed') summary.skipped++;
                else summary.failed++;
            }
            else if (!matchesRemote(file, remote) || (file.generation && remote.generation !== file.generation)) summary.conflict++;
            else summary.verified++;
        } catch { summary.failed++; }
    }
    return summary;
}

export async function reconcileManifest(manifest: MediaManifest, storage: ObjectStorage, checkpoint: () => Promise<void>): Promise<ReconcileSummary> {
    const eligible = manifest.files.filter((file) => file.status === 'conflict' || file.status === 'failed');
    const summary: ReconcileSummary = { checked: 0, verified: 0, unresolved: 0, errors: 0, skipped: manifest.files.length - eligible.length };
    for (const file of eligible) {
        summary.checked++;
        let remote: RemoteObject | null;
        try { remote = await retryTransient(() => storage.head(file.objectKey)); }
        catch {
            summary.errors++;
            continue;
        }
        if (!matchesRemote(file, remote) || !remote?.generation) {
            summary.unresolved++;
            continue;
        }
        file.status = 'verified';
        file.generation = remote.generation;
        file.verifiedAt = new Date().toISOString();
        file.lastError = null;
        await checkpoint();
        summary.verified++;
    }
    return summary;
}
