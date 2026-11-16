<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });

// VARIABLE
const data = computed(() => [
    {
        label: t('q1'),
        slot: '1' as const,
    },
    {
        label: t('q2'),
        slot: '2' as const,
    },
    {
        label: t('q3'),
        slot: '3' as const,
    },
    {
        label: t('q4'),
        slot: '4' as const,
    },
    {
        label: t('q5'),
        slot: '5' as const,
    },
    {
        label: t('q6'),
        slot: '6' as const,
    },
]);
</script>

<i18n lang="json">
{
    "th": {
        "q1": "ขั้นต่ำในการสั่งผลิตเสื้อกี่ตัว",
        "q2": "ไม่มีแบบเสื้อ สามารถสั่งผลิตได้หรือไม่",
        "q3": "มีค่าทำตัวอย่างหรือไม่",
        "q4": "แก้ไขแบบได้กี่ครั้ง",
        "q5": "สามารถเลือกเนื้อผ้าเองได้หรือไม่",
        "q6": "มีบริการจัดส่งทั่วประเทศหรือไม่",
        "a1": {
            "tshirtLabel": "เสื้อยืด:",
            "tshirt": "ขั้นต่ำ 150 ตัว / สี / แบบ",
            "poloLabel": "เสื้อโปโลและสินค้าอื่น ๆ:",
            "polo": "ขั้นต่ำ 100 ตัว / สี / แบบ"
        },
        "a2": {
            "p1": "ได้ค่ะ หากยังไม่มีแบบเสื้อ ทางสมศรีมี แบบเสื้อมาตรฐานและทรง Oversize ให้เลือกผลิต",
            "p2": "หากต้องการผลิตตามแบบเฉพาะของแบรนด์ สามารถส่งตัวอย่างเสื้อมาให้ทางเราทำการ แกะแพทเทิร์น ได้โดยมีค่าใช้จ่ายดังนี้",
            "li1": "ค่าแกะแพทเทิร์น 500 บาท",
            "li2": "ค่าเกลี่ยไซซ์ 150 บาท / ไซซ์"
        },
        "a3": {
            "p1": "หากยืนยันสั่งผลิตออเดอร์จริง ทางสมศรี ขึ้นตัวอย่างให้ฟรี ไม่มีค่าใช้จ่าย",
            "p2": "กรณีต้องการผลิตเฉพาะเสื้อตัวอย่าง จะมีค่าใช้จ่าย 1,000 บาท / ตัว / แบบ และสามารถนำยอด 1,000 บาท ไปใช้เป็นส่วนลดเมื่อสั่งผลิตจริงได้"
        },
        "a4": {
            "p1": "เพื่อให้ได้แบบที่ตรงกับความต้องการมากที่สุด ลูกค้าสามารถแก้ไขได้ดังนี้",
            "artwork": "แก้ไขได้ 3 ครั้ง",
            "sampleLabel": "เสื้อตัวอย่าง",
            "sample": "แก้ไขได้ 2 ครั้ง"
        },
        "a5": {
            "p1": "ได้ค่ะ ลูกค้าสามารถเลือกเนื้อผ้าได้ตามความต้องการ",
            "p2": "หากยังไม่แน่ใจ ทางสมศรีมีบริการ จัดส่งตัวอย่างชิ้นผ้าให้เลือกฟรี เพื่อให้ลูกค้าสัมผัสเนื้อผ้าจริงก่อนตัดสินใจ โดยไม่มีค่าใช้จ่าย"
        },
        "a6": {
            "p1": "มีบริการจัดส่งทั่วประเทศไทย",
            "bkkLabel": "กรุงเทพฯ และปริมณฑล :",
            "bkk": "จัดส่งผ่าน Lalamove",
            "upcountryLabel": "ต่างจังหวัด :",
            "upcountry": "จัดส่งผ่าน J&T Express และ Flash Express",
            "note": "ทั้งนี้ วิธีการจัดส่งสามารถเลือกให้เหมาะสมกับพื้นที่และความต้องการของลูกค้าได้"
        }
    },
    "en": {
        "q1": "What is the minimum order quantity?",
        "q2": "I don't have a design yet — can I still place an order?",
        "q3": "Is there a charge for samples?",
        "q4": "How many design revisions are included?",
        "q5": "Can I choose my own fabric?",
        "q6": "Do you deliver nationwide?",
        "a1": {
            "tshirtLabel": "T-shirts:",
            "tshirt": "Minimum 150 pcs / color / design",
            "poloLabel": "Polo shirts and other products:",
            "polo": "Minimum 100 pcs / color / design"
        },
        "a2": {
            "p1": "Yes. If you don't have a design yet, SomsriTshirt offers standard and oversized shirt styles for you to choose from.",
            "p2": "If you'd like production to follow your brand's own garment, simply send us a sample shirt and we will create the pattern from it, at the following cost:",
            "li1": "Pattern making: 500 THB",
            "li2": "Size grading: 150 THB / size"
        },
        "a3": {
            "p1": "Once you confirm a production order, SomsriTshirt makes your sample free of charge.",
            "p2": "If you only need a sample shirt, the cost is 1,000 THB / piece / design — and the full 1,000 THB can be credited as a discount when you place your production order."
        },
        "a4": {
            "p1": "To make sure the design matches exactly what you want, revisions are included as follows:",
            "artwork": "up to 3 revisions",
            "sampleLabel": "Sample shirt",
            "sample": "up to 2 revisions"
        },
        "a5": {
            "p1": "Yes. You can choose any fabric that suits your needs.",
            "p2": "Not sure yet? SomsriTshirt will send you fabric swatches free of charge so you can feel the actual material before you decide."
        },
        "a6": {
            "p1": "We deliver throughout Thailand.",
            "bkkLabel": "Bangkok and vicinity:",
            "bkk": "delivered via Lalamove",
            "upcountryLabel": "Other provinces:",
            "upcountry": "delivered via J&T Express and Flash Express",
            "note": "The delivery method can be adjusted to suit your location and requirements."
        }
    }
}
</i18n>

