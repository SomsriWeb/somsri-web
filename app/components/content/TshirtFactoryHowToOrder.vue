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

    /**
     * เนื้อหา (ใส่ Component อะไรก็ได้)
     */
    content(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div>
        <ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
        <ProseP class="mb-3"><slot name="description" mdc-unwrap="p" /></ProseP>

        <div class="pl-5">
            <slot name="content" />
        </div>
    </div>
</template>
