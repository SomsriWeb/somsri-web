<script setup lang="ts">
// VARIABLE
const data = [
    {
        label: 'ขั้นต่ำในการสั่งผลิตเสื้อกี่ตัว',
        slot: '1' as const,
    },
    {
        label: 'ไม่มีแบบเสื้อ สามารถสั่งผลิตได้หรือไม่',
        slot: '2' as const,
    },
    {
        label: 'มีค่าทำตัวอย่างหรือไม่',
        slot: '3' as const,
    },
    {
        label: 'แก้ไขแบบได้กี่ครั้ง',
        slot: '4' as const,
    },
    {
        label: 'สามารถเลือกเนื้อผ้าเองได้หรือไม่',
        slot: '5' as const,
    },
    {
        label: 'มีบริการจัดส่งทั่วประเทศหรือไม่',
        slot: '6' as const,
    },
];
</script>
<template>
    <div class="border border-stone-200 rounded-xl p-2">
        <UAccordion :items="data" :ui="{ trigger: 'p-1', item: 'border-stone-200', content: 'px-3' }" :unmount-on-hide="false">
            <template #default="{ item }">
                <h3 class="text-default">{{ item.label }}</h3>
            </template>

            <template #1>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">เสื้อยืด:</span> ขั้นต่ำ 150 ตัว / สี / แบบ</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">เสื้อโปโลและสินค้าอื่น ๆ:</span> ขั้นต่ำ 100 ตัว / สี / แบบ</ProseLi>
                </ul>
            </template>

            <template #2>
                <ProseP class="text-sm text-muted">ได้ค่ะ หากยังไม่มีแบบเสื้อ ทางสมศรีมี แบบเสื้อมาตรฐานและทรง Oversize ให้เลือกผลิต</ProseP>
                <ProseP class="text-sm text-muted">หากต้องการผลิตตามแบบเฉพาะของแบรนด์ สามารถส่งตัวอย่างเสื้อมาให้ทางเราทำการ แกะแพทเทิร์น ได้โดยมีค่าใช้จ่ายดังนี้</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted">ค่าแกะแพทเทิร์น 500 บาท</ProseLi>
                    <ProseLi class="text-muted">ค่าเกลี่ยไซซ์ 150 บาท / ไซซ์</ProseLi>
                </ul>
            </template>

            <template #3>
                <ProseP class="text-sm text-muted">หากยืนยันสั่งผลิตออเดอร์จริง ทางสมศรี ขึ้นตัวอย่างให้ฟรี ไม่มีค่าใช้จ่าย</ProseP>
                <ProseP class="text-sm text-muted">กรณีต้องการผลิตเฉพาะเสื้อตัวอย่าง จะมีค่าใช้จ่าย 1,000 บาท / ตัว / แบบ และสามารถนำยอด 1,000 บาท ไปใช้เป็นส่วนลดเมื่อสั่งผลิตจริงได้</ProseP>
            </template>

            <template #4>
                <ProseP class="text-sm text-muted">เพื่อให้ได้แบบที่ตรงกับความต้องการมากที่สุด ลูกค้าสามารถแก้ไขได้ดังนี้</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">Artwork (AW)</span> แก้ไขได้ 3 ครั้ง</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">เสื้อตัวอย่าง</span> แก้ไขได้ 2 ครั้ง</ProseLi>
                </ul>
            </template>

            <template #5>
                <ProseP class="text-sm text-muted">ได้ค่ะ ลูกค้าสามารถเลือกเนื้อผ้าได้ตามความต้องการ</ProseP>
                <ProseP class="text-sm text-muted">หากยังไม่แน่ใจ ทางสมศรีมีบริการ จัดส่งตัวอย่างชิ้นผ้าให้เลือกฟรี เพื่อให้ลูกค้าสัมผัสเนื้อผ้าจริงก่อนตัดสินใจ โดยไม่มีค่าใช้จ่าย</ProseP>
            </template>

            <template #6>
                <ProseP class="text-sm text-muted">มีบริการจัดส่งทั่วประเทศไทย</ProseP>
                <ul class="list-disc list-inside text-sm text-muted">
                    <ProseLi class="text-muted"><span class="font-bold">กรุงเทพฯ และปริมณฑล :</span> จัดส่งผ่าน Lalamove</ProseLi>
                    <ProseLi class="text-muted"><span class="font-bold">ต่างจังหวัด :</span> จัดส่งผ่าน J&T Express และ Flash Express</ProseLi>
                    <ProseP class="text-sm text-muted">ทั้งนี้ วิธีการจัดส่งสามารถเลือกให้เหมาะสมกับพื้นที่และความต้องการของลูกค้าได้</ProseP>
                </ul>
            </template>
        </UAccordion>
    </div>
</template>
