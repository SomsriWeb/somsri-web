<script setup lang="ts">
interface Slots {
    /**
     * ภาพประกอบ
     */
    image(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div class="flex justify-center p-4 m-0">
        <slot mdc-unwrap="p" name="image" />
    </div>
</template>
