<script setup lang="ts">
interface Slots {
    /**
     * หัวข้อใหญ่ ข้อความที่แสดงจะเป็น H1
     */
    titleH1(): unknown;

    /**
     * หัวข้อรอง ข้อความที่แสดงจะเป็น H2
     */
    titleH2(): unknown;

    /**
     * ข้อความอธิบายทั่วไป
     */
    titleP(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="flex justify-center text-center mb-0">
        <ProseH1><slot mdc-unwrap="p" name="titleH1" /></ProseH1>
    </div>

    <div class="flex justify-center text-center">
        <ProseH2><slot mdc-unwrap="p" name="titleH2" /></ProseH2>
    </div>

    <div class="flex justify-center text-lg">
        <ProseP><slot mdc-unwrap="p" name="titleP" /></ProseP>
    </div>
</template>
