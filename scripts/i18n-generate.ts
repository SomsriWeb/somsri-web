/**
 * i18n generator
 * ------------------------------------------------------------------
 * Reads authoring sources from `content-src/**` (skeleton + {{token}} +
 * an `i18n:` map in frontmatter) and emits one plain markdown file per
 * locale into `content/<locale>/**` (tokens replaced, `i18n` map stripped,
 * `language` injected). The output dirs are gitignored — never edit them.
 *
 * Usage:
 *   bun scripts/i18n-generate.ts            # one-shot build
 *   bun scripts/i18n-generate.ts --clean    # wipe locale output dirs first
 *   bun scripts/i18n-generate.ts --watch    # rebuild on source changes
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { DEFAULT_LOCALE, LOCALES, OUT_DIR, SRC_DIR, SRC_GLOBS, type Locale } from './i18n.config';

const ROOT = process.cwd();
const TOKEN_RE = /\{\{\s*([\w.-]+)\s*\}\}/g;

const args = new Set(process.argv.slice(2));
const CLEAN = args.has('--clean');
const WATCH = args.has('--watch');

type Frontmatter = Record<string, unknown> & {
    i18n?: Record<string, Partial<Record<Locale, string>>>;
};

function splitFrontmatter(raw: string): { data: Frontmatter; body: string } {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: raw };
    return { data: (parseYaml(m[1]) ?? {}) as Frontmatter, body: m[2] };
}

/** Replace every {{token}} in a string using the i18n map for one locale. */
function resolveTokens(input: string, map: Frontmatter['i18n'], locale: Locale, ctx: string): string {
    return input.replace(TOKEN_RE, (whole, key: string) => {
        const entry = map?.[key];
        if (!entry) {
            console.warn(`⚠️  [${ctx}] unknown token {{${key}}} — left as-is`);
            return whole;
        }
        const has = (v: string | undefined): v is string => typeof v === 'string' && v.trim() !== '';
        if (!has(entry[locale])) {
            if (locale !== DEFAULT_LOCALE) {
                console.warn(`⚠️  [${ctx}] token {{${key}}} missing "${locale}" — fell back to "${DEFAULT_LOCALE}"`);
            }
            return has(entry[DEFAULT_LOCALE]) ? entry[DEFAULT_LOCALE]! : whole;
        }
        return entry[locale]!;
    });
}

/** Recursively resolve tokens inside any frontmatter value (string/array/object). */
function resolveDeep(value: unknown, map: Frontmatter['i18n'], locale: Locale, ctx: string): unknown {
    if (typeof value === 'string') return resolveTokens(value, map, locale, ctx);
    if (Array.isArray(value)) return value.map((v) => resolveDeep(v, map, locale, ctx));
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveDeep(v, map, locale, ctx)]));
    }
    return value;
}

async function listSources(): Promise<string[]> {
    const out: string[] = [];
    for (const glob of SRC_GLOBS) {
        const dir = path.join(ROOT, SRC_DIR, path.dirname(glob));
        if (!existsSync(dir)) continue;
        const ext = path.extname(glob); // e.g. ".md"
        const entries = await readdir(dir, { withFileTypes: true });
        for (const e of entries) {
            if (e.isFile() && e.name.endsWith(ext)) out.push(path.join(dir, e.name));
        }
    }
    return out;
}

async function generateOne(absSrc: string): Promise<void> {
    const rel = path.relative(path.join(ROOT, SRC_DIR), absSrc); // e.g. page/contact.md
    const raw = await readFile(absSrc, 'utf8');
    const { data, body } = splitFrontmatter(raw);
    const { i18n, ...rest } = data;

    for (const locale of LOCALES) {
        const ctx = `${rel} → ${locale}`;
        const fm = resolveDeep(rest, i18n, locale, ctx) as Record<string, unknown>;
        fm.language = locale;
        const outBody = resolveTokens(body, i18n, locale, ctx);

        const front = stringifyYaml(fm).trimEnd();
        const content = `---\n${front}\n---\n${outBody.startsWith('\n') ? '' : '\n'}${outBody}`;

        const outPath = path.join(ROOT, OUT_DIR, locale, rel);
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(outPath, content, 'utf8');
    }
}

async function build(): Promise<void> {
    if (CLEAN) {
        for (const locale of LOCALES) {
            await rm(path.join(ROOT, OUT_DIR, locale), { recursive: true, force: true });
        }
    }
    const sources = await listSources();
    for (const src of sources) await generateOne(src);
    console.log(`✅ i18n: generated ${sources.length} source file(s) × ${LOCALES.length} locale(s)`);
}

await build();

if (WATCH) {
    const { watch } = await import('node:fs');
    const srcRoot = path.join(ROOT, SRC_DIR);
    console.log(`👀 watching ${SRC_DIR}/ …`);
    let timer: ReturnType<typeof setTimeout> | null = null;
    watch(srcRoot, { recursive: true }, () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => void build().catch(console.error), 100);
    });
}
