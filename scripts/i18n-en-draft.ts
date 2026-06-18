/**
 * One-off: inject EN drafts for title/description into content-src/page/*.md.
 * ------------------------------------------------------------------
 * Central review table below. Edit freely, then re-run to apply:
 *   bun scripts/i18n-en-draft.ts
 *
 * Only customer-facing pages are translated. Internal/campaign pages
 * (coded titles, FB landing ads, empty descriptions) are intentionally
 * omitted — the generator falls back to Thai for them.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content-src', 'page');

type Draft = { title?: string; description?: string };

const EN: Record<string, Draft> = {
    'about.md': {
        title: 'About Somsri — Custom Garment Manufacturing',
        description:
            'Somsri Garment Co., Ltd. (Somsri) is a full-service textile manufacturer producing apparel of every kind, trusted by a wide range of customers both in Thailand and abroad.',
    },
    'accepting-production-of-fandom-shirts.md': {
        title: 'Custom Fandom & Fan-Club Shirts — Sharp Prints, Wholesale, Premium | Somsri',
        description:
            'Custom fandom, fan-club and artist shirts with your own design. Crisp, vivid prints that won’t peel, premium soft and breathable fabric, minimum order 100 pcs. Click for details.',
    },
    'bag.md': {
        title: 'Custom Tote Bags — Free Design with Screen Printing, Low Prices',
        description:
            'Tote bag factory producing made-to-order cloth bags with free design and logo screen printing. Expandable, Korean and square shapes in canvas or Soron fabric — great quality.',
    },
    'band-shirt.md': {
        title: 'Custom Band & Tour Shirts — Made-to-Order Music Tees',
        description:
            'Somsri produces band and tour shirts end to end, from design to manufacturing, at great quality and affordable prices. A band-shirt factory with a style all its own.',
    },
    'blanket.md': {
        title: 'Custom Premium Blankets — High-Quality Fabric, Your Own Design | Somsri',
        description:
            'High-quality custom blankets for premium gifts, corporate merchandise and hotels. Soft, warm fabric with colors and patterns of your choice — quality guaranteed for 90 days.',
    },
    'blog.md': {
        title: 'Blog — Tips, Knowledge and News About Garment Making',
        description: 'Articles, know-how and news about garment making — all right here.',
    },
    'brand.md': {
        title: 'Build Your Own Clothing Brand — Full-Service from Design to Sewing | Somsri',
        description:
            'Want to start a clothing brand but don’t know where to begin? Somsri offers full-service own-brand apparel manufacturing — brand building, free design and consultation, plus logo screen printing and embroidery.',
    },
    'company-shirt.md': {
        title: 'Custom Company Shirts, Polos & Corporate Uniforms with Logo Printing',
        description:
            'Full-service company apparel manufacturing — shirts, polos, staff tees and corporate wear with high-standard embroidery and logo printing. Free design, a wide fabric selection and on-time nationwide delivery.',
    },
    'fabric-bag.md': {
        title: 'Custom Cloth Bags & Eco Tote Bags with Logo Printing | Somsri',
        description:
            'Manufacturing of all kinds of cloth bags — canvas, raw cotton and spunbond — with sharp, beautiful screen prints and neat stitching. Free design, wholesale prices, on-time delivery.',
    },
    'fabric-specification.md': {
        title: 'Garment Factory — A Wide Range of Fabrics with Special Functions',
        description:
            'We produce every type of apparel with the finest selection of quality fabrics — cotton, micro, TC — plus special properties like water-resistant, UV-protective and quick-dry, all in one place.',
    },
    'faded-shirt.md': {
        title: 'Custom Washed & Vintage Faded Tees — Full Service | Somsri',
        description:
            'A factory producing premium washed shirts and popular vintage faded tees with special techniques. Free design and assured quality from Somsri’s real experience.',
    },
    'hat.md': {
        title: 'Custom Hats & Caps — Premium Caps with Brand Screen Printing & Embroidery | Somsri',
        description:
            'High-quality hat factory with sharp logo screen printing and embroidery. Order team caps, bucket hats and hiking hats — true to design, fast delivery, 90-day guarantee, attention to every detail.',
    },
    'hawaiian-shirt.md': {
        title: 'Custom Hawaiian Shirts — Premium Fabric, Any Pattern Made to Order | Somsri',
        description:
            'Hawaiian shirt factory using high-quality Italian silk fabric — soft, flowing and breathable. Ideal for organizations, fashion brands and resorts. Free design, crisp prints, easy ordering.',
    },
    'how-to-order.md': {
        title: 'How to Order — 8 Steps to Ordering Shirts with Somsri',
        description:
            'Ordering starts by sending your shirt design; our graphics team drafts it, then production takes no more than 15 days after approval before your products are delivered.',
    },
    'index.md': {
        title: 'Garment Factory — Custom T-Shirts, Polo Shirts & Made-to-Order Apparel',
        description:
            'We are a garment factory producing T-shirts with screen printing at great quality and wholesale prices. We manufacture and supply apparel with logo printing to build your own brand.',
    },
    'jersey.md': {
        title: 'Custom Jerseys — Sublimated Sports & Activity Shirts, Full Service',
        description:
            'A jersey, sportswear and racing-shirt factory for teams and organizations. Free design plus full-service screen printing and embroidery — durable, peel-free, with a 90-day product guarantee.',
    },
    'landing-page-real-hat.md': {
        title: 'Full-Service Hat Manufacturing — Affordable, Quality Hat Factory | Somsri',
        description:
            'Manufacturing of all hat types — caps, bucket hats, corduroy and suede — with embroidery and logo screen printing. Premium quality guaranteed, fast nationwide delivery, free quotes.',
    },
    'landing-page-tote-bag.md': {
        title: 'Affordable Custom Bags — Quality Bag Factory with Free Design',
        description:
            'Made-to-order bags of every kind — cloth and premium canvas — with screen printing and embroidery. Fine craftsmanship from just 55 baht per piece, nationwide delivery, premium quality.',
    },
    'mask.md': {
        title: 'Custom Cloth Face Masks with Print & Logo Embroidery | Somsri',
        description:
            'Factory producing high-quality cloth face masks with brand screen printing and logo embroidery. Available in muslin and water-resistant fabric, made in-house, fast, 90-day guarantee.',
    },
    'media.md': {
        title: 'Media',
        description:
            'Watch interviews and interesting stories from Somsri, including media features, to learn more about our quality logo-printed apparel manufacturing services.',
    },
    'other-product.md': {
        title: 'Custom Fabric Products — Hats, Pillowcases & Own-Brand Manufacturing',
        description:
            'Somsri produces a wide range of fabric products — hats and bolster pillowcases — with free design and unique patterns. Made-to-order at wholesale prices with fast delivery.',
    },
    'own-brand-tshirt-factory.md': {
        title: 'Own-Brand T-Shirt Manufacturing — Brand Screen Printing, Great Quality, Fast',
        description:
            'Somsri produces own-brand apparel and builds clothing brands — top-quality own-brand tees and great-value screen printing, with free delivery available.',
    },
    'pants.md': {
        title: 'Custom Elastic Pants & Shorts with Logo Embroidery | Somsri',
        description:
            'Quality pants factory with Fasbix and French Terry fabrics — comfortable and stretchy. Produce your own-brand pants at factory prices, from just 100 pcs.',
    },
    'policy.md': {
        title: 'Privacy Policy — Somsri T-Shirt',
    },
    'polo.md': {
        title: 'Custom Polo Shirts & Uniforms with Embroidery & Printing | 90-Day Guarantee',
        description:
            'Full-service polo, corporate and staff shirt factory. Premium, comfortable fabric with crisp logo embroidery and screen printing, design it your way, low prices, 90-day guarantee, free quotes.',
    },
    'portfolio-artist.md': {
        title: 'Shirt Production Portfolio — Artist Clients | Somsri',
        description:
            'A portfolio of artist shirt production by Somsri — custom artist tees with crisp, high-quality prints and fast delivery.',
    },
    'portfolio-organization.md': {
        title: 'Shirt Production Portfolio — Corporate Clients | Somsri',
        description:
            'A portfolio of corporate shirt production by Somsri — company shirts and uniforms with quality logo printing and fast delivery.',
    },
    'portfolio.md': {
        title: 'Shirt Production Portfolio — Quality Factory for Artist & Corporate Shirts',
        description:
            'Somsri’s shirt production portfolio — custom tees, sportswear, polos, artist and corporate shirts, brand apparel and screen printing with crisp, high-quality results.',
    },
    'price.md': {
        title: 'Shirt Price Rates — Custom Tees & Screen Printing from Just Tens of Baht',
        description:
            'See Somsri’s T-shirt price rates — affordable custom tees with low minimums (tens of pieces) for brand, sports and company shirts. The more you order, the lower the price.',
    },
    'produce-tshirt.md': {
        title: 'Custom T-Shirts, Polos & Sportswear with Full-Service Screen Printing',
        description:
            'Premium-grade apparel manufacturing at wholesale factory prices — screen printing, logo embroidery and custom shirt design to your needs, with OEM clothing-brand support.',
    },
    'product-type.md': {
        title: 'Somsri Products — T-Shirts, Polos, Sportswear and More',
        description:
            'Somsri’s products — a wide range of premium items including screen-printed shirts, face masks, cloth bags, aprons and more for you to choose from.',
    },
    'screen-t-shirt-service.md': {
        title: 'Screen Printing — Custom Tees, DTG & Premium Printing, High Quality',
        description:
            'T-shirt screen printing on any fabric — great quality, vivid and crisp colors at wholesale prices, with many print styles to choose from. Custom shirts made to order.',
    },
    'shop.md': {
        title: 'Design Your Own Shirt — Free Online T-Shirt Design Tool',
        description:
            'Design your own shirt with a free online tool, plus design and production services for screen-printed tees, polos and embroidery. Choose the color, size and style of your shirt.',
    },
    'size.md': {
        title: 'Garment Factory — Custom T-Shirts, Polo Shirts & Made-to-Order Apparel',
        description:
            'We are a garment factory producing T-shirts with screen printing at great quality and wholesale prices. We manufacture and supply apparel with logo printing to build your own brand.',
    },
    'somsri-can-screen-and-pin.md': {
        title: 'Custom Polo Shirts with Logo Embroidery — Quality Polo Factory | Somsri',
        description:
            'Full-service polo shirt manufacturing with a wide fabric selection, plus brand embroidery and logo screen printing. Free design, ideal for uniforms and team shirts. Check prices now.',
    },
    'somsri-screen.md': {
        title: 'Screen Printing for All Shirts — Express, Crisp Logos, Factory Prices | Somsri',
        description:
            'Screen printing for tees, team and activity shirts using DFT, silk screen, DTG and more — vivid, long-lasting, peel-free. Free design, low minimums, express orders, nationwide delivery.',
    },
    'somsri-with-the-elephant-pants.md': {
        title: 'Custom Elephant Pants — Design Your Own, Cheapest Elephant Pants Factory',
        description:
            'Full-service elephant-pants manufacturing — design new patterns and choose your fabric, from micro to Italian silk. Produce your own brand from a minimum of 100 pcs.',
    },
    'somsri-with-tie-dye.md': {
        title: 'Custom Tie-Dye Shirts — Tie-Dye Shirt Factory | Somsri',
        description:
            'Custom tie-dye shirt manufacturing, including screen printing, made to order at affordable prices with quality and satisfaction guaranteed.',
    },
    'sport-shirt-min-100.md': {
        title: 'Custom Sportswear, Football & Running Shirts — Made-to-Order Prints, High Quality | Somsri',
        description:
            'Full-service sportswear manufacturing with free shirt design and vivid digital printing. Breathable, quick-dry Micro fabric — ideal for team, faculty and running shirts.',
    },
    'sport.md': {
        title: 'Custom Sportswear — Screen-Printed Football & Fashion Shirts, Free Design, Wholesale',
        description:
            'Sportswear factory with free design. Order team shirts, school sports shirts and running shirts in high-quality TC/TK and Micro Sport fabric with crisp, modern prints.',
    },
    'step-order.md': {
        title: 'Garment Factory — Custom T-Shirts, Polo Shirts & Made-to-Order Apparel',
        description:
            'We are a garment factory producing T-shirts with screen printing at great quality and wholesale prices. We manufacture and supply apparel with logo printing to build your own brand.',
    },
    'step-produce.md': {
        title: 'Garment Factory — A Wide Range of Fabrics with Special Functions',
        description:
            'We produce every type of apparel with the finest selection of quality fabrics — cotton, micro, TC — plus special properties like water-resistant, UV-protective and quick-dry, all in one place.',
    },
    't-shirt-factory.md': {
        title: 'Custom Shirts — Screen-Printed Tees, Polo Shirts & Made-to-Order T-Shirts',
        description:
            'Custom shirts with screen printing from the Somsri garment factory. Made from high-quality fabric at factory prices — fast, great quality, results guaranteed.',
    },
    'tshirt.md': {
        title: 'Custom T-Shirts — Great Quality, Wholesale Prices with Somsri',
        description:
            'A T-shirt factory that’s fast, ships quickly and offers great quality at good prices — full service. Whatever the print style, we produce it to your needs with a focus on quality and service.',
    },
    'uniform.md': {
        title: 'Custom Uniforms for Staff & Students — Full Service, Free Design | Somsri',
        description:
            'Factory producing all types of uniforms — shop coats, student and staff uniforms — with logo embroidery, premium tailoring and durable, easy-care fabric of international quality.',
    },
};

let applied = 0;
for (const [file, draft] of Object.entries(EN)) {
    const abs = path.join(DIR, file);
    const raw = await readFile(abs, 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) {
        console.warn(`⚠️  ${file}: no frontmatter — skipped`);
        continue;
    }
    const data = (parseYaml(m[1]) ?? {}) as Record<string, any>;
    data.i18n ??= {};
    for (const field of ['title', 'description'] as const) {
        if (draft[field] === undefined) continue;
        data.i18n[field] ??= {};
        data.i18n[field].en = draft[field];
    }
    const front = stringifyYaml(data).trimEnd();
    await writeFile(abs, `---\n${front}\n---\n${m[2].startsWith('\n') ? '' : '\n'}${m[2]}`, 'utf8');
    applied++;
}
console.log(`✅ EN drafts applied to ${applied}/${Object.keys(EN).length} pages`);
