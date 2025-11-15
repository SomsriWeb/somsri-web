<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ไม่ต้องเว้นระยะห่างแต่ละ Component
     */
    noSpace?: boolean;
    image: string;
}
const { noSpace = false, image } = defineProps<Props>();

// SLOT
interface Slots {
    /**
     * Component ที่จะเอามาแสดง
     */
    default(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const bgImageValue = `url(${image})`;
</script>

<template>
    <div class="w-full px-5 lg:px-[4.6rem] py-12 bg-center bg-cover" :class="{ 'space-y-8': !noSpace }" :style="{ backgroundImage: bgImageValue }">
        <slot />
    </div>
</template>
