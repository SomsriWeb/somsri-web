<script setup lang="ts">
import ProseH2 from './ProseH2.vue';

// SLOTS
interface Slots {
    /**
     * หัวข้อ (ใส่เป็น H1 - P)
     * @default ## สมศรีผลิตให้กับใครบ้าง
     */
    title(): unknown;

    /**
     * รายละเอียด (ใส่เป็น H1 - P)
     * @default หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง
     */
    description(): unknown;
}
defineSlots<Slots>();
</script>
<template>
    <div class="grid grid-cols-1 gap-5">
        <TitleWithDescription>
            <template #title>
                <slot name="title"><ProseH2>สมศรีผลิตให้กับใครบ้าง </ProseH2></slot>
            </template>
            <!-- <template #description>
                <slot name="description"><ProseP>หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ</ProseP> </slot>
            </template> -->
        </TitleWithDescription>

        <ClientOnly>
            <Vue3Marquee :duration="50" class="rounded-xl min-h-full">
                <ProseImg class="h-full object-cover" src="/somsri-collaborators/brand-1.png" alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ" />
                <ProseImg class="h-full object-cover" src="/somsri-collaborators/brand-2.png" alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ" />
                <ProseImg class="h-full object-cover" src="/somsri-collaborators/brand-3.png" alt="แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ" />
            </Vue3Marquee>
        </ClientOnly>
    </div>
</template>