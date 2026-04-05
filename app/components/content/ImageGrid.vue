<script setup lang="ts">
interface Props {
    /** จำนวนช่องสล็อต item-1 … item-N */
    items?: number;
    gapClass?: string;
    /** คลาสเพิ่มต่อเซลล์ (นอกเหนือ aspect + rounded) */
    cellClass?: string;
    /** cover = เต็มกรอบ, contain = โชว์ภาพเต็ม (แคตตาล็อกเสื้อ) */
    imageFit?: 'cover' | 'contain';
    /** จัดกริดให้อยู่กลาง (เหมาะกับ items น้อย เช่น 2 รูป — ไม่ใช้ md:grid-cols-3 ที่เหลือคอลัมน์ว่างชิดซ้าย) */
    centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    items: 6,
    gapClass: 'gap-4 md:gap-5 lg:gap-6',
    cellClass: '',
    imageFit: 'contain',
    centered: false,
});

const slotCount = computed(() => Math.max(1, Math.min(24, Math.round(props.items))));

const indices = computed(() => Array.from({ length: slotCount.value }, (_, i) => i + 1));

const rootClass = computed(() => [props.gapClass, props.imageFit === 'cover' ? 'image-fit-cover' : null].filter(Boolean));

const gridShellClass = computed(() => {
    if (props.centered && slotCount.value === 2) {
        return 'grid w-full max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2';
    }
    if (props.centered && slotCount.value > 2) {
        return 'grid w-full max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
    return 'grid w-full max-w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
});

defineSlots<Record<string, () => unknown>>();
</script>

<template>
    <div class="image-grid-root justify-items-stretch" :class="[gridShellClass, rootClass]">
        <div
            v-for="i in indices"
            :key="i"
            :class="[
                'image-grid__cell flex aspect-square w-full min-w-0 overflow-hidden rounded-xl',
                props.cellClass,
            ]"
        >
            <slot :name="`item-${i}`" mdc-unwrap="p" />
        </div>
    </div>
</template>

<style scoped>
/* ไม่ใช้ @apply — Tailwind v4 ใน SFC scoped ต้อง @reference ไม่เช่นนั้น utility จะ error */
.image-grid__cell :deep(img) {
    margin: auto;
}

.image-grid-root.image-fit-cover .image-grid__cell :deep(img) {
    margin: 0;
    height: 100%;
    width: 100%;
    max-height: none;
    max-width: none;
    object-fit: cover;
}

.image-grid-root:not(.image-fit-cover) .image-grid__cell :deep(img) {
    height: auto !important;
    width: auto !important;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
}
</style>
