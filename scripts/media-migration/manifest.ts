import { createReadStream } from 'node:fs';
import { lstat, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { config, mimeTypes } from './config';

const crcTable = Array.from({ length: 256 }, (_, value) => {
    let crc = value;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0x82f63b78 : 0);
    return crc >>> 0;
});

export function updateCrc32c(crc: number, bytes: Uint8Array): number {
    for (const byte of bytes) crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff]!;
    return crc >>> 0;
}

export function finishCrc32c(crc: number): string {
    const bytes = Buffer.alloc(4);
    bytes.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
    return bytes.toString('base64');
}

export function resolvePaths(relativePath: string) {
    const segments = relativePath.split('/');
    if (!relativePath || segments.some((segment) => !segment || segment === '.' || segment === '..')
        || /[\\\u0000-\u001f\u007f]/u.test(relativePath)) {
        throw new Error(`Unsafe media path: ${JSON.stringify(relativePath)}`);
    }
    const objectKey = relativePath;
    if (Buffer.byteLength(objectKey, 'utf8') > 1024) throw new Error(`Object key exceeds 1024 bytes: ${relativePath}`);
    // Preserve Unicode/case/spaces in object keys. Encode URL segments once, never the separators.
    const encodedKey = objectKey.split('/').map((segment) => encodeURIComponent(segment)
        .replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
    return {
        sourcePath: `public/${relativePath}`,
        oldPublicPath: `/${relativePath}`,
        objectKey,
        publicUrl: `${config.publicBaseUrl}/${encodedKey}`,
    };
}

export async function hashLocalFile(path: string) {
    const before = await lstat(path, { bigint: true });
    if (!before.isFile() || before.isSymbolicLink()) throw new Error(`Not a regular file: ${path}`);
    let crc = 0xffffffff;
    let size = 0;
    for await (const chunk of createReadStream(path)) {
        const bytes = chunk as Buffer;
        size += bytes.length;
        crc = updateCrc32c(crc, bytes);
    }
    const after = await lstat(path, { bigint: true });
    if (!after.isFile() || before.ino !== after.ino || before.dev !== after.dev
        || before.size !== after.size || before.mtimeNs !== after.mtimeNs
        || before.ctimeNs !== after.ctimeNs || BigInt(size) !== after.size) {
        throw new Error(`Source changed while hashing; retry plan: ${path}`);
    }
    return { size, checksum: { algorithm: 'crc32c', encoding: 'base64', value: finishCrc32c(crc) } };
}

export async function buildManifest(root: string, migrationId: string, sourceCommit: string | null) {
    const publicRoot = join(root, 'public');
    const rootStat = await lstat(publicRoot);
    if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) throw new Error('public/ must be a real directory');
    const paths: string[] = [];
    let ignoredFiles = 0;
    async function walk(directory: string, prefix = '') {
        const entries = await readdir(directory, { withFileTypes: true });
        entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        for (const entry of entries) {
            const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
            if (entry.isSymbolicLink()) throw new Error(`Symlink is not allowed in public/: ${relative}`);
            if (entry.isDirectory()) await walk(join(directory, entry.name), relative);
            else if (entry.isFile()) {
                if (mimeTypes[extname(entry.name).toLowerCase()]) paths.push(relative);
                else ignoredFiles++;
            } else throw new Error(`Unsupported filesystem entry: ${relative}`);
        }
    }
    await walk(publicRoot);
    if (!paths.length) throw new Error('No supported media found; manifest not written');

    const normalizedKeys = new Map<string, string>();
    const validatedPaths = paths.map((path) => {
        const resolved = resolvePaths(path);
        const normalizedKey = resolved.objectKey.normalize('NFC');
        const existing = normalizedKeys.get(normalizedKey);
        if (existing !== undefined) throw new Error(`Unicode-normalized key collision: ${existing} / ${path}`);
        normalizedKeys.set(normalizedKey, path);
        return { path, resolved };
    });

    const files = [];
    const countsByExtension: Record<string, number> = {};
    for (const { path, resolved } of validatedPaths) {
        const extension = extname(path).toLowerCase();
        const hash = await hashLocalFile(join(publicRoot, path));
        countsByExtension[extension] = (countsByExtension[extension] ?? 0) + 1;
        files.push({
            ...resolved,
            ...hash,
            mimeType: mimeTypes[extension]!,
            status: 'pending',
            attempts: 0,
            generation: null,
            createdByMigration: false,
            lastError: null,
            verifiedAt: null,
        });
    }
    return {
        schemaVersion: 1,
        phase: 'plan',
        dryRun: true,
        migrationId,
        generatedAt: new Date().toISOString(),
        sourceCommit,
        sourceState: 'working-tree',
        ...config,
        mimeTypeSource: 'extension',
        summary: {
            fileCount: files.length,
            totalBytes: files.reduce((sum, file) => sum + file.size, 0),
            countsByExtension,
            ignoredFiles,
        },
        files,
    };
}
