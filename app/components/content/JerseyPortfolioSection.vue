<script setup lang="ts">
/**
 * Section "ตัวอย่างงานผลิตเสื้อ Jersey" — หัวข้อ eyebrow/title/description ตรงกลาง
 * + carousel รูปผลงานจริง (การ์ดรูปเดี่ยว border-radius, เลื่อนด้วยลูกศร/จุด)
 * ใช้ ContentCarousel เดิมของระบบเป็นตัวเลื่อน — รองรับสูงสุด 8 รูป (#item-1 ... #item-8)
 */
interface Props {
    slidesPerView?: number;
    slidesPerViewMobile?: number;
    spaceBetween?: number;
    autoplay?: boolean;
}

const {
    slidesPerView = 4,
    slidesPerViewMobile = 1.3,
    spaceBetween = 20,
    autoplay = true,
} = defineProps<Props>();

interface Slots {
    eyebrow(): unknown;
    title(): unknown;
    description?: () => unknown;
    'item-1'?: () => unknown;
    'item-2'?: () => unknown;
    'item-3'?: () => unknown;
    'item-4'?: () => unknown;
    'item-5'?: () => unknown;
    'item-6'?: () => unknown;
    'item-7'?: () => unknown;
    'item-8'?: () => unknown;
}
defineSlots<Slots>();
const slots = useSlots();

const itemCount = computed(() => {
    for (let n = 8; n >= 1; n--) {
        if (slots[`item-${n}`]) return n;
    }
    return 0;
});
</script>

<template>
    <section class="jersey-portfolio mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <div class="mx-auto max-w-2xl text-center">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
            <div v-if="$slots.description" class="mt-3 text-sm text-stone-600 md:text-base">
                <slot name="description" mdc-unwrap="p" />
            </div>
        </div>

        <Carousel
            v-if="itemCount > 0"
            class="mt-8 md:mt-10"
            :items="itemCount"
            :slides-per-view="slidesPerView"
            :slides-per-view-mobile="slidesPerViewMobile"
            :space-between="spaceBetween"
            :autoplay="autoplay"
            :dot="true"
            :centered="false"
            slide-aspect-ratio="3/4"
            slide-object-fit="cover"
        >
            <template v-if="$slots['item-1']" #item-1>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-1" />
                </div>
            </template>
            <template v-if="$slots['item-2']" #item-2>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-2" />
                </div>
            </template>
            <template v-if="$slots['item-3']" #item-3>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-3" />
                </div>
            </template>
            <template v-if="$slots['item-4']" #item-4>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-4" />
                </div>
            </template>
            <template v-if="$slots['item-5']" #item-5>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-5" />
                </div>
            </template>
            <template v-if="$slots['item-6']" #item-6>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-6" />
                </div>
            </template>
            <template v-if="$slots['item-7']" #item-7>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-7" />
                </div>
            </template>
            <template v-if="$slots['item-8']" #item-8>
                <div class="jersey-portfolio__card overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <slot name="item-8" />
                </div>
            </template>
        </Carousel>
    </section>
</template>

<style scoped>
.jersey-portfolio__card :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
</style>