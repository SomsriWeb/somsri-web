<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (แสดงผลเป็น H2)
     * @default ทรงของกระเป๋าผ้า
     */
    title(): unknown;

    /**
     * รายละเอียด (แสดงผลเป็น P)
     * @default กระเป๋าผ้าทรง TOTE BAG (ผ้าแคนวาส) สามารถ customize ตามขนาดและทรงที่ต้องการได้ โดยเรามีแพทเทิร์นของโรงงานให้เลือก 3 แบบ ดังนี้
     */
    description(): unknown;

    /**
     * ข้างล่างรูปแบบกระเป๋าผ้า (ไม่จำเป็นต้องใส่) (ใส่ Component อะไรก็ได้)
     */
    footer(): unknown | undefined;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": {
        "title": "ทรงของกระเป๋าผ้า",
        "description": "กระเป๋าผ้าทรง TOTE BAG (ผ้าแคนวาส) สามารถ customize ตามขนาดและทรงที่ต้องการได้ โดยเรามีแพทเทิร์นของโรงงานให้เลือก 3 แบบ ดังนี้",
        "sizes": [
            "13in x 21in (สายยาว 22 นิ้ว)",
            "14in x 17.5in (ไม่รวมความยาวสาย)",
            "16in x 16in (สายยาว 22 นิ้ว)"
        ]
    },
    "en": {
        "title": "Tote Bag Shapes",
        "description": "Our TOTE BAG (canvas) can be customized to the size and shape you need. Choose from 3 factory patterns:",
        "sizes": [
            "13in x 21in (22-inch strap)",
            "14in x 17.5in (excluding strap)",
            "16in x 16in (22-inch strap)"
        ]
    }
}
</i18n>
<template>
    <Container class="bg-primary">
        <div>
            <ProseH2 class="!text-white text-center text-5xl md:text-6xl py-5"><slot name="title" mdc-unwrap="p" />{{ t('title') }}</ProseH2>
            <ProseP class="!text-white text-center text-lg">
                <slot name="description" mdc-unwrap="p">{{ t('description') }}</slot>
            </ProseP>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
                <ProseImg :src="'/landing-page-tote-bag/GTWM.png'" class="mb-5" />
                <ProseH3 class="!text-white text-center">GTWM</ProseH3>
                <ProseP class="!text-white text-center">{{ t('sizes.0') }}</ProseP>
            </div>

            <div>
                <ProseImg :src="'/landing-page-tote-bag/KOREA.png'" class="mb-5" />
                <ProseH3 class="!text-white text-center">Korea</ProseH3>
                <ProseP class="!text-white text-center">{{ t('sizes.1') }}</ProseP>
            </div>

            <div>
                <ProseImg :src="'/landing-page-tote-bag/SQUARE.png'" class="mb-5" />
                <ProseH3 class="!text-white text-center">Square</ProseH3>
                <ProseP class="!text-white text-center">{{ t('sizes.2') }}</ProseP>
            </div>
        </div>

        <slot v-if="$slots.footer" name="footer" />
    </Container>
</template>
