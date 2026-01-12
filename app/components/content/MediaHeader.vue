<script lang="ts" setup>
interface Slots {
    /**
     * หัวข้อใหญ่ ข้อความที่แสดงจะเป็น H1
     */
    header(): unknown;

    /**
     * ภาพประกอบ
     */
    imageBanner(): unknown;

    /**
     * ข้อความอธิบายทั่วไป
     */
    descriptionText(): unknown;

    /**
     * ข้อความอธิบายแบบเป็นลิสต์
     */
    descriptionList(): unknown;

    /**
     * ข้อความที่เป็นสโลแกน
     */
    sloganText(): unknown;

    /**
     * ข้อความอธิบายสโลแกน
     */
    descriptionSlogan(): unknown;

    /**
     * ข้อความอธิบายทั่วไป
     */
    strategyText(): unknown;
    strategyTextSocialMedia(): unknown;

    /**
     * ข้อความอธิบายแบบเป็นลิสต์
     */
    strategyList(): unknown;
    contentMedia(): unknown;
    contentSocialMedia(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div>
        <ProseH1 class="text-center font-bold bg-primary text-white py-3 rounded-2xl">
            <slot name="header" mdc-unwrap="p" />
        </ProseH1>

        <ProseH2 class="font-bold text-primary">
            <slot mdc-unwrap="p" name="strategyText" />
        </ProseH2>

        <div class="w-full px-4">
            <slot mdc-unwrap="p" name="contentMedia" />
        </div>
        <ProseH2 class="font-bold text-primary">
            <slot mdc-unwrap="p" name="strategyTextSocialMedia" />
        </ProseH2>

        <div class="w-full px-4">
            <slot mdc-unwrap="p" name="contentSocialMedia" />
        </div>
    </div>
</template>
