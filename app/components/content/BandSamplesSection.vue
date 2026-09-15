<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core';

interface Props {
    eyebrow?: string;
    title?: string;
    description?: string;
    images?: string[];
    slidesPerViewDesktop?: number;
    slidesPerViewTablet?: number;
    slidesPerViewMobile?: number;
}

const defaultImages = [
    '/band-shirt/sample-maiyarap.png',
    '/band-shirt/sample-varism-front.png',
    '/band-shirt/sample-varism-back.png',
    '/band-shirt/sample-leofest.png',
];

const props = withDefaults(defineProps<Props>(), {
    eyebrow: '',
    title: '',
    description: '',
    images: () => [
        '/band-shirt/sample-maiyarap.png',
        '/band-shirt/sample-varism-front.png',
        '/band-shirt/sample-varism-back.png',
        '/band-shirt/sample-leofest.png',
    ],
    slidesPerViewDesktop: 4,
    slidesPerViewTablet: 3,
    slidesPerViewMobile: 2,
});

interface Slots {
    eyebrow?(): unknown;
    title?(): unknown;
    description?(): unknown;
}
defineSlots<Slots>();

const rawImages = computed(() => (props.images && props.images.length > 0 ? props.images : defaultImages));

// ทำซ้ำภาพให้มีจำนวนสไลด์เพียงพอ (อย่างน้อย 12 สไลด์) เพื่อให้ Swiper Loop ทำงานได้อย่างสมบูรณ์แบบไม่ติดขัด
const displayImages = computed(() => {
    const list = rawImages.value;
    if (list.length === 0) return [];
    if (list.length < 8) {
        return [...list, ...list, ...list];
    }
    return list;
});

const containerRef = ref<any>(null);
const activeIndex = ref(0);

const swiperOptions = computed(() => ({
    loop: true,
    slidesPerView: props.slidesPerViewDesktop,
    spaceBetween: 20,
    speed: 400,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: props.slidesPerViewMobile,
            spaceBetween: 12,
        },
        640: {
            slidesPerView: props.slidesPerViewMobile,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: props.slidesPerViewTablet,
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: props.slidesPerViewDesktop,
            spaceBetween: 20,
        },
    },
}));

const swiper = useSwiper(containerRef, swiperOptions.value);

const handleNext = useThrottleFn(() => {
    try {
        if (typeof swiper.next === 'function') {
            swiper.next();
        } else if (containerRef.value?.swiper) {
            containerRef.value.swiper.slideNext();
        }
    } catch (e) {
        console.error(e);
    }
}, 120);

const handlePrev = useThrottleFn(() => {
    try {
        if (typeof swiper.prev === 'function') {
            swiper.prev();
        } else if (containerRef.value?.swiper) {
            containerRef.value.swiper.slidePrev();
        }
    } catch (e) {
        console.error(e);
    }
}, 120);

function onSlideChange(e: any) {
    try {
        const swiperEl = e.target?.swiper || containerRef.value?.swiper;
        const total = rawImages.value.length;
        if (swiperEl && total > 0) {
            const rawIndex = typeof swiperEl.realIndex === 'number' ? swiperEl.realIndex : (swiperEl.activeIndex ?? 0);
            activeIndex.value = ((rawIndex % total) + total) % total;
        }
    } catch (e) {
        console.error(e);
    }
}

function goToSlide(index: number) {
    try {
        const swiperEl = containerRef.value?.swiper;
        if (swiperEl) {
            if (typeof swiperEl.slideToLoop === 'function') {
                swiperEl.slideToLoop(index);
            } else if (typeof swiperEl.slideTo === 'function') {
                swiperEl.slideTo(index);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <section class="w-full py-10 lg:py-16 overflow-hidden">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <p v-if="$slots.eyebrow || eyebrow" class="text-sm sm:text-base font-bold text-primary mb-2">
                    <slot name="eyebrow" mdc-unwrap="p">{{ eyebrow }}</slot>
                </p>
                <h2 v-if="$slots.title || title" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight mb-3">
                    <slot name="title" mdc-unwrap="p">{{ title }}</slot>
                </h2>
                <div v-if="$slots.description || description" class="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    <slot name="description" mdc-unwrap="p">{{ description }}</slot>
                </div>
            </div>

            <!-- Slider Container with Floating Navigation Arrows -->
            <div class="relative group">
                <ClientOnly>
                    <swiper-container
                        ref="containerRef"
                        class="w-full"
                        @swiperslidechange="onSlideChange"
                        @swiperrealindexchange="onSlideChange"
                    >
                        <swiper-slide
                            v-for="(imgSrc, idx) in displayImages"
                            :key="`slide-${idx}`"
                            class="h-auto"
                        >
                            <div class="group/item relative aspect-[283/400] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-stone-100 flex items-center justify-center">
                                <NuxtImg
                                    :src="imgSrc"
                                    alt="ตัวอย่างงานผลิตเสื้อวง"
                                    class="w-full h-full object-cover group-hover/item:scale-105 transition duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </ClientOnly>

                <!-- Floating Prev Navigation Button -->
                <button
                    type="button"
                    aria-label="Previous slide"
                    class="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-10 sm:h-14 bg-white/95 rounded-r-xl sm:rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-primary hover:bg-white hover:scale-105 transition duration-200"
                    @click="handlePrev"
                >
                    <UIcon name="i-lucide-chevron-left" class="w-6 h-6 text-primary" />
                </button>

                <!-- Floating Next Navigation Button -->
                <button
                    type="button"
                    aria-label="Next slide"
                    class="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-12 sm:w-10 sm:h-14 bg-white/95 rounded-l-xl sm:rounded-xl shadow-md hover:shadow-lg flex items-center justify-center text-primary hover:bg-white hover:scale-105 transition duration-200"
                    @click="handleNext"
                >
                    <UIcon name="i-lucide-chevron-right" class="w-6 h-6 text-primary" />
                </button>
            </div>

            <!-- Pagination Dots -->
            <div v-if="rawImages.length > 1" class="flex items-center justify-center gap-2 mt-6 sm:mt-8">
                <button
                    v-for="(_, index) in rawImages"
                    :key="index"
                    type="button"
                    :aria-label="`Go to slide ${index + 1}`"
                    class="h-2 sm:h-2.5 rounded-full transition-all duration-300"
                    :class="activeIndex === index ? 'w-2 sm:w-2.5 bg-primary' : 'w-2 sm:w-2.5 bg-stone-200 hover:bg-stone-300'"
                    @click="goToSlide(index)"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>
