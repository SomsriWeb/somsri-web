/**
 * Batch body-translation helper for Phase 5.
 * ------------------------------------------------------------------
 * Author one { token, th, en } entry per translatable string. The script:
 *   1. inserts it into the page's `i18n` map, and
 *   2. replaces the exact `th` text in the body with `{{token}}`.
 * `th` must match the body verbatim (copy it from the source). Idempotent:
 * if the body already contains `{{token}}`, the replacement is skipped.
 *
 *   bun scripts/i18n-translate.ts
 *
 * After running, regenerate: bun scripts/i18n-generate.ts --clean
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content-src', 'page');

type Entry = { token: string; th: string; en: string };

// ---- Translation table (add pages here) ----------------------------------
const PAGES: Record<string, Entry[]> = {
    'bag.md': [
        { token: 'h1', th: 'รับผลิตกระเป๋าผ้า', en: 'Custom Cloth Bag Manufacturing' },
        { token: 'h2', th: 'สินค้ากระเป๋าคเนื้อผ้าคุณภาพดี หลากหลายรูปแบบที่คุณเลือกได้', en: 'Quality fabric bags in a wide variety of styles to choose from' },
        { token: 'p', th: 'ให้เราออกแบบ หรือ สอบถามเราเพิ่มเติมได้ตอนนี้', en: 'Let us design for you — or ask us for more details now' },
        { token: 'tote_desc', th: 'สามารถ customize ตามขนาดและทรงที่ต้องการได้ (ผ้าแคนวาส)', en: 'Can be customized to the size and shape you want (canvas fabric)' },
        { token: 'line_btn', th: 'แอดไลน์สั่งทำเสื้อ', en: 'Add us on LINE to order' },
    ],
    'hat.md': [
        { token: 'pill_1', th: 'ขั้นต่ำ 100 ชิ้น', en: 'Minimum 100 pcs' },
        { token: 'pill_2', th: 'เริ่มต้นชิ้นละ 60 บาท', en: 'From 60 baht per piece' },
        { token: 'h1', th: 'รับผลิตหมวก', en: 'Custom Hat Manufacturing' },
        { token: 'hero_desc', th: 'งานเกรดพรีเมี่ยม คุณภาพส่งออก งานแบรนด์ ราคาย่อมเยาว์', en: 'Premium grade, export quality, brand-ready work at affordable prices' },
        { token: 'types_title', th: 'ชนิดหมวกและตารางราคา', en: 'Hat Types & Price List' },
        { token: 'clients_title', th: 'สมศรีผลิตให้กับใครบ้าง', en: 'Our Clients' },
        { token: 'clients_desc', th: 'สมศรีมีเสื้อพร้อมที่จะตอบสนองความต้องการของสินค้า แบรนด์ รวมไปถึงองค์กรของคุณ ด้วยเครื่องมือที่ทันสมัยหลากหลายเทคโนโลยี ออกแบบ ผลิต สกรีน และปัก ครบจบที่เดียว', en: 'Somsri is ready to meet the needs of your products, brand and organization with modern, multi-technology tools — design, production, screen printing and embroidery, all in one place.' },
        { token: 'ask', th: 'สอบถามเพิ่มเติม', en: 'Ask for more details' },
    ],
    'uniform.md': [
        { token: 'h1', th: 'ยูนิฟอร์ม', en: 'Uniforms' },
        { token: 'hero_desc', th: 'เสื้อยูนิฟอร์มคุณภาพดี สำหรับโรงงาน :br สำหรับนักศึกษา', en: 'Quality uniforms for factories :br and for students' },
        { token: 'desc_title', th: 'โรงงานรับผลิตเสื้อ ยูนิฟอร์ม/ช็อป ผลิตเสื้อช็อป ยูนิฟอร์ม\n  :br สำหรับใส่เข้าทำงาน Workshop เสื้อคุณภาพดี', en: 'A factory for uniforms and shop coats — workshop work shirts of great quality\n  :br made for the job' },
        { token: 'desc_body', th: 'งานปักละเอียดมีคุณภาพ\n  รับประกันสินค้า 90 วัน\n  มีสีเสื้อให้เลือกมากมาย สอบถามเราตอนนี้', en: 'Fine, quality embroidery\n  90-day product guarantee\n  many shirt colors to choose from — ask us now' },
        { token: 'order_btn', th: 'สั่งทำเสื้อ', en: 'Order now' },
    ],
};
// --------------------------------------------------------------------------

let totalIns = 0;
let totalRepl = 0;
for (const [file, entries] of Object.entries(PAGES)) {
    const abs = path.join(DIR, file);
    const raw = await readFile(abs, 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) {
        console.warn(`⚠️  ${file}: no frontmatter — skipped`);
        continue;
    }
    const data = (parseYaml(m[1]) ?? {}) as Record<string, any>;
    data.i18n ??= {};
    let body = m[2];

    // Replace longest `th` first so a short word can't clobber a longer phrase
    // that contains it (e.g. "ยูนิฟอร์ม" inside "เสื้อยูนิฟอร์มคุณภาพดี").
    const ordered = [...entries].sort((a, b) => b.th.length - a.th.length);
    for (const { token, th, en } of ordered) {
        data.i18n[token] = { th, en };
        const placeholder = `{{${token}}}`;
        if (body.includes(placeholder)) continue;
        if (!body.includes(th)) {
            console.warn(`⚠️  ${file}: th text for {{${token}}} not found in body`);
            continue;
        }
        body = body.replaceAll(th, placeholder);
        totalRepl++;
    }
    totalIns += entries.length;

    const front = stringifyYaml(data).trimEnd();
    await writeFile(abs, `---\n${front}\n---\n${body.startsWith('\n') ? '' : '\n'}${body}`, 'utf8');
    console.log(`✓ ${file}: ${entries.length} tokens`);
}
console.log(`done: ${totalIns} tokens, ${totalRepl} body replacements`);
