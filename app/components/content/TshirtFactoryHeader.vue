<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (แสดงผลเป็น H1)
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
        "tshirtAlt": "สมศรีมีเสื้อ รับผลิตเสื้อ สั่งทำเสื้อครบวงจรในที่เดียว"
    },
    "en": {
        "tshirtAlt": "SomsriTshirt – custom shirt manufacturing, a complete one-stop service"
    }
}
</i18n>
<template>
    <div>
        <header>
            <NuxtImg src="/tshirt-factory/bg.png" class="w-screen h-screen object-cover" />
            <div class="absolute inset-0 bg-black/30" />
            <div class="absolute bottom-[5rem] left-[5rem] text-white max-w-[35rem]">
                <p class="text-xl text-white">{{ $t('brand') }}</p>
                <h1 class="text-7xl font-bold"><slot name="title" mdc-unwrap="p" /></h1>
                <p class="font-light text-xl mb-5">
                    <slot name="description" mdc-unwrap="p" />
                </p>
            </div>
            <ProseImg src="/tshirt-factory/tshirt.png" :alt="t('tshirtAlt')" class="absolute bottom-[5rem] right-[3rem]" />
        </header>
    </div>
</template>
