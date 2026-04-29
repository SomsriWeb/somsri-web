<script setup lang="ts">
import type { PriceCarouselCollectionItem } from '@nuxt/content';

// PROPS
interface Props {
    priceData: PriceCarouselCollectionItem;
}
const { priceData } = defineProps<Props>();

// VARIABLE
const containerRef = ref(null);
const slidesCount = computed(() => priceData?.priceLists?.length ?? 0);

function capSlidesPerView(desired: number, count: number) {
    // ถ้า slidesPerView >= จำนวนสไลด์ Swiper จะเลื่อนไม่ไปไหน (เห็นครบแล้ว)
    if (count <= 1) return 1;
    return Math.max(1, Math.min(desired, count - 1));
}

const swiperOptions = computed(() => ({
    slidesPerView: 1,
    spaceBetween: 12,
    centeredSlides: true,
    centeredSlidesBounds: false,
    centerInsufficientSlides: true,
    autoplay: {
        delay: 1000,
    },
    autoHeight: false,
    breakpoints: {
        320: {
            slidesPerView: capSlidesPerView(2, slidesCount.value),
            spaceBetween: 12,
        },
        640: {
            slidesPerView: capSlidesPerView(2, slidesCount.value),
            spaceBetween: 12,
        },
        768: {
            slidesPerView: capSlidesPerView(3, slidesCount.value),
            spaceBetween: 14,
        },
        1024: {
            slidesPerView: capSlidesPerView(3, slidesCount.value),
            spaceBetween: 16,
        },
        1280: {
            slidesPerView: capSlidesPerView(4, slidesCount.value),
            spaceBetween: 18,
        },
    },
    loop: slidesCount.value > 1,
    effect: 'slide',
    scrollbar: true,
}));
const swiper = useSwiper(containerRef, swiperOptions.value);
</script>

<template>
    <div class="relative min-w-0">
        <ClientOnly>
            <swiper-container ref="containerRef" class="min-w-0">
                <swiper-slide v-for="priceList in priceData.priceLists" :key="priceList.fabricName" class="h-auto">
                    <PriceCarouselCard :price-lists="priceList" />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <UButton icon="i-heroicons-chevron-left" class="text-primary! min-w-fit! absolute top-[46%] left-1 z-2" color="neutral" variant="outline" @click="swiper.prev()" />

        <UButton icon="i-heroicons-chevron-right" class="text-primary! min-w-fit! absolute top-[46%] right-1 z-2" color="neutral" variant="outline" @click="swiper.next()" />
    </div>
</template>
