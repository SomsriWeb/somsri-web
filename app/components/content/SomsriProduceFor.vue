<script setup lang="ts">
import ProseH2 from './ProseH2.vue';

const items = [
    { src: '/somsri-collaborators/1.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/2.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/3.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/4.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/5.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/6.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
    { src: '/somsri-collaborators/7.png', alt: 'แบรนด์ที่เคยสั่งผลิตเสื้อกับสมศรีมีเสื้อ' },
];

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
            <UCarousel
                v-slot="{ item }"
                :items="items"
                loop
                autoplay
                :autoplay-delay="1000"
                arrows
                align="center"
                :start-index="2"
                :contain-scroll="false"
                :ui="{
                    root: 'relative rounded-xl bg-white overflow-hidden',
                    // เผื่อพื้นที่ให้สไลด์ไม่ทับปุ่ม (ธีม UCarousel ใส่ sm:-start-12 / sm:-end-12 บนปุ่ม — ต้อง override)
                    viewport: 'min-w-0 px-10 sm:px-12',
                    container: 'flex items-center',
                    // 1 ต่อหน้า (มือถือ) → 2 → 3 → 4 (จอใหญ่)
                    item: 'min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
                    controls: 'absolute inset-0 z-20 pointer-events-none',
                    arrows: 'absolute inset-0 flex items-center justify-between px-2 sm:px-3',
                    // ยกเลิก absolute + negative inset จากธีม (.nuxt/ui/carousel) ไม่ให้ถูก overflow-hidden ตัด
                    prev: '!static !relative !inset-auto !translate-none sm:!start-auto sm:!end-auto pointer-events-auto z-30 rounded-full bg-primary text-white shadow-md',
                    next: '!static !relative !inset-auto !translate-none sm:!start-auto sm:!end-auto pointer-events-auto z-30 rounded-full bg-primary text-white shadow-md',
                }"
                :prev="{
                    color: 'neutral',
                    variant: 'solid',
                    disabled: false,
                    class: '!min-w-fit !p-2 sm:!p-2.5 rounded-full',
                }"
                :next="{
                    color: 'neutral',
                    variant: 'solid',
                    disabled: false,
                    class: '!min-w-fit !p-2 sm:!p-2.5 rounded-full',
                }"
                prev-icon="i-heroicons-chevron-left"
                next-icon="i-heroicons-chevron-right"
                aria-label="แบรนด์ที่เคยสั่งผลิต"
            >
                <ProseImg
                    class="w-full h-16 sm:h-20 md:h-24 lg:h-28 object-contain"
                    :src="item.src"
                    :alt="item.alt"
                    loading="lazy"
                    decoding="async"
                />
            </UCarousel>
        </ClientOnly>
    </div>
</template>
