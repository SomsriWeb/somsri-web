<script setup lang="ts">
import type { PriceCarouselCollectionItem } from '@nuxt/content';

// PROPS
interface Props {
    priceData: PriceCarouselCollectionItem;
}
const { priceData } = defineProps<Props>();

// VARIABLE
const containerRef = ref(null);
const swiperOptions = computed(() => ({
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 1000,
    },
    autoHeight: true,
    breakpoints: {
        320: {
            slidesPerView: 2,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
        },
    },
    loop: true,
    effect: 'creative',
    scrollbar: true,
}));
const swiper = useSwiper(containerRef, swiperOptions.value);
</script>

<template>
    <div class="relative">
        <ClientOnly>
            <swiper-container ref="containerRef">
                <swiper-slide v-for="priceList in priceData.priceLists" :key="priceList.fabricName" class="!w-[9rem] mr-3">
                    <PriceCarouselCard :price-lists="priceList" />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <UButton icon="i-heroicons-chevron-left" class="!text-primary !min-w-fit absolute top-[46%] left-1 z-[2]" color="neutral" variant="outline" @click="swiper.prev()" />

        <UButton icon="i-heroicons-chevron-right" class="!text-primary !min-w-fit absolute top-[46%] right-1 z-[2]" color="neutral" variant="outline" @click="swiper.next()" />
    </div>
</template>
