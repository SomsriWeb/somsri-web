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
        "factoryAlt": "รับผลิตเสื้อยืด สั่งทำเสื้อพร้อมสกรีน"
    },
    "en": {
        "factoryAlt": "Custom T-shirt manufacturing with screen printing"
    }
}
</i18n>
<template>
    <div class="grid grid-cols-1md:grid-cols-2 gap-5">
        <div>
            <ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
            <ProseP class="text-lg"><slot name="description" mdc-unwrap="p" /></ProseP>
        </div>

        <div>
            <NuxtImg src="/tshirt-factory/introduce-factory.png" :alt="t('factoryAlt')" class="object-cover w-full h-full rounded-xl" format="webp" loading="lazy" placeholder />
        </div>
    </div>
</template>
