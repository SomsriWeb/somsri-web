<script setup lang="ts">
interface Slots {
    eyebrow(): unknown;
    title(): unknown;

    'item-1-image'(): unknown;
    'item-2-image'(): unknown;
    'item-3-image'(): unknown;
    'item-4-image'(): unknown;
    'item-5-image'(): unknown;
    'item-6-image'(): unknown;
}
defineSlots<Slots>();

const slots = useSlots();

const scrollerRef = ref<HTMLElement | null>(null);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

function updateScrollState() {
    const el = scrollerRef.value;
    if (!el) return;
    canScrollPrev.value = el.scrollLeft > 4;
    canScrollNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
}

function scrollByItem(direction: 1 | -1) {
    const el = scrollerRef.value;
    if (!el) return;
    const item = el.querySelector<HTMLElement>('[data-showcase-item]');
    const step = (item?.offsetWidth ?? el.clientWidth / 2) + 16;
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
    <div class="showcase-layout">
        <div class="showcase-layout__text">
            <p v-if="$slots.eyebrow" class="showcase-eyebrow">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="showcase-title">
                <slot name="title" mdc-unwrap="p" />
            </h2>
        </div>

        <div class="showcase-layout__carousel">
            <div ref="scrollerRef" class="showcase-scroller" @scroll="updateScrollState">
                <template v-for="n in 6" :key="n">
                    <div v-if="slots[`item-${n}-image`]" data-showcase-item class="showcase-item">
                        <slot :name="`item-${n}-image`" />
                    </div>
                </template>
            </div>

            <button v-if="canScrollPrev" type="button" aria-label="เลื่อนไปก่อนหน้า" class="showcase-nav showcase-nav--prev" @click="scrollByItem(-1)">
                <UIcon name="i-heroicons-chevron-left" class="size-4" />
            </button>
            <button v-if="canScrollNext" type="button" aria-label="เลื่อนไปถัดไป" class="showcase-nav showcase-nav--next" @click="scrollByItem(1)">
                <UIcon name="i-heroicons-chevron-right" class="size-4" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.showcase-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: center;
}

@media (min-width: 768px) {
    .showcase-layout {
        grid-template-columns: minmax(0, 3fr) minmax(0, 7fr);
        gap: 2.5rem;
    }
}

.showcase-eyebrow {
    color: oklch(47.783% 0.16585 13.291);
    font-weight: 700;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.showcase-title {
    font-size: 1.5rem;
    line-height: 1.35;
    font-weight: 700;
    color: #1c1917;
}

@media (min-width: 768px) {
    .showcase-title {
        font-size: 1.875rem;
    }
}

.showcase-layout__carousel {
    position: relative;
}

.showcase-scroller {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.25rem;
    scrollbar-width: none;
}

.showcase-scroller::-webkit-scrollbar {
    display: none;
}

.showcase-item {
    flex: 0 0 70%;
    aspect-ratio: 3 / 4;
    scroll-snap-align: start;
    border-radius: 1rem;
    overflow: hidden;
}

.showcase-item :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

@media (min-width: 640px) {
    .showcase-item {
        flex: 0 0 calc(50% - 8px);
    }
}

@media (min-width: 1024px) {
    .showcase-item {
        flex: 0 0 calc(45% - 10px);
    }
}

.showcase-nav {
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

.showcase-nav--prev {
    left: -0.75rem;
}

.showcase-nav--next {
    right: -0.75rem;
}
</style>