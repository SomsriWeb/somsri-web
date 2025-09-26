<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * ภาพที่แสดงผล (ใส่เป็น Component ภาพ)
     */
    image(): unknown;

    /**
     * หัวข้อ (แสดงเป็น H1)
     */
    title(): unknown;

    /**
     * ข้อความรอง (แสดงเป็น H2)
     */
    subtitle(): unknown;

    /**
     * รายละเอียด (แสดงเป็น P)
     */
    description(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <!--รูปภาพ เนื้อหา-->
    <div class="flex justify-center pb-5">
        <slot mdc-unwrap="p" name="image" />
    </div>

    <!--ข้อความหัวข้อ-->
    <div class="text-center text-primary text-3xl font-bold pb-5 m-0">
        <ProseH1><slot name="title" mdc-unwrap="p" /></ProseH1>
        <ProseH2><slot name="subtitle" mdc-unwrap="p" /></ProseH2>
        <ProseP class="text-lg font-light">
            <slot mdc-unwrap="p" name="description" />
        </ProseP>
    </div>
</template>
