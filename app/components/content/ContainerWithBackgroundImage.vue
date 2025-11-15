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
const bgImageClass = `bg-[url(${image})] bg-center bg-cover`;
</script>

<template>
    <div class="w-full px-5 lg:px-[4.6rem] py-12" :class="{ 'space-y-8': !noSpace, [bgImageClass]: true }">
        <slot />
    </div>
</template>
