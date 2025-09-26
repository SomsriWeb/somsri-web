<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * หัวข้อ (ใส่ Component อะไรก็ได้)
     */
    title(): unknown;

    /**
     * รายละเอียด (ใส่ Component อะไรก็ได้)
     */
    description(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div>
        <slot name="title" />
        <slot name="description" />
    </div>
</template>
