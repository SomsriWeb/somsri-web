<script setup lang="ts">
interface Slots {
    /**
     * ภาพแบนเนอร์ (ใส่เป็น Component ภาพ)
     */
    image(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <!-- รูปภาพ เเบนเนอร์ -->
    <div class="flex justify-center m-0 p-0">
        <slot mdc-unwrap="p" name="image" />
    </div>
</template>
