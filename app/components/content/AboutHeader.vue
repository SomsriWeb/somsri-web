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
    imageBannerList(): unknown;

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
    strategyTextHeader(): unknown;
    strategyText(): unknown;

    /**
     * ข้อความอธิบายแบบเป็นลิสต์
     */
    strategyimage1(): unknown;

    strategyList1(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div>
        <h1 class="text-left font-bold bg-primary text-white py-1 rounded-2xl mt-2 text-3xl pl-2">
            <slot name="header" mdc-unwrap="p" />
        </h1>

        <div class="grid gap-4 pt-5 md:grid-cols-2">
            <slot mdc-unwrap="p" name="imageBanner" />
            <ProseP class="text-stone-500">
                <slot mdc-unwrap="p" name="descriptionText" />
            </ProseP>
        </div>
        <div class="grid grid-cols-2 gap-4 justify-center items-center text-stone-500 font-light text-left max-w-4xl w-full px-4">
            <slot mdc-unwrap="p" name="imageBannerList" />
            <slot mdc-unwrap="p" name="descriptionSlogan" />
        </div>
        
        <div class="flex gap-4 text-stone-500 font-light text-left max-w-4xl w-full px-4">
            <div class="w-1/2 flex justify-center items-baseline">
                <slot mdc-unwrap="p" name="strategyimage1" />
            </div>
            <div class="">
                <slot mdc-unwrap="p" name="strategyList1" />
            </div>
        </div>
    </div>
</template>
