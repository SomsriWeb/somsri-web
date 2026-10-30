<script setup lang="ts">
/**
 * หัวข้อ section ของหน้า /polo-shirt: ป้าย eyebrow + H2 + คำอธิบาย
 * ใช้ภายใน component PoloShirt* เท่านั้น (ไม่ได้เรียกจาก Markdown โดยตรง)
 */
interface Props {
    /** จัดกึ่งกลาง */
    center?: boolean;
    /** พื้นหลัง section เป็นสีชมพู ให้ป้าย eyebrow เป็นพื้นขาว */
    onTint?: boolean;
}
const { center = false, onTint = false } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="mb-6 max-w-3xl md:mb-9" :class="center ? 'mx-auto text-center' : ''">
        <span
            v-if="$slots.eyebrow"
            class="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wide text-primary md:text-sm"
            :class="onTint ? 'bg-white' : 'bg-primary/12'"
        >
            <slot name="eyebrow" />
        </span>
        <h2 class="text-2xl leading-snug font-bold text-balance text-stone-900 md:text-3xl">
            <slot name="title" />
        </h2>
        <div v-if="$slots.description" class="mt-2 text-sm text-slate-500 md:text-base [&_a]:text-primary [&_a]:underline">
            <slot name="description" />
        </div>
    </div>
</template>
