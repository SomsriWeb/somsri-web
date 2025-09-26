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

    /**
     * ข้อความอธิบายแบบเป็นลิสต์
     */
    strategyList(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div>
        <ProseH1 class="text-center font-bold bg-primary text-white py-3 rounded-2xl">
            <slot name="header" mdc-unwrap="p" />
        </ProseH1>

        <div class="flex justify-center pt-5">
            <slot mdc-unwrap="p" name="imageBanner" />
        </div>

        <div class="font-light pt-5 text-stone-500">
            <ProseP>
                <slot mdc-unwrap="p" name="descriptionText" />
            </ProseP>
        </div>
        <div class="flex justify-center text-stone-500 font-light text-left max-w-4xl w-full px-4">
            <slot mdc-unwrap="p" name="descriptionList" />
        </div>

        <div>
            <ProseH2 class="text-center font-bold text-primary">
                <slot mdc-unwrap="p" name="sloganText" />
            </ProseH2>
            <ProseP class="text-center font-bold text-primary">
                <slot mdc-unwrap="p" name="descriptionSlogan" />
            </ProseP>
        </div>

        <div>
            <ProseP class="text-start font-bold text-primary">
                <slot mdc-unwrap="p" name="strategyText" />
            </ProseP>
            <div class="flex justify-start font-light text-stone-500 max-w-4xl w-full px-4">
                <slot mdc-unwrap="p" name="strategyList" />
            </div>
        </div>
    </div>
</template>
