<script setup lang="ts">
import type { PriceCarouselCollectionItem } from '@nuxt/content';

interface Slots {
    /** หัวข้อของกลุ่มราคา เช่น "ราคา [เสื้อยืด]{.text-primary} รวมสกรีน" */
    title(): unknown;
}
defineSlots<Slots>();

interface Props {
    /** uid ของสินค้าใน content/data/price/carousel/*.json เช่น "tshirt", "polo" */
    id: string;
}
const props = defineProps<Props>();

const { data: priceData } = await useAsyncData(`price-rate-carousel-${props.id}`, () =>
    queryCollection('priceCarousel').order('order', 'ASC').all(),
);

const activePriceData = computed<PriceCarouselCollectionItem | undefined>(() =>
    priceData.value?.find((item) => item.uid === props.id),
);

const scrollerRef = ref<HTMLElement | null>(null);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

function updateScrollState() {
    const el = scrollerRef.value;
    if (!el) return;
    canScrollPrev.value = el.scrollLeft > 4;
    canScrollNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
}

function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.value;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-rate-card]');
    const step = (card?.offsetWidth ?? el.clientWidth / 3) + 16;
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
}

onMounted(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScrollState);
});
</script>

<template>
    <div v-if="activePriceData" class="py-6 md:py-8">
        <h3 class="mb-5 text-xl font-bold text-stone-900 md:mb-7 md:text-2xl">
            <slot name="title" mdc-unwrap="p" />
        </h3>

        <div class="rate-layout">
            <div class="rate-layout__image">
                <ProseImg :src="activePriceData.imageUrl" :alt="activePriceData.name" />
            </div>

            <div class="rate-layout__cards">
                <div class="rate-carousel">
                    <button
                        v-if="canScrollPrev"
                        type="button"
                        aria-label="เลื่อนไปก่อนหน้า"
                        class="rate-carousel__nav rate-carousel__nav--prev"
                        @click="scrollByCard(-1)"
                    >
                        <UIcon name="i-heroicons-chevron-left" class="size-4" />
                    </button>

                    <div ref="scrollerRef" class="rate-carousel__scroller" @scroll="updateScrollState">
                        <div v-for="priceList in activePriceData.priceLists" :key="priceList.fabricName" data-rate-card class="rate-carousel__item">
                            <PriceRateLightCard :price-lists="priceList" />
                        </div>
                    </div>

                    <button
                        v-if="canScrollNext"
                        type="button"
                        aria-label="เลื่อนไปถัดไป"
                        class="rate-carousel__nav rate-carousel__nav--next"
                        @click="scrollByCard(1)"
                    >
                        <UIcon name="i-heroicons-chevron-right" class="size-4" />
                    </button>
                </div>

                <ul v-if="activePriceData.conditions?.length" class="mt-4 space-y-0.5">
                    <li v-for="condition in activePriceData.conditions" :key="condition.text" class="text-xs text-primary md:text-sm">
                        * {{ condition.text }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rate-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

.rate-layout__image {
    aspect-ratio: 3 / 4;
    border-radius: 1rem;
    overflow: hidden;
}

.rate-layout__image :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (min-width: 640px) {
    .rate-layout {
        grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
    }
}

@media (min-width: 768px) {
    .rate-layout {
        grid-template-columns: minmax(0, 2fr) minmax(0, 6fr);
    }
}

.rate-carousel {
    position: relative;
}

.rate-carousel__scroller {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.25rem;
    scrollbar-width: none;
}

.rate-carousel__scroller::-webkit-scrollbar {
    display: none;
}

.rate-carousel__item {
    flex: 0 0 calc(50% - 8px);
    scroll-snap-align: start;
}

@media (min-width: 768px) {
    .rate-carousel__scroller {
        gap: 1.5rem;
    }

    .rate-carousel__item {
        flex: 0 0 calc((100% - 48px) / 3);
    }
}

.rate-carousel__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    background: #fff;
    color: oklch(47.783% 0.16585 13.291);
    border: 1px solid rgb(231 229 228);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
    cursor: pointer;
}

.rate-carousel__nav--prev {
    left: -0.75rem;
}

.rate-carousel__nav--next {
    right: -0.75rem;
}
</style>