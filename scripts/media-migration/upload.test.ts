import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { repoRoot } from './config';
import { buildManifest } from './manifest';
import { createGcsStorage, retryTransient, StorageError, type ObjectStorage, type RemoteObject } from './storage';
import { reconcileManifest, selectEligibleFiles, uploadManifest, validateManifest, verifyManifest } from './upload';

async function fixture() {
    const root = await mkdtemp(join(tmpdir(), 'somsri-phase2-test-'));
    await mkdir(join(root, 'public', 'blog'), { recursive: true });
    await writeFile(join(root, 'public', 'blog', 'ไทย space.jpg'), '123456789');
    const manifest = await buildManifest(root, 'fixture', null);
    validateManifest(manifest);
    return { root, manifest, file: manifest.files[0]! };
}

function fakeStorage(): ObjectStorage & { objects: Map<string, RemoteObject>; puts: number } {
    const objects = new Map<string, RemoteObject>();
    return {
        objects,
        puts: 0,
        async head(key) { return objects.get(key) ?? null; },
        async put(key, bytes, _mime, crc32c) {
            this.puts++;
            if (objects.has(key)) throw new StorageError(412, 'PUT');
            objects.set(key, { size: bytes.length, crc32c, generation: '17' });
        },
    };
}

async function multiFileFixture() {
    const root = await mkdtemp(join(tmpdir(), 'somsri-limit-test-'));
    await mkdir(join(root, 'public', 'blog'), { recursive: true });
    for (const name of ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg']) {
        await writeFile(join(root, 'public', 'blog', name), name);
    }
    const manifest = await buildManifest(root, 'fixture', null);
    manifest.files[1]!.status = 'verified';
    manifest.files[2]!.status = 'failed';
    return { root, manifest };
}

