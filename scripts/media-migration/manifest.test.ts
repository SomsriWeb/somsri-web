import { describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildManifest, finishCrc32c, resolvePaths, updateCrc32c } from './manifest';

describe('local media plan', () => {
    test('CRC32C uses the standard check vector and supports streamed chunks', () => {
        const first = updateCrc32c(0xffffffff, Buffer.from('1234'));
        expect(finishCrc32c(updateCrc32c(first, Buffer.from('56789')))).toBe('4waSgw==');
        expect(finishCrc32c(0xffffffff)).toBe('AAAAAA==');
    });

    test('preserves Thai, spaces, nesting and literal percent signs without URL ambiguity', () => {
        const path = 'blog/ภาษาไทย/เสื้อ สีขาว 100% #1?.JPG';
        const result = resolvePaths(path);
        expect(result.objectKey).toBe(`studio-poc/${path}`);
        const url = new URL(result.publicUrl);
        expect(url.search).toBe('');
        expect(url.hash).toBe('');
        expect(decodeURIComponent(url.pathname)).toBe(`/somsri-web/studio-poc/${path}`);
        expect(result.publicUrl).toContain('%20');
        expect(result.publicUrl).toContain('%25');
    });

    test('rejects unsafe paths', () => {
        for (const path of ['../a.png', '/a.png', 'a//b.png', 'a/./b.png', 'a\\b.png', 'a\n.png', '']) {
            expect(() => resolvePaths(path)).toThrow();
        }
        expect(() => resolvePaths('ก'.repeat(400) + '.png')).toThrow();
    });

    test('builds pending records from local bytes and ignores non-media', async () => {
        const root = await mkdtemp(join(tmpdir(), 'somsri-media-plan-test-'));
        await mkdir(join(root, 'public', 'nested'), { recursive: true });
        await writeFile(join(root, 'public', 'nested', 'เสื้อ ขาว.JPG'), '123456789');
        await writeFile(join(root, 'public', 'favicon.ico'), '');
        await writeFile(join(root, 'public', 'robots.txt'), 'ignored');
        const manifest = await buildManifest(root, 'test', null);
        expect(manifest.summary.fileCount).toBe(2);
        expect(manifest.summary.totalBytes).toBe(9);
        expect(manifest.summary.ignoredFiles).toBe(1);
        const file = manifest.files.find((file) => file.mimeType === 'image/jpeg')!;
        expect(file.checksum.value).toBe('4waSgw==');
        expect(file.sourcePath).toBe('public/nested/เสื้อ ขาว.JPG');
        expect(file.status).toBe('pending');
        expect(file.generation).toBeNull();
        expect(manifest.dryRun).toBe(true);
    });

    test('rejects symlinks rather than reading outside public', async () => {
        const root = await mkdtemp(join(tmpdir(), 'somsri-media-plan-test-'));
        await mkdir(join(root, 'public'));
        await symlink('/does-not-exist', join(root, 'public', 'link.jpg'));
        await expect(buildManifest(root, 'test', null)).rejects.toThrow('Symlink');
    });
});