<template>
    <div class="border border-stone-200 rounded-xl p-2">
        <UAccordion :items="data" :ui="{ trigger: 'p-1', item: 'border-stone-200', content: 'px-3' }" :unmount-on-hide="false">
            <template #default="{ item }">
                <h3 class="text-default">{{ item.label }}</h3>
            </template>

            <template #1>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">{{ t('a1.tshirtLabel') }}</span> {{ t('a1.tshirt') }}</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">{{ t('a1.poloLabel') }}</span> {{ t('a1.polo') }}</ProseLi>
                </ul>
            </template>

            <template #2>
                <ProseP class="text-sm text-muted">{{ t('a2.p1') }}</ProseP>
                <ProseP class="text-sm text-muted">{{ t('a2.p2') }}</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted">{{ t('a2.li1') }}</ProseLi>
                    <ProseLi class="text-muted">{{ t('a2.li2') }}</ProseLi>
                </ul>
            </template>

            <template #3>
                <ProseP class="text-sm text-muted">{{ t('a3.p1') }}</ProseP>
                <ProseP class="text-sm text-muted">{{ t('a3.p2') }}</ProseP>
            </template>

            <template #4>
                <ProseP class="text-sm text-muted">{{ t('a4.p1') }}</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">Artwork (AW)</span> {{ t('a4.artwork') }}</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">{{ t('a4.sampleLabel') }}</span> {{ t('a4.sample') }}</ProseLi>
                </ul>
            </template>

            <template #5>
                <ProseP class="text-sm text-muted">{{ t('a5.p1') }}</ProseP>
                <ProseP class="text-sm text-muted">{{ t('a5.p2') }}</ProseP>
            </template>

            <template #6>
                <ProseP class="text-sm text-muted">{{ t('a6.p1') }}</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">{{ t('a6.bkkLabel') }}</span> {{ t('a6.bkk') }}</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">{{ t('a6.upcountryLabel') }}</span> {{ t('a6.upcountry') }}</ProseLi>
                    <ProseP class="text-sm text-muted">{{ t('a6.note') }}</ProseP>
                </ul>
            </template>
        </UAccordion>
    </div>
</template>
