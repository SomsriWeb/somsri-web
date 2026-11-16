<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (แสดงผลเป็น H2)
     */
    title(): unknown;

    /**
     * หัวข้อ (แสดงผลเป็น P)
     */
    description(): unknown;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });

// VARIABLE
const fabricKeys = [
    { key: 'cottonWaterproof', nameEn: 'Cotton waterproof' },
    { key: 'cottonComb', nameEn: 'Cotton comb' },
    { key: 'cotton100', nameEn: 'Cotton semi' },
    { key: 'dryFeel', nameEn: 'Dry feel' },
    { key: 'dryTech', nameEn: 'Dry tech' },
    { key: 'microSport', nameEn: 'Micro sport' },
    { key: 'jutiMicro', nameEn: 'Juti micro' },
    { key: 'muslin', nameEn: 'Muslin' },
    { key: 'nanoWaterproof', nameEn: 'Nano waterproof' },
    { key: 'supersoff', nameEn: 'Supersoff' },
    { key: 'tcLacoste', nameEn: 'TC lacoste' },
    { key: 'tcTk', nameEn: 'TC/TK' },
];
const data = computed(() =>
    fabricKeys.map((item) => ({
        nameEn: item.nameEn,
        heading: t('heading', { name: t(`fabrics.${item.key}.name`), nameEn: item.nameEn }),
        description: t(`fabrics.${item.key}.description`),
        alt: t(`fabrics.${item.key}.alt`),
    })),
);
</script>

