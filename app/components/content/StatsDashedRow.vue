<script setup lang="ts">
/**
 * แถวสถิติ/จุดเด่น 4 ช่อง คั่นด้วยเส้นประ
 * มือถือ = 2 คอลัมน์ (มีเส้นประทั้งแนวตั้งและแนวนอน), desktop = 4 คอลัมน์ในแถวเดียว
 */
interface Slots {
    'item-1'?: () => unknown;
    'item-2'?: () => unknown;
    'item-3'?: () => unknown;
    'item-4'?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="relative grid grid-cols-2 md:grid-cols-4">
        <div
            v-for="n in 4"
            :key="n"
            class="flex flex-col items-center gap-1 px-4 py-6 text-center"
        >
            <slot :name="`item-${n}`" mdc-unwrap="p" />
        </div>

        <!-- เส้นแบ่งแนวตั้ง: desktop มี 3 เส้นระหว่าง 4 คอลัมน์ -->
        <div class="pointer-events-none absolute inset-y-0 left-1/4 hidden w-0 -translate-x-1/2 border-l-2 border-primary/70 md:block" style="border-style: dashed" />
        <div class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-0 -translate-x-1/2 border-l-2 border-primary/70 md:block" style="border-style: dashed" />
        <div class="pointer-events-none absolute inset-y-0 left-3/4 hidden w-0 -translate-x-1/2 border-l-2 border-primary/70 md:block" style="border-style: dashed" />

        <!-- เส้นแบ่งแนวตั้งกลาง เฉพาะ mobile (เว้นช่องว่างตรงกลางไม่ให้ชนเส้นแนวนอน) -->
        <div class="pointer-events-none absolute top-0 bottom-[calc(50%+0.75rem)] left-1/2 w-0 -translate-x-1/2 border-l-2 border-primary/70 md:hidden" style="border-style: dashed" />
        <div class="pointer-events-none absolute top-[calc(50%+0.75rem)] bottom-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-primary/70 md:hidden" style="border-style: dashed" />

        <!-- เส้นแบ่งแนวนอนกลาง เฉพาะ mobile (เว้นช่องว่างตรงกลางไม่ให้ชนเส้นแนวตั้ง) -->
        <div class="pointer-events-none absolute top-1/2 left-0 h-0 w-[calc(50%-0.75rem)] -translate-y-1/2 border-t-2 border-primary/70 md:hidden" style="border-style: dashed" />
        <div class="pointer-events-none absolute top-1/2 right-0 h-0 w-[calc(50%-0.75rem)] -translate-y-1/2 border-t-2 border-primary/70 md:hidden" style="border-style: dashed" />
    </div>
</template>

<style scoped>
/* ตัวเลข/หัวข้อ (bold) ใหญ่สี primary, บรรทัดอธิบายเล็กสีเทา */
.grid :deep(p) {
    margin: 0;
}
.grid :deep(strong) {
    display: block;
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--color-primary);
}
.grid :deep(p:not(:has(strong))) {
    font-size: 0.9rem;
    color: #57534e;
}
</style>