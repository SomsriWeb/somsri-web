<script setup lang="ts">
// SLOTS
interface Slots {
    /**
     * Component ที่ต้องการเอา Styling ออก
     * รองรับแค่ H1 H2 H3 H4 H5 H6 และ P
     */
    default(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <slot mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
</template>
