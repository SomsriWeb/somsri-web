<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ไม่ต้องเว้นระยะห่างแต่ละ Component
     */
    noSpace?: boolean;
}
const { noSpace = false } = defineProps<Props>();

// SLOT
interface Slots {
    /**
     * Component ที่จะเอามาแสดง
     */
    default(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="w-full px-5 md:px-[4.6rem] py-[3rem]" :class="{ 'space-y-8': !noSpace }">
        <slot />
    </div>
</template>
