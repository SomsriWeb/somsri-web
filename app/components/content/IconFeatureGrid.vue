<script setup lang="ts">
/** กริดไอคอน + ข้อความ: md+ 2 คอลัมน์ (ซ้าย 3 / ขวา 2) */
defineSlots<Record<string, () => unknown>>();
</script>

<template>
    <div
        class="icon-feature-grid grid min-w-0 grid-cols-1 gap-4 text-stone-900 md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-10 md:gap-y-5"
        aria-label="รายละเอียดคุณสมบัติ"
    >
        <div
            v-for="n in 5"
            :key="n"
            class="icon-feature-grid__row flex min-w-0 items-center gap-3 md:gap-4 [&_p]:m-0 [&_p]:flex-1 [&_p]:min-w-0 [&_p]:font-bold [&_p]:leading-snug"
        >
            <slot :name="`item-${n}`" mdc-unwrap="p" />
        </div>
    </div>
</template>

<style scoped>
/* บังคับขนาดให้ชนะ ProseImg / NuxtImg ที่มี w-full */
.icon-feature-grid__row :deep(img) {
    width: 2rem !important;
    height: 2rem !important;
    max-width: 2rem !important;
    max-height: 2rem !important;
    flex-shrink: 0;
    object-fit: contain;
}
</style>
