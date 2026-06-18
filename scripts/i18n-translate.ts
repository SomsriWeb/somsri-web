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
    'product-type.md': [
        { token: 'h1', th: 'สินค้าของสมศรีมีเสื้อ', en: "Somsri's Products" },
        { token: 'intro_p', th: 'สินค้าของสมศรีมีเสื้อ มีสินค้าพรีเมี่ยมหลากหลายชนิด เราเป็นโรงงานผลิตเสื้อที่พร้อมให้บริการแบบครบวงจร ด้วยประสบการณ์ในการผลิตสินค้าหลากหลาย ไม่ว่าจะเป็น เสื้อยืด เสื้อโปโล เสื้อกีฬา หน้ากาก กระเป๋าผ้า และสินค้าอื่นๆ อีกมากมาย สามารถออกแบบให้ตรงกับความต้องการของลูกค้าได้ทุกขั้นตอน โดยเรามีทีมงานออกแบบมืออาชีพคอยให้คำปรึกษา พร้อมทำตัวอย่างก่อนสั่งผลิตจริง ไม่ว่าคุณจะต้องการสินค้าประเภทไหน จะเป็นการสร้างแบรนด์ใหม่หรือผลิตเสื้อที่ใช้ภายในองค์กร เราพร้อมรองรับการผลิตทั้งแบบจำนวนน้อยไปจนถึงจำนวนมาก พร้อมคุณภาพที่ไว้วางใจได้ ผลิตในโรงงานมาตรฐาน เพื่อให้ลูกค้าได้รับสินค้าที่ตรงตามความต้องการมากที่สุด หากลูกค้าท่านใดสนใจสามารถดูรายละเอียดพร้อมติดต่อสอบถามเราได้ทันที เรายินดีให้บริการ', en: "Somsri offers a wide range of premium products. As a full-service garment factory experienced in producing many product types — T-shirts, polo shirts, sportswear, face masks, cloth bags and much more — we can design to match your needs at every step. Our professional design team is on hand to advise and make samples before real production begins. Whatever product type you need, whether building a new brand or producing shirts for internal use, we handle runs both small and large with dependable quality, made in a standard factory so you get products that match your needs as closely as possible. If you're interested, view the details and contact us right away — we're glad to help." },
        { token: 'sub_h2', th: 'สมศรีมีสินค้าพรีเมี่ยมหลากหลายชนิดไม่ว่าจะเป็น เสื้อยืด สกรีนเสื้อ หน้ากาก กระเป๋าผ้า ผ้ากันเปื้อน และอื่น ๆ ให้คุณเลือกสรร', en: 'Somsri has a wide variety of premium products — T-shirts, screen printing, face masks, cloth bags, aprons and more for you to choose from.' },
        { token: 'fabric_h2', th: 'เลือกผ้าแบบไหนให้เหมาะกับแบรนด์คุณ', en: 'Which fabric suits your brand?' },
        { token: 'fabric_desc', th: 'หากคุณกำลังวางแผนสร้างแบรนด์เสื้อของตัวเอง แต่ยังลังเลว่าจะเลือกเนื้อผ้าแบบไหนดี สมศรีมีเสื้อ ขอเป็นที่ปรึกษาให้กับคุณ เราเชี่ยวชาญด้านการผลิตเสื้อทุกชนิด พร้อมมีผ้าคุณภาพสูงให้เลือกหลากหลายประเภท รองรับงานทุกประเภท ทั้งทำเสื้อแฟชั่น เสื้อแบรนด์ตัวเอง เสื้อองค์กร หรือเสื้อกิจกรรมต่าง ๆ ไม่ว่าคุณต้องการสั่งผลิต เสื้อยืด เสื้อโปโล เสื้อกีฬา เสื้อยูนิฟอร์ม หรือเสื้อแบบต่างๆ เรามีผ้าที่ให้เลือกครบถ้วน เช่น ผ้าฝ้าย (Cotton) ที่มีคุณสมบัติหลายประเภท เช่น กันน้ำ, เนื้อละเอียด นุ่ม ใส่สบาย, เนื้อแน่น ไม่บาง, ผ้าจูติไมโคร (Juti Micro) ผ้าที่เหมาะกับเสื้อโปโล มีความยืดหยุ่นสูง ไม่ย้วยง่าย, ผ้ามัสลิน (Muslin) เหมาะสำหรับงานแฟชั่นหรือเสื้อเด็ก เนื้อนุ่ม เบา ระบายอากาศดี\n  เรายังมีเนื้อผ้าฟังก์ชันพิเศษอย่าง Dry Feel ที่มีผิวสัมผัสเย็นสบาย แห้งเร็ว, Dry Tech มีคุณสมบัติพิเศษอย่างการซึมซับเหงื่อดี และยังมีผ้าอีกหลายชนิดให้คุณเลือกตามงบประมาณและการใช้งานจริง หากคุณต้องการสัมผัสเนื้อผ้าจริงก่อนตัดสินใจ เรายินดีให้คำปรึกษาพร้อมตัวอย่างผ้า ดูรายละเอียดเนื้อผ้าเพิ่มเติมได้ที่นี่', en: "If you're planning to build your own shirt brand but aren't sure which fabric to choose, let Somsri be your advisor. We specialize in producing every kind of shirt and offer a wide range of high-quality fabrics for all types of work — fashion shirts, own-brand shirts, corporate shirts or activity shirts. Whether you want to produce T-shirts, polos, sportswear, uniforms or other styles, we have a complete selection of fabrics, such as Cotton with various properties (water-resistant; fine, soft and comfortable; dense and not thin), Juti Micro — ideal for polos with high stretch that resists sagging — and Muslin, suited to fashion or kids' shirts: soft, light and breathable.\n  We also offer special-function fabrics like Dry Feel, with a cool feel and fast drying, and Dry Tech, with excellent sweat absorption, plus many more fabrics to suit your budget and real-world use. If you'd like to feel the actual fabric before deciding, we're glad to consult and provide fabric samples. See more fabric details here." },
    ],
    'portfolio-artist.md': [
        { token: 'h1', th: 'รวมผลงานผลิตเสื้อ กลุ่มลูกค้าศิลปิน', en: 'Shirt Production Portfolio — Artist Clients' },
        { token: 'intro', th: 'สมศรีมีเสื้อมีโอกาสได้ร่วมงานกับศิลปินหลากหลายแนวทั่วประเทศ ด้วยความเข้าใจในสไตล์ของแต่ละศิลปิน\n  เราจึงสามารถผลิตเสื้อศิลปินที่ตอบโจทย์ด้านภาพลักษณ์และคุณภาพให้เหมาะกับการจัดจำหน่ายจริง\n  ทั้งงานสกรีนแบบละเอียด สีชัด งานรีดร้อน DFT ไปจนถึงการเลือกเนื้อผ้าที่ใส่สบาย\n  เหมาะกับกลุ่มแฟนคลับ ช่วยเพิ่มมูลค่าให้กับสินค้าได้อย่างชัดเจน', en: 'Somsri has had the chance to work with artists across many genres nationwide. With an understanding of each artist’s style, we produce artist shirts that meet both image and quality needs and are ready for real distribution — from fine, vivid screen printing and DFT heat transfer to choosing comfortable fabrics that suit fan-club audiences, clearly adding value to the merchandise.' },
        { token: 'ex_subtitle', th: 'ตัวอย่างผลงาน', en: 'Featured Work' },
        { token: 'ex_desc', th: 'รวมผลงานเสื้อศิลปินที่เราผลิตให้กับศิลปินชั้นนำ ทั้งงานสกรีนฮาฟโทน สกรีน DTG, DFT และเทคนิคอื่น ๆ\n  ทุกชิ้นงานผ่านการดูแลอย่างมืออาชีพ เพื่อให้ศิลปินและแฟนคลับได้รับสินค้าที่ตรงตามความต้องการ', en: 'A collection of artist shirts we produced for leading artists — halftone screen printing, DTG, DFT and other techniques. Every piece is handled professionally so artists and fans receive products that match their needs.' },
        { token: 'why_title', th: 'เลือกผลิตเสื้อยืดกับสมศรีแล้วดียังไง?', en: 'Why produce your T-shirts with Somsri?' },
        { token: 'reviews', th: 'รีวิวจากลูกค้า', en: 'Customer Reviews' },
        { token: 'cta_h2', th: 'สนใจสั่งทำเสื้อยืด ติดต่อสอบถาม ประเมินราคาฟรี', en: 'Interested in custom T-shirts? Contact us for a free quote' },
        { token: 'cta_p', th: 'ส่งแบบ/โลโก้ และจำนวนที่ต้องการมาได้เลย ทีมงานช่วยแนะนำเนื้อผ้า เทคนิคปัก-สกรีน :br พร้อมประเมินราคาและระยะเวลาผลิตให้ภายในแชท', en: 'Just send your design/logo and the quantity you need. Our team will recommend fabrics and embroidery/screen-printing techniques :br and give you a price and production timeline right in the chat.' },
        { token: 'line_btn', th: 'แอดไลน์สั่งทำเสื้อ', en: 'Add us on LINE to order' },
    ],
    'portfolio-organization.md': [
        { token: 'h1', th: 'รวมผลงานผลิตเสื้อ กลุ่มลูกค้าองค์กร', en: 'Shirt Production Portfolio — Corporate Clients' },
        { token: 'intro', th: 'เสื้อองค์กร เสื้อบริษัท ต้องการทั้งความสุภาพ ความเป็นมืออาชีพ และความทนทานต่อการใช้งานจริง\n  สมศรีมีเสื้อเข้าใจดีถึงภาพลักษณ์ขององค์กรที่ต้องการสื่อสารผ่านเสื้อพนักงาน เสื้อกิจกรรม\n  เราจึงคัดสรรเนื้อผ้าที่เหมาะสมกับการใช้งานระยะยาว พร้อมให้คำแนะนำด้านเทคนิคการพิมพ์โลโก้\n  ที่คมชัดและติดทน เพื่อให้ทุกองค์กรมั่นใจว่าสวมใส่แล้วดูดีทั้งทีม', en: 'Corporate and company shirts call for politeness, professionalism and real-world durability. Somsri understands the image an organization wants to convey through staff and activity shirts, so we select fabrics suited to long-term use and advise on logo-printing techniques that stay sharp and last — so every organization can be confident the whole team looks great.' },
        { token: 'ex_subtitle', th: 'ตัวอย่างผลงาน', en: 'Featured Work' },
        { token: 'ex_desc', th: 'รวมผลงานเสื้อองค์กรและเสื้อบริษัทที่เราผลิตให้กับองค์กรชั้นนำ ทั้งงานสกรีนโลโก้ งานปักโลโก้\n  และการผลิตเสื้อยูนิฟอร์มคุณภาพสูง เหมาะกับทุกประเภทองค์กรทั้งขนาดเล็กและขนาดใหญ่', en: 'A collection of corporate and company shirts we produced for leading organizations — logo screen printing, logo embroidery and high-quality uniform production, suited to every kind of organization, both small and large.' },
        { token: 'why_title', th: 'เลือกผลิตเสื้อยืดกับสมศรีแล้วดียังไง?', en: 'Why produce your shirts with Somsri?' },
        { token: 'reviews', th: 'รีวิวจากลูกค้า', en: 'Customer Reviews' },
        { token: 'cta_h2', th: 'สนใจสั่งทำเสื้อโปโลยูนิฟอร์ม ติดต่อสอบถาม ประเมินราคาฟรี', en: 'Interested in custom polo uniforms? Contact us for a free quote' },
        { token: 'cta_p', th: 'ส่งแบบ/โลโก้ และจำนวนที่ต้องการมาได้เลย ทีมงานช่วยแนะนำเนื้อผ้า เทคนิคปัก-สกรีน :br พร้อมประเมินราคาและระยะเวลาผลิตให้ภายในแชท', en: 'Just send your design/logo and the quantity you need. Our team will recommend fabrics and embroidery/screen-printing techniques :br and give you a price and production timeline right in the chat.' },
        { token: 'line_btn', th: 'แอดไลน์สั่งทำเสื้อ', en: 'Add us on LINE to order' },
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
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const { token, th, en } of ordered) {
        data.i18n[token] = { th, en };
        const placeholder = `{{${token}}}`;
        if (body.includes(placeholder)) continue;
        // Whitespace-tolerant match: collapse every whitespace run (incl. line
        // breaks/indent) to \s+ so multi-line soft-wrapped paragraphs match.
        const re = new RegExp(th.trim().split(/\s+/).map(esc).join('\\s+'), 'g');
        if (!re.test(body)) {
            console.warn(`⚠️  ${file}: th text for {{${token}}} not found in body`);
            continue;
        }
        body = body.replace(re, placeholder);
        totalRepl++;
    }
    totalIns += entries.length;

    const front = stringifyYaml(data).trimEnd();
    await writeFile(abs, `---\n${front}\n---\n${body.startsWith('\n') ? '' : '\n'}${body}`, 'utf8');
    console.log(`✓ ${file}: ${entries.length} tokens`);
}
console.log(`done: ${totalIns} tokens, ${totalRepl} body replacements`);
