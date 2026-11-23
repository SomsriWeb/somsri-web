<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (แสดงผลเป็น H2)
     */
    title(): unknown;

    /**
     * รายละเอียด (แสดงผลเป็น P)
     */
    description(): unknown;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": {
        "styles": "โดยสมศรีมีเสื้อมีรูปแบบของเสื้อยืดให้เลือกมากกว่า 6 รูปแบบ",
        "list": [
            "เสื้อยืดคอกลม",
            "เสื้อยืดคอวี",
            "เสื้อยืดคอปาด",
            "เสื้อยืด Oversize",
            "เสื้อยืด Crop Top",
            "เสื้อยืดแขนกุด"
        ],
        "delivery": "นอกจากนี้โรงงานผลิตเสื้อของสมศรียังมีบริการจัดส่งให้ถึงที่ ส่งตรงเวลา จัดส่งฟรีในพื้นที่กรุงเทพฯ และรับประกันสินค้าถึง 90 วัน เรียกได้ว่าสมศรีมีเสื้อเป็นโรงงานผลิตเสื้อที่ได้รวมทุกการบริการไว้ในที่เดียวแบบ One Stop Service รับประกันความพึงพอใจสำหรับทุกคำสั่งซื้อค่ะ",
        "designIntro": "โรงงานผลิตเสื้อของสมศรีมีเสื้อมีบริการออกแบบลายเสื้อฟรีและเรายังเป็นโรงงานสกรีนเสื้อที่มีบริการสกรีนเสื้อและสีสกรีนเสื้อให้เลือกหลายรูปแบบ",
        "techniques": "ไม่ว่าจะเป็น สกรีนเสื้อแบบยาง สกรีนเสื้อแบบไฮเดน สกรีนเสื้อแบบไล่สี สกรีนเสื้อแบบฟรอยทอง รีดร้อน DFT มีการปักทรานเฟอร์และการพิมพ์ลายอีกด้วยค่ะ"
    },
    "en": {
        "styles": "SomsriTshirt offers more than 6 T-shirt styles to choose from:",
        "list": [
            "Crew neck T-shirt",
            "V-neck T-shirt",
            "Boat neck T-shirt",
            "Oversized T-shirt",
            "Crop top T-shirt",
            "Sleeveless T-shirt"
        ],
        "delivery": "Our factory also delivers right to your door, on time — with free delivery in Bangkok and a 90-day product warranty. SomsriTshirt is a true one-stop-service shirt factory, with satisfaction guaranteed on every order.",
        "designIntro": "SomsriTshirt's factory offers free shirt design, and as a screen-printing factory we provide a wide range of printing methods and ink colors to choose from.",
        "techniques": "These include plastisol (rubber) printing, high-density printing, gradient printing, gold foil, DFT heat transfer, transfer embroidery and digital printing."
    }
}
</i18n>
<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div>
            <ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
            <ProseP class="text-lg"><slot name="description" mdc-unwrap="p" /></ProseP>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-primary rounded-xl p-3 text-white space-y-3">
                <p>{{ t('styles') }}</p>
                <ul class="list-disc list-inside">
                    <li>{{ t('list.0') }}</li>
                    <li>{{ t('list.1') }}</li>
                    <li>{{ t('list.2') }}</li>
                    <li>{{ t('list.3') }}</li>
                    <li>{{ t('list.4') }}</li>
                    <li>{{ t('list.5') }}</li>
                </ul>
                <p>{{ t('delivery') }}</p>
            </div>

            <div class="bg-primary rounded-xl p-3 text-white space-y-3 h-fit">
                <p>{{ t('designIntro') }}</p>

                <p>{{ t('techniques') }}</p>
            </div>
        </div>
    </div>
</template>
