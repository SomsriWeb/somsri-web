<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ไม่ต้องเว้นระยะห่างแต่ละ Component
     */
    noSpace?: boolean;

    noPaddingTop?: boolean;
}
const { noSpace = false, noPaddingTop = false } = defineProps<Props>();

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
    <div class="w-full px-5 lg:px-[4.6rem] py-12 mt-2" :class="{ 'space-y-8': !noSpace, 'pt-0': !noPaddingTop }">
        <slot />
    </div>
</template>
