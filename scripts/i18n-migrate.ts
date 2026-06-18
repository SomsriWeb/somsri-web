/**
 * One-off migration: content/page/*.md (Thai originals) → content-src/page/*.md
 * ------------------------------------------------------------------
 * Minimal "wrapper" strategy: tokenize only the SEO frontmatter
 * (title, description) into an `i18n` map with `th` filled and `en`
 * left blank (the generator falls back to th + warns until translated).
 * The MDC body is copied verbatim — shared skeleton, tokenize per page later.
 *
 *   bun scripts/i18n-migrate.ts          # write sources (skips existing)
 *   bun scripts/i18n-migrate.ts --force  # overwrite existing sources
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { SRC_DIR } from './i18n.config';

const ROOT = process.cwd();
const SRC_PAGE = path.join(ROOT, 'content', 'page');
const OUT_PAGE = path.join(ROOT, SRC_DIR, 'page');
const FORCE = process.argv.includes('--force');

// Ad-hoc English pages + already-migrated pilot — not Thai sources to convert.
const SKIP = new Set(['contact.md', 'contact-en.md', 'en.md', 'product-en.md']);

// Top-level string frontmatter fields to lift into the i18n map.
const I18N_FIELDS = ['title', 'description'] as const;

function splitFrontmatter(raw: string): { fmText: string; body: string } | null {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return null;
    return { fmText: m[1], body: m[2] };
}

async function migrateOne(file: string): Promise<'written' | 'skipped' | 'no-fm' | 'exists'> {
    const outPath = path.join(OUT_PAGE, file);
    if (existsSync(outPath) && !FORCE) return 'exists';

    const raw = await readFile(path.join(SRC_PAGE, file), 'utf8');
    const split = splitFrontmatter(raw);
    if (!split) return 'no-fm';

    const data = (parseYaml(split.fmText) ?? {}) as Record<string, unknown>;

    const i18n: Record<string, { th: string; en: string }> = {};
    const rest: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
        if ((I18N_FIELDS as readonly string[]).includes(k) && typeof v === 'string') {
            i18n[k] = { th: v, en: '' }; // en blank → filled in review pass
            rest[k] = `{{${k}}}`;
        } else {
            rest[k] = v;
        }
    }

    // i18n map first for readability, then the rest of the original frontmatter.
    const fmObject = { i18n, ...rest };
    const front = stringifyYaml(fmObject).trimEnd();
    const content = `---\n${front}\n---\n${split.body.startsWith('\n') ? '' : '\n'}${split.body}`;

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, content, 'utf8');
    return 'written';
}

const files = (await readdir(SRC_PAGE)).filter((f) => f.endsWith('.md') && !SKIP.has(f));
const tally: Record<string, number> = {};
for (const f of files) {
    const r = await migrateOne(f);
    tally[r] = (tally[r] ?? 0) + 1;
    if (r === 'no-fm') console.warn(`⚠️  ${f}: no frontmatter — skipped`);
}
console.log(`migrate done:`, tally, `(${files.length} candidates, SKIP=${[...SKIP].join(', ')})`);