<i18n lang="json">
{
    "th": {
        "heading": "{name} ({nameEn})",
        "fabrics": {
            "cottonWaterproof": {
                "name": "คอตตอนกันน้ำ",
                "description": "เป็นผ้า cotton ที่มีความสามารถในการระบายความร้อนสูง ผลิตจากเส้นใยฝ้ายธรรมชาติทำให้มีความนุ่ม น้ำหนักเบา สบาย ยืดหยุ่น เคลือบสาร water rellent ทำให้ผ้ามีลักษณะคล้ายผิวของใบบัว น้ำจึงไม่ซึมเข้าผิวผ้า โดยเนื้อผ้าชนิดนี้สามารถซักได้ถึง 30 ครั้ง ไม่ระคายเคืองผิวเหมาะกับการผลิตหน้ากากผ้า",
                "alt": "เนื้อผ้า สกรีนเสื้อ"
            },
            "cottonComb": {
                "name": "คอตตอนคอมป์",
                "description": "เป็นผ้า cotton ที่ใช้การผลิตเส้นด้ายด้วยการหวีเส้นใยกับเครื่องจักรที่มีกระบวนการซับซ้อนและละเอียดอ่อนกว่าแบบสาง ทำให้เส้นด้ายที่ออกมามีขนาดเล็กและยาวกว่า ขจัดสิ่งสกปรกออกจากเส้นใยได้มากกว่า ผ้า cotton ชนิดนี้จึงมีความนุ่ม ขาดยาก แต่ยังระบายความร้อนได้ดี ไม่ยับและไม่หดง่าย จึงเหมาะกับการผลิตเสื้อยืดแบรนด์ตัวเอง",
                "alt": "ผ้าสกรีนเสื้อ"
            },
            "cotton100": {
                "name": "คอตตอน 100%",
                "description": "ผ้า cotton 100% ใช้การผลิตเส้นด้ายด้วยกระบวนการสางเส้นใยโดยเครื่องจักร เส้นด้ายที่ออกมามีขนาดใหญ่และสั้น มีความนุ่มอยู่ในระดับปานกลาง คุณสมบัติพิเศษของผ้า cotton คือราคาไม่สูง เนื้อผ้ามีความหนาและยับยาก",
                "alt": "ผ้าสกรีนเสื้อ เลือกแบบไหนดี"
            },
            "dryFeel": {
                "name": "ดรายฟีล",
                "description": "เป็นผ้าชนิดที่รวมข้อดีของผ้า cotton และผ้า polyester ไว้ด้วยกัน โดยจะทอผ้าทั้งสองชนิดไว้คนละฝั่งกัน ทำให้หน้าผ้านสองฝั่งที่ออกมาเป็นคนละชนิดกัน เนื้อผ้าดรายฟีลจึงเป็นเนื้อผ้าเกรดดีที่สุดในท้องตลาด ด้วยการรวมข้อดีของผ้าทั้งสองชนิดเข้าไว้ด้วยกัน ด้วยคุณสมบัติพิเศษที่สามารถซับเหงื่อได้ดี ผ้าอยู่ตัวยับยาก ไม่ขึ้นขุยหลังการซัก สวมใสสบายเหมาะสำหรับผลิตเสื้อยูนิฟอร์ม",
                "alt": "เลือกผ้าสกรีนเสื้อ"
            },
            "dryTech": {
                "name": "ดรายเท็กซ์",
                "description": "เป็นผ้าชนิดที่รวมข้อดีของผ้า cotton และผ้า polyester ไว้ด้วยกัน โดยจะทอผ้าทั้งสองชนิดไว้คนละฝั่งกัน ทำให้หน้าผ้านสองฝั่งที่ออกมาเป็นคนละชนิดกัน เนื้อผ้าดรายเท็กซ์จึงเป็นเนื้อผ้าอีกชนิดที่มีเกรดดีในท้องตลาด ด้วยคุณสมบัติพิเศษที่สามารถซับเหงื่อได้ดี ผ้าไม่ยับ ไม่ขึ้นขุยแม้ซักหลายครั้ง สวมใส่สบาย เหมาะสำหรับผลิตเสื้อยูนิฟอร์ม เสื้อพนักงาน",
                "alt": "สกรีนเสื้อเลือกผ้าแบบไหน"
            },
            "microSport": {
                "name": "ไมโครกีฬา",
                "description": "เป็นเนื้อผ้าที่ออกแบบมาเพื่อสวมใส่ในการออกกำลังกายโดยเฉพาะ เนื่องจากผ้าชนิดนี้มีการซึมซับเหงื่อและระบายอากาศที่ดีเยี่ยม แห้งเร็วกว่าปกติถึง 3 เท่า ราคาไม่สูง ผิวสัมผัสเนียนนุ่ม และถึงแม้จะผ่านการซักหลายครั้ง แต่เนื้อผ้ายังคงดูใหม่อยู่เสมอ",
                "alt": "เนื้อผ้า สำหรับสกรีนเสื้อ"
            },
            "jutiMicro": {
                "name": "จูติไมโคร",
                "description": "เป็นเนื้อผ้าที่ออกแบบมาเพื่อแทนที่เนื้อผ้าที่ใช้ผลิตยูนิฟอร์มในรูปแบบเดิมๆ ที่ใช้ไปสักพักแล้วสีซีดหรือขึ้นขุยทำให้ต้องเปลี่ยนอยู่บ่อยครั้ง แต่เนื้อผ้าจูติไมโครมีความทนทานมากกว่าแบบเดิม ๆ บวกกับคุณสมบัติพิเศษของผ้าไมโครที่แห้งเร็ว ระบายความร้อนได้ดี ผิวสัมผัสปานกลาง เมื่อซักแล้วสีไม่ซีด ขึ้นขุยยาก และเหมาะสำหรับเสื้อโปโล จึงทำให้เนื้อผ้าชนิดนี้ได้รับความนิยมมากที่สุด",
                "alt": "เนื้อผ้าทำเสื้อ"
            },
            "muslin": {
                "name": "มัสลินธรรมดา",
                "description": "เป็นเนื้อผ้าที่นิยมนำมาผลิตเป็นหน้ากากผ้าอนามัย และหลาย ๆ คนมักใช้ทำเป็นปลอกหมอนหรือเครื่องนอนที่ป้องกันไรฝุ่น เนื่องจากผ้าชนิดนี้ทำมาจากผ้าฝ้าย 100% ทำให้ระบายกาศได้ดีมีน้ำหนักเบาและสามารถกันละอองน้ำได้ดีเยี่ยม อีกทั้งยังมีความแข็งแรงต่อการซักสามารถซักได้มากกว่า 100 ครั้ง",
                "alt": "เนื้อผ้าทำเสื้อ"
            },
            "nanoWaterproof": {
                "name": "นาโนกันน้ำ",
                "description": "มีคุณสมบัติกันน้ำ ผลิตจากวัสดุคุณภาพดี ไม่ย้วย ทนทานเนื้อผ้าบางเบา สวมใส่ได้ทั้งผู้หญิงและผู้ชาย เหมาะสำหรับการใส่ออกกำลังกายหรือเล่นกีฬา เพราะสามารถระบายอากาศได้ดี ใส่แล้วไม่ทำให้รู้สึกร้อน แห้งเร็ว ทำให้ช่วยลดการอับชื้น",
                "alt": "สั่งผลิตเสื้อยืด"
            },
            "supersoff": {
                "name": "ซูเปอร์ซอฟ",
                "description": "เป็นผ้าที่ผลิตจากเส้นใยฝ้าธรรมชาติ  มีคุณสมบัติพิเศษ คือผิวสัมผัสที่หนานุ่ม แต่สามารถระบายอากาศได้ดีเยี่ยม ในสภาพอากาศร้อนเหมือนกับใส่เสื้อผ้าบางๆ อีกทั้งไม่ขึ้นขุยหลังจากซัก เหมาะในการทำไปผลิตเป็นเสื้อแบรนด์",
                "alt": "เลือกเนื้อผ้า ผลิตเสื้อยืด"
            },
            "tcLacoste": {
                "name": "ทีซี ลาครอส",
                "description": "เป็นเนื้อผ้าที่ได้รับความนิยมมากที่สุด ออกแบบมาเพื่อผลิตเป็นยูนิฟอร์ม เนื่องจากมีการระบายอากาศได้ดีในระดับหนึ่งเนื้อผ้าผิวสัมผัสมีความนุ่ม ไม่หด ไม่ย้วย เป็นขุยยากแม้ว่าจะผ่านการซักหลายครั้งและมีความเรียบ จึงเหมาะแก่การนำมาเป็นยูนิฟอร์มสำหรับใส่ทำงาน",
                "alt": "ผ้าที่ได้รับความนิยมในการผลิตเสื้อ"
            },
            "tcTk": {
                "name": "ทีซี/ทีเค",
                "description": "เป็นเนื้อผ้าอีกชนิดหนึ่งที่ได้รับความนิยมเพราะมีราคาถูก นำหนักเบา ระบายความร้อน ด้วยความหนากำลังดีทำให้สวมใส่สบาย มีส่วนผสมของ polyester และ cotton เพื่อให้เหมาะสมสำหรับการสวมใส่ที่หลากหลาย มีคุณสมบัติพิเศษคือเนื้อผ้ามีความแน่นละเอียด รีดง่าย ยับยาก ทนต่อการซัก",
                "alt": "เนื้อผ้าที่เหมาะกับการผลิตเสื้อ"
            }
        }
    },
    "en": {
        "heading": "{nameEn}",
        "fabrics": {
            "cottonWaterproof": {
                "name": "Cotton waterproof",
                "description": "Cotton with high breathability, made from natural cotton fibers for a soft, lightweight, comfortable and flexible feel. It is coated with a water-repellent finish that works like a lotus leaf, so water won't soak into the fabric. It can be washed up to 30 times, is gentle on the skin and ideal for fabric face masks.",
                "alt": "Screen printing fabric"
            },
            "cottonComb": {
                "name": "Cotton comb",
                "description": "Cotton spun from combed fibers using a more complex and refined machine process than carded cotton, producing finer, longer yarns with more impurities removed. The result is a soft, tear-resistant fabric that still breathes well, resists wrinkles and doesn't shrink easily — ideal for your own T-shirt brand.",
                "alt": "Fabric for screen-printed shirts"
            },
            "cotton100": {
                "name": "Cotton semi",
                "description": "100% cotton spun using a machine carding process, producing thicker, shorter yarns with medium softness. Its key strengths are an affordable price and a thick fabric that resists wrinkles.",
                "alt": "Choosing fabric for screen-printed shirts"
            },
            "dryFeel": {
                "name": "Dry feel",
                "description": "A fabric that combines the best of cotton and polyester, with each woven on a different side so the two faces of the fabric are different materials. This makes Dry Feel one of the highest-grade fabrics on the market. It absorbs sweat well, holds its shape, resists wrinkles, doesn't pill after washing and is comfortable to wear — ideal for uniforms.",
                "alt": "Selecting fabric for screen-printed shirts"
            },
            "dryTech": {
                "name": "Dry tech",
                "description": "A fabric that combines the best of cotton and polyester, with each woven on a different side so the two faces of the fabric are different materials. Dry Tech is another high-grade fabric on the market. It absorbs sweat well, doesn't wrinkle, doesn't pill even after many washes and is comfortable to wear — ideal for uniforms and staff shirts.",
                "alt": "Which fabric for screen-printed shirts"
            },
            "microSport": {
                "name": "Micro sport",
                "description": "A fabric designed specifically for exercise. It offers excellent sweat absorption and breathability and dries up to 3 times faster than usual. It's affordable, smooth and soft to the touch, and still looks new even after many washes.",
                "alt": "Fabric for screen-printed shirts"
            },
            "jutiMicro": {
                "name": "Juti micro",
                "description": "A fabric designed to replace traditional uniform fabrics that fade or pill after a while and need frequent replacing. Juti Micro is more durable, with the quick-drying, breathable qualities of micro fabric, a medium-soft feel, colors that don't fade after washing and minimal pilling. It's also great for polo shirts, making it our most popular fabric.",
                "alt": "Shirt-making fabric"
            },
            "muslin": {
                "name": "Muslin",
                "description": "A fabric often used for hygienic face masks, and by many for dust-mite-resistant pillowcases and bedding. Made from 100% cotton, it is breathable, lightweight and excellent at blocking water droplets. It's also strong enough to be washed more than 100 times.",
                "alt": "Shirt-making fabric"
            },
            "nanoWaterproof": {
                "name": "Nano waterproof",
                "description": "Water-repellent and made from quality materials, this fabric doesn't sag, is durable yet thin and light, and suits both men and women. It's ideal for exercise or sports as it breathes well, never feels hot, dries quickly and helps reduce dampness.",
                "alt": "Custom T-shirt production"
            },
            "supersoff": {
                "name": "Supersoff",
                "description": "Made from natural cotton fibers, this fabric has a thick, soft feel yet breathes exceptionally well — in hot weather it feels as light as a thin shirt. It doesn't pill after washing, making it ideal for brand apparel.",
                "alt": "Choosing fabric for T-shirt production"
            },
            "tcLacoste": {
                "name": "TC lacoste",
                "description": "One of the most popular fabrics, designed for uniforms. It breathes reasonably well, feels soft, doesn't shrink or sag, resists pilling even after many washes and stays smooth — ideal for work uniforms.",
                "alt": "Popular fabric for shirt production"
            },
            "tcTk": {
                "name": "TC/TK",
                "description": "Another popular fabric thanks to its low price. It is lightweight, breathable and just the right thickness for comfortable wear. A blend of polyester and cotton suited to many uses, it has a dense, fine weave, is easy to iron, resists wrinkles and withstands washing.",
                "alt": "Fabric suited to shirt production"
            }
        }
    }
}
</i18n>

<template>
    <div>
        <ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
        <ProseP class="text-lg mb-5"><slot name="description" mdc-unwrap="p" /></ProseP>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="item in data" :key="item.nameEn" class="bg-stone-50 border border-stone-300 rounded-lg p-3">
                <ProseH3>{{ item.heading }}</ProseH3>
                <ProseP>{{ item.description }}</ProseP>
            </div>
        </div>
    </div>
</template>
