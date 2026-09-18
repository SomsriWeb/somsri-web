<script setup lang="ts">
/**
 * ตารางรูปตัวอย่างงานพิมพ์ตาม design
 * - desktop: แถวบน 2 รูป (ซ้ายแคบ / ขวากว้าง) + แถวล่าง 1 รูปยาวเต็มความกว้าง
 * - mobile: เรียงลงมาเป็นคอลัมน์เดียว
 */
interface Props {
    /** ระยะห่างระหว่างรูป */
    gapClass?: string;
    /** สัดส่วนคอลัมน์แถวบน (grid-template-columns) */
    topColumns?: string;
    /** อัตราส่วนรูปแถวบน / แถวล่าง (CSS aspect-ratio) */
    topAspect?: string;
    wideAspect?: string;
    /** จำกัดความกว้างสูงสุดของบล็อกทั้งหมด */
    maxWidth?: string;
}

const {
    gapClass = 'gap-4 md:gap-5',
    topColumns = 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
    topAspect = '4 / 3',
    wideAspect = '16 / 5',
    maxWidth = '64rem',
} = defineProps<Props>();

interface Slots {
    /** รูปบนซ้าย */
    'item-1'(): unknown;
    /** รูปบนขวา */
    'item-2'(): unknown;
    /** รูปยาวด้านล่าง */
    'item-3'(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="print-sample-grid mx-auto flex w-full flex-col" :class="gapClass" :style="{ maxWidth }">
        <!-- แถวบน: 2 รูป -->
        <div
            class="grid grid-cols-1 md:grid-cols-2"
            :class="gapClass"
            :style="{ gridTemplateColumns: undefined }"
        >
            <div class="cell overflow-hidden rounded-2xl" :style="{ aspectRatio: topAspect }">
                <slot name="item-1" mdc-unwrap="p" />
            </div>
            <div class="cell overflow-hidden rounded-2xl" :style="{ aspectRatio: topAspect }">
                <slot name="item-2" mdc-unwrap="p" />
            </div>
        </div>

        <!-- แถวล่าง: รูปยาวเต็มความกว้าง -->
        <div class="cell overflow-hidden rounded-2xl" :style="{ aspectRatio: wideAspect }">
            <slot name="item-3" mdc-unwrap="p" />
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 768px) {
    .print-sample-grid > .grid {
        grid-template-columns: v-bind(topColumns);
    }
}

.cell {
    min-width: 0;
}

.cell :deep(img) {
    margin: 0;
    height: 100%;
    width: 100%;
    max-width: none;
    max-height: none;
    object-fit: cover;
    display: block;
}
</style>