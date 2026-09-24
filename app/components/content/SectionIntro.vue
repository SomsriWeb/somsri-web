<script setup lang="ts">
interface Slots {
    eyebrow(): unknown;
    title(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="mx-auto mb-0 max-w-2xl px-5 pt-10 text-center title-block md:pt-14">
        <p v-if="$slots.eyebrow" class="text-sm font-bold text-primary">
            <slot name="eyebrow" mdc-unwrap="p" />
        </p>
        <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
            <slot name="title" mdc-unwrap="p" />
        </h2>
    </div>
</template>

<style scoped>
/* บังคับให้แต่ละบรรทัดของ title ขึ้นบรรทัดใหม่จริง (markdown hard break \ ท้ายบรรทัด) แทนที่จะปล่อยให้ browser wrap เอง */
.title-block :deep(br) {
    display: block;
    content: '';
}
</style>