describe('Phase 2 resume and verification', () => {
    test('--limit selects only the first N pending/failed records and checkpoints only those', async () => {
        const { root, manifest } = await multiFileFixture();
        expect(selectEligibleFiles(manifest, 2).map((file) => file.objectKey)).toEqual(['blog/a.jpg', 'blog/c.jpg']);
        expect(() => selectEligibleFiles(manifest, 0)).toThrow();
        const storage = fakeStorage();
        let checkpoints = 0;
        const result = await uploadManifest(manifest, storage, async () => { checkpoints++; }, root, 2);
        expect(result).toEqual({ uploaded: 2, verified: 2, skipped: 2, failed: 0, conflict: 0 });
        expect(storage.puts).toBe(2);
        expect(checkpoints).toBe(2);
        expect(manifest.files.map((file) => file.status)).toEqual(['verified', 'verified', 'verified', 'pending']);
    });

    test('--dry-run lists limited eligible files without credentials, remote requests, locks or manifest writes', async () => {
        const { root, manifest } = await multiFileFixture();
        const path = join(root, 'manifest.json');
        await writeFile(path, JSON.stringify(manifest));
        const before = await readFile(path);
        const result = spawnSync(process.execPath, ['run', join(repoRoot, 'scripts/media-migration/cli.ts'),
            'upload', '--manifest', path, '--limit', '2', '--dry-run'], {
            cwd: repoRoot,
            encoding: 'utf8',
            env: { ...process.env, S3_ACCESS_KEY_ID: '', S3_SECRET_ACCESS_KEY: '' },
        });
        expect(result.status).toBe(0);
        expect(result.stdout).toContain(`Manifest: ${path}`);
        expect(result.stdout).toContain('Bucket: somsri-web');
        expect(result.stdout).toContain('Eligible count: 3');
        expect(result.stdout).toContain('Process count: 2');
        expect(result.stdout).toContain('public/blog/a.jpg -> blog/a.jpg');
        expect(result.stdout).toContain('public/blog/c.jpg -> blog/c.jpg');
        expect(result.stdout).not.toContain('public/blog/d.jpg -> blog/d.jpg');
        expect(await readFile(path)).toEqual(before);
        await expect(stat(`${path}.lock`)).rejects.toThrow();
    });

    test('uploads once, verifies, checkpoints, and skips verified records on resume', async () => {
        const { root, manifest, file } = await fixture();
        const storage = fakeStorage();
        let checkpoints = 0;
        const first = await uploadManifest(manifest, storage, async () => { checkpoints++; }, root);
        expect(first).toEqual({ uploaded: 1, verified: 1, skipped: 0, failed: 0, conflict: 0 });
        expect(file.status).toBe('verified');
        expect(file.createdByMigration).toBe(true);
        expect(file.generation).toBe('17');
        expect(checkpoints).toBe(1);
        const second = await uploadManifest(manifest, storage, async () => { checkpoints++; }, root);
        expect(second.skipped).toBe(1);
        expect(storage.puts).toBe(1);
        expect(checkpoints).toBe(1);
        const before = JSON.stringify(manifest);
        expect((await verifyManifest(manifest, storage)).verified).toBe(1);
        expect(JSON.stringify(manifest)).toBe(before);
    });

    test('adopts a matching existing object without overwrite', async () => {
        const { root, manifest, file } = await fixture();
        const storage = fakeStorage();
        storage.objects.set(file.objectKey, { size: file.size, crc32c: file.checksum.value, generation: '19' });
        const result = await uploadManifest(manifest, storage, async () => {}, root);
        expect(result).toEqual({ uploaded: 0, verified: 1, skipped: 1, failed: 0, conflict: 0 });
        expect(file.createdByMigration).toBe(false);
        expect(storage.puts).toBe(0);
    });

    test('marks different remote data as conflict without PUT', async () => {
        const { root, manifest, file } = await fixture();
        const storage = fakeStorage();
        storage.objects.set(file.objectKey, { size: file.size, crc32c: 'AAAAAA==', generation: '20' });
        let checkpoints = 0;
        const result = await uploadManifest(manifest, storage, async () => { checkpoints++; }, root);
        expect(result.conflict).toBe(1);
        expect(file.status).toBe('conflict');
        expect(storage.puts).toBe(0);
        expect(checkpoints).toBe(1);
    });

    test('reconciles a timed-out successful PUT before retry', async () => {
        const { root, manifest, file } = await fixture();
        const storage = fakeStorage();
        const put = storage.put.bind(storage);
        storage.put = async (...args) => {
            await put(...args);
            throw new StorageError(null, 'PUT');
        };
        const result = await uploadManifest(manifest, storage, async () => {}, root);
        expect(result.verified).toBe(1);
        expect(result.uploaded).toBe(0);
        expect(storage.puts).toBe(1);
        expect(file.createdByMigration).toBe(false);
    });

    test('handles a concurrent create-only 412 as conflict', async () => {
        const { root, manifest, file } = await fixture();
        const storage = fakeStorage();
        storage.put = async () => {
            storage.puts++;
            storage.objects.set(file.objectKey, { size: file.size + 1, crc32c: 'AAAAAA==', generation: '22' });
            throw new StorageError(412, 'PUT');
        };
        const result = await uploadManifest(manifest, storage, async () => {}, root);
        expect(result.conflict).toBe(1);
        expect(file.status).toBe('conflict');
        expect(storage.puts).toBe(1);
    });

    test('retries 429/5xx five times at most and never retries 403', async () => {
        let attempts = 0;
        await expect(retryTransient(async () => {
            attempts++;
            throw new StorageError(429, 'HEAD');
        }, async () => {})).rejects.toBeInstanceOf(StorageError);
        expect(attempts).toBe(6);
        attempts = 0;
        await expect(retryTransient(async () => {
            attempts++;
            throw new StorageError(403, 'HEAD');
        }, async () => {})).rejects.toBeInstanceOf(StorageError);
        expect(attempts).toBe(1);
    });

    test('verify reports remote mismatch without changing manifest or remote', async () => {
        const { manifest, file } = await fixture();
        const storage = fakeStorage();
        storage.objects.set(file.objectKey, { size: file.size + 1, crc32c: file.checksum.value, generation: '21' });
        const before = JSON.stringify(manifest);
        const result = await verifyManifest(manifest, storage);
        expect(result.conflict).toBe(1);
        expect(JSON.stringify(manifest)).toBe(before);
        expect(storage.puts).toBe(0);
    });

    test('reconcile HEADs only conflict/failed, checkpoints matches, and never PUTs', async () => {
        const { manifest } = await multiFileFixture();
        manifest.files[0]!.status = 'conflict';
        manifest.files[1]!.status = 'failed';
        manifest.files[2]!.status = 'failed';
        manifest.files[0]!.lastError = 'old conflict';
        manifest.files[1]!.lastError = 'old failure';
        manifest.files[2]!.lastError = 'old mismatch';
        const seen: string[] = [];
        const storage: ObjectStorage = {
            async head(key) {
                seen.push(key);
                const file = manifest.files.find((entry) => entry.objectKey === key)!;
                return {
                    size: key === manifest.files[2]!.objectKey ? file.size + 1 : file.size,
                    crc32c: file.checksum.value,
                    generation: key === manifest.files[0]!.objectKey ? '1790571296230000' : '43',
                };
            },
            async put() { throw new Error('Reconcile must never PUT'); },
        };
        let checkpoints = 0;
        const summary = await reconcileManifest(manifest, storage, async () => { checkpoints++; });
        expect(summary).toEqual({ checked: 3, verified: 2, unresolved: 1, errors: 0, skipped: 1 });
        expect(seen).toEqual(manifest.files.slice(0, 3).map((file) => file.objectKey));
        expect(checkpoints).toBe(2);
        expect(manifest.files.map((file) => file.status)).toEqual(['verified', 'verified', 'failed', 'pending']);
        expect(manifest.files[0]!.generation).toBe('1790571296230000');
        expect(manifest.files[0]!.lastError).toBeNull();
        expect(manifest.files[1]!.generation).toBe('43');
        expect(manifest.files[2]!.generation).toBeNull();
        expect(manifest.files[2]!.lastError).toBe('old mismatch');
        expect(manifest.files[0]!.verifiedAt).toBeTruthy();
    });

    test('rejects manifests made with the old studio-poc prefix', async () => {
        const { manifest } = await fixture();
        const old = structuredClone(manifest) as typeof manifest & { prefix?: string };
        old.prefix = 'studio-poc';
        expect(() => validateManifest(old)).toThrow();
    });

    test('PUT uses only x-goog headers with HMAC signing, create-only precondition and CRC32C', async () => {
        const originalFetch = globalThis.fetch;
        const seen: Request[] = [];
        globalThis.fetch = async (input: RequestInfo | URL) => {
            const request = input as Request;
            seen.push(request);
            if (request.method === 'HEAD') return new Response(null, {
                status: 200,
                headers: { 'content-length': '9', 'x-goog-hash': 'crc32c=4waSgw==', 'x-goog-generation': '42' },
            });
            return new Response(null, { status: 200 });
        };
        try {
            const storage = createGcsStorage('fake-access', 'fake-secret');
            await storage.put('blog/ไทย space.jpg', Buffer.from('123456789'), 'image/jpeg', '4waSgw==');
            const remote = await storage.head('blog/ไทย space.jpg');
            expect(seen[0]!.method).toBe('PUT');
            expect(seen[0]!.headers.get('x-goog-if-generation-match')).toBe('0');
            expect(seen[0]!.headers.get('x-goog-hash')).toBe('crc32c=4waSgw==');
            expect(seen[0]!.headers.get('x-goog-content-sha256')).toMatch(/^[a-f0-9]{64}$/);
            expect(seen[0]!.headers.get('authorization')).toMatch(/^GOOG4-HMAC-SHA256 Credential=fake-access\/.*SignedHeaders=content-type;host;x-goog-content-sha256;x-goog-date;x-goog-hash;x-goog-if-generation-match, Signature=[a-f0-9]{64}$/);
            expect([...seen[0]!.headers.keys()].filter((name) => name.startsWith('x-amz-'))).toEqual([]);
            expect(decodeURIComponent(new URL(seen[0]!.url).pathname)).toBe('/somsri-web/blog/ไทย space.jpg');
            expect(remote).toEqual({ size: 9, crc32c: '4waSgw==', generation: '42' });
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test('HEAD parses comma-separated hashes and prefers stored content length', async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async () => new Response(null, {
            status: 200,
            headers: {
                'content-length': '0',
                'x-goog-stored-content-length': '9',
                'x-goog-hash': 'md5=AmypRNBRTYIdmSLGJZfHXA==, crc32c=4waSgw==',
                'x-goog-generation': '42',
            },
        });
        try {
            const storage = createGcsStorage('fake-access', 'fake-secret', async () => {
                throw new Error('Raw HEAD should not be needed');
            });
            expect(await storage.head('blog/test.jpg')).toEqual({ size: 9, crc32c: '4waSgw==', generation: '42' });
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test('HEAD recovers CRC32C from repeated raw headers when Bun Fetch exposes only MD5', async () => {
        const { root, manifest, file } = await fixture();
        const originalFetch = globalThis.fetch;
        let puts = 0;
        let rawReads = 0;
        globalThis.fetch = async (input: RequestInfo | URL) => {
            const request = input as Request;
            if (request.method === 'PUT') puts++;
            return new Response(null, {
                status: 200,
                headers: {
                    'content-length': '0',
                    'x-goog-stored-content-length': '9',
                    'x-goog-hash': 'md5=AmypRNBRTYIdmSLGJZfHXA==',
                    'x-goog-generation': '42',
                },
            });
        };
        try {
            const storage = createGcsStorage('fake-access', 'fake-secret', async (signed) => {
                rawReads++;
                expect(signed.method).toBe('HEAD');
                expect(signed.headers.get('authorization')).toStartWith('AWS4-HMAC-SHA256 ');
                return {
                    status: 200,
                    statusText: 'OK',
                    rawHeaders: [
                        'content-length', '0',
                        'x-goog-stored-content-length', '9',
                        'x-goog-hash', 'crc32c=4waSgw==',
                        'X-Goog-Hash', 'md5=AmypRNBRTYIdmSLGJZfHXA==',
                        'x-goog-generation', '42',
                    ],
                };
            });
            const summary = await uploadManifest(manifest, storage, async () => {}, root);
            expect(summary.verified).toBe(1);
            expect(summary.uploaded).toBe(0);
            expect(puts).toBe(0);
            expect(rawReads).toBe(1);
            expect(file.status).toBe('verified');
            expect(file.generation).toBe('42');
            expect(file.checksum.value).toBe('4waSgw==');
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test('HTTP 400 PUT body and safe response metadata reach manifest lastError without credentials', async () => {
        const { root, manifest, file } = await fixture();
        const originalFetch = globalThis.fetch;
        const accessKey = 'test-access-key';
        const secretKey = 'test-secret-key';
        globalThis.fetch = async (input: RequestInfo | URL) => {
            const request = input as Request;
            if (request.method === 'HEAD') return new Response(null, { status: 404 });
            return new Response(`<Error><Code>InvalidArgument</Code><Message>Bad hash ${secretKey}</Message><Authorization>signed-value</Authorization></Error>`, {
                status: 400,
                statusText: 'Bad Request',
                headers: {
                    'content-type': 'application/xml',
                    'x-guploader-uploadid': 'request-123',
                    authorization: `AWS ${accessKey}:signature`,
                },
            });
        };
        try {
            const result = await uploadManifest(manifest, createGcsStorage(accessKey, secretKey), async () => {}, root);
            expect(result.failed).toBe(1);
            expect(file.lastError).toContain('PUT failed (HTTP 400)');
            expect(file.lastError).toContain('statusText="Bad Request"');
            expect(file.lastError).toContain('x-guploader-uploadid');
            expect(file.lastError).toContain('InvalidArgument');
            expect(file.lastError).toContain('[REDACTED]');
            expect(file.lastError).not.toContain(accessKey);
            expect(file.lastError).not.toContain(secretKey);
            expect(file.lastError).not.toContain('signed-value');
            expect(file.lastError).not.toContain('AWS ');
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test('HTTP 400 HEAD includes body and safe response headers', async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async () => new Response('<Error><Message>HEAD rejected</Message></Error>', {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'content-type': 'application/xml', authorization: 'secret-signature' },
        });
        try {
            await expect(createGcsStorage('key', 'secret').head('blog/test.jpg')).rejects.toThrow(/HEAD rejected/);
            await expect(createGcsStorage('key', 'secret').head('blog/test.jpg')).rejects.toThrow(/content-type/);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });
});
