<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core';

interface PriceTier {
    qty: string;
    price: number | string;
}

interface SizeCard {
    size: string;
    startQty?: string;
    startPrice: number | string;
    tiers: PriceTier[];
}

interface Props {
    title: string;
    description: string;
    sizes: SizeCard[];
}

const props = defineProps<Props>();

// Duplicate items 4 times (16 slides) to ensure Swiper virtual loop buffer never gets depleted
const displaySizes = computed(() => {
    const list = props.sizes;
    if (list.length === 0) return [];
    return [...list, ...list, ...list, ...list];
});

const containerRef = ref<any>(null);

const swiperOptions = {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 300,
    preventInteractionOnTransition: true,
    breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 12 },
        640: { slidesPerView: 2, spaceBetween: 14 },
        768: { slidesPerView: 3, spaceBetween: 16 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
    },
};

onMounted(async () => {
    await nextTick();
    const el = containerRef.value;
    if (!el) return;
    Object.assign(el, swiperOptions);
    el.initialize();
});

// เรียกผ่าน swiper instance จริงเท่านั้น (ตัด useSwiper() ออก เพราะเป็นคนละ instance กับที่ init ผ่าน containerRef ทำให้ state ชนกันจนคอมโพเน้นหาย)
const handleNext = useThrottleFn(() => {
    const swiperEl = containerRef.value?.swiper;
    if (!swiperEl || swiperEl.animating) return;
    swiperEl.slideNext(300);
}, 200);

const handlePrev = useThrottleFn(() => {
    const swiperEl = containerRef.value?.swiper;
    if (!swiperEl || swiperEl.animating) return;
    swiperEl.slidePrev(300);
}, 200);
</script>

<template>
    <div class="space-y-6 lg:space-y-8">
        <!-- Group Header -->
        <div class="text-center max-w-3xl mx-auto px-2">
            <h3 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-3">
                {{ title }}
            </h3>
            <p class="text-sm sm:text-base lg:text-lg text-stone-700 font-normal leading-relaxed">
                {{ description }}
            </p>
        </div>

        <!-- Slider Container with Relative Positioning -->
        <div class="relative w-full">
            <ClientOnly>
                <swiper-container
                    ref="containerRef"
                    :init="false"
                    class="w-full select-none"
                >
                    <swiper-slide
                        v-for="(card, idx) in displaySizes"
                        :key="`card-${card.size}-${idx}`"
                        class="h-auto pb-1"
                    >
                        <!-- Price Card -->
                        <div class="rounded-2xl border border-stone-200/90 bg-white shadow-md hover:shadow-lg transition duration-200 overflow-hidden flex flex-col h-full">
                            <!-- Top Red Header (Size) -->
                            <div class="bg-primary text-white font-bold text-xl sm:text-2xl text-center py-3 sm:py-3.5 tracking-wide">
                                {{ card.size }}
                            </div>

                            <!-- Starting Price Box -->
                            <div class="bg-[#f8f9fa] px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-stone-100">
                                <div class="text-sm sm:text-base text-stone-500 font-medium leading-tight text-left">
                                    <div>เริ่มต้นที่</div>
                                    <div class="text-xs sm:text-sm text-stone-400 font-normal">({{ card.startQty || '100+ ตัว' }})</div>
                                </div>
                                <div class="flex items-baseline gap-1.5">
                                    <span class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
                                        {{ card.startPrice }}
                                    </span>
                                    <span class="text-xs sm:text-sm font-bold text-stone-700">THB</span>
                                </div>
                            </div>

                            <!-- Tier Rows Box -->
                            <div class="bg-white p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                <div class="text-xs sm:text-sm text-stone-500 font-medium mb-1 text-left">
                                    จำนวน(ตัว)
                                </div>
                                <div class="divide-y divide-stone-100">
                                    <div
                                        v-for="tier in card.tiers"
                                        :key="tier.qty"
                                        class="flex items-center justify-between py-2.5 sm:py-3"
                                    >
                                        <span class="font-bold text-stone-900 text-base sm:text-lg">
                                            {{ tier.qty }}
                                        </span>
                                        <div class="flex items-baseline gap-1.5">
                                            <span class="font-bold text-primary text-xl sm:text-2xl">
                                                {{ tier.price }}
                                            </span>
                                            <span class="text-xs sm:text-sm text-stone-600 font-medium">THB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>

            <!-- ปุ่ม Prev + Next วางเรียงกันฝั่งขวาบน -->
            <div class="absolute -top-14 sm:-top-16 right-0 z-20 flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Previous slide"
                    class="w-10 sm:w-11 lg:w-12 h-12 sm:h-14 lg:h-15 bg-white border border-stone-200 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center text-primary hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    @click="handlePrev"
                >
                    <UIcon name="i-lucide-chevron-left" class="w-6 sm:w-7 h-6 sm:h-7 text-primary shrink-0" />
                </button>
                <button
                    type="button"
                    aria-label="Next slide"
                    class="w-10 sm:w-11 lg:w-12 h-12 sm:h-14 lg:h-15 bg-white border border-stone-200 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center text-primary hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    @click="handleNext"
                >
                    <UIcon name="i-lucide-chevron-right" class="w-6 sm:w-7 h-6 sm:h-7 text-primary shrink-0" />
                </button>
            </div>
        </div>
    </div>
</template>