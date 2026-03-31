<script setup lang="ts">
import type { Swiper } from 'swiper/types';
import { useDebounceFn, useResizeObserver, useWindowSize } from '@vueuse/core';
// PROPS
interface Props {
    /**
     * โหมด legacy: จำนวน slide (ต้องตรงกับ slot `item-1` ... `item-N`)
     * โหมด dynamic: ไม่จำเป็นต้องใส่ถ้ามี `itemsData`
     */
    items?: number;

    /**
     * โหมด dynamic: ส่ง array ข้อมูล แล้วใช้ default slot `{ item, index }` เรนเดอร์แต่ละ slide
     * ถ้ามีความยาว > 0 จะใช้โหมดนี้แทน legacy
     */
    itemsData?: unknown[];

    /**
     * จำนวน slide ต่อ viewport ฝั่งใหญ่
     * - preset `simple`: ใช้ค่านี้เมื่อความกว้างหน้าต่าง ≥ 640px (แคบกว่า 640px ใช้ 1)
     * - preset `portfolio-grid`: ใช้ค่านี้เมื่อ ≥ 1280px (ช่วง 640 / 768 ใช้ 2 / 3 ตาม breakpoint)
     */
    slidesPerView?: number;

    /**
     * ระยะห่างระหว่าง slide (px)
     */
    spaceBetween?: number;

    /**
     * delay ของ autoplay (ms) หรือ `null` เพื่อปิด autoplay
     */
    autoplayDelay?: number | null;

    /**
     * เปิด/ปิด loop
     */
    loop?: boolean;

    /**
     * แสดงปุ่ม prev/next
     */
    showNavigation?: boolean;

    /**
     * effect ของ swiper
     */
    effect?: 'slide' | 'creative' | 'fade' | 'coverflow' | 'flip' | 'cube' | 'cards';

    /**
     * class เพิ่มให้ swiper-container
     */
    containerClass?: string;

    /**
     * `simple`: มือถือ 1 คอลัมน์, ≥640px ใช้ slidesPerView
     * `portfolio-grid`: สอดคล้อง grid หน้าแรก — 1 / sm:2 / md:3 / xl:slidesPerView
     */
    breakpointsPreset?: 'simple' | 'portfolio-grid';

    /**
     * ฐานความกว้างสำหรับ breakpoints ของ Swiper
     * - `container`: ตามความกว้างแคโรเซล (แนะนำเมื่ออยู่ในเลย์เอาต์แคบกว่า viewport)
     * - `window`: ตามความกว้างหน้าต่าง
     */
    breakpointsBase?: 'window' | 'container';
}

const props = withDefaults(defineProps<Props>(), {
    items: 0,
    itemsData: () => [],
    slidesPerView: 1,
    spaceBetween: 16,
    autoplayDelay: 3000,
    loop: true,
    showNavigation: true,
    effect: 'slide',
    containerClass: '',
    breakpointsPreset: 'simple',
    breakpointsBase: 'container',
});

// SLOTS
type CarouselSlots = {
    default?(p: { item: unknown; index: number }): unknown;
} & Record<string, () => unknown>;

defineSlots<CarouselSlots>();

type SwiperContainerEl = HTMLElement & {
    initialize?: () => void;
    swiper?: Swiper;
};

const containerRef = ref<SwiperContainerEl | null>(null);
/** เก็บ Swiper instance เอง — init หลัง `containerRef` พร้อม (อยู่ใน ClientOnly ไม่ใช้ useSwiper) */
const swiperInstance = ref<Swiper | null>(null);

function dynamicSlideKey(item: unknown, index: number): string {
    if (item !== null && typeof item === 'object' && 'id' in item) {
        const id = (item as { id?: unknown }).id;
        if (typeof id === 'string' && id.length > 0) return id;
        if (typeof id === 'number' && Number.isFinite(id)) return String(id);
    }
    return `data-${index}`;
}

const isDynamicMode = computed(() => props.itemsData.length > 0);

type SlideUnion =
    | { key: string; dynamic: true; item: unknown; index: number }
    | { key: string; dynamic: false; slotIndex: number };

const slides = computed((): SlideUnion[] => {
    if (isDynamicMode.value) {
        return props.itemsData.map((item, index) => ({
            key: dynamicSlideKey(item, index),
            dynamic: true as const,
            item,
            index,
        }));
    }
    const count = props.items ?? 0;
    return Array.from({ length: count }, (_, i) => ({
        key: `legacy-${i + 1}`,
        dynamic: false as const,
        slotIndex: i + 1,
    }));
});

const swiperOptions = computed(() => {
    const spaceBetween = props.spaceBetween;
    const isPortfolioGrid = props.breakpointsPreset === 'portfolio-grid';

    const breakpoints = isPortfolioGrid
        ? {
              640: { slidesPerView: 2, spaceBetween },
              768: { slidesPerView: 3, spaceBetween },
              1280: { slidesPerView: props.slidesPerView, spaceBetween },
          }
        : {
              320: { slidesPerView: 1, spaceBetween },
              640: { slidesPerView: props.slidesPerView, spaceBetween },
          };

    return {
        breakpointsBase: props.breakpointsBase,
        slidesPerView: isPortfolioGrid ? 1 : props.slidesPerView,
        spaceBetween,
        // ทำให้ “slide ที่ active” ถูกจัดให้อยู่กลาง viewport เสมอเวลามีการเลื่อน
        centeredSlides: true,
        // ต้องการให้รูปแรก/รูปสุดท้ายก็อยู่กลางได้ (ซ้าย/ขวาเว้นว่างได้)
        centeredSlidesBounds: false,
        centerInsufficientSlides: true,
        autoplay:
            props.autoplayDelay === null
                ? false
                : {
                      delay: props.autoplayDelay,
                      disableOnInteraction: false,
                  },
        loop: props.loop,
        effect: props.effect,
        breakpoints,
    };
});

function getContainer(): SwiperContainerEl | null {
    return containerRef.value;
}

function mountSwiperElement() {
    const el = getContainer();
    if (!el || el.nodeName !== 'SWIPER-CONTAINER') return;

    const opts = swiperOptions.value as Record<string, unknown>;
    Object.assign(el, opts);

    if (el.swiper) {
        swiperInstance.value = el.swiper;
        refreshSwiperLayout();
        return;
    }

    el.initialize?.();
    swiperInstance.value = el.swiper ?? null;
    nextTick(refreshSwiperLayout);
}

/**
 * หลังย่อ/ขยาย viewport — เคลียร์ currentBreakpoint แล้ว update (บางที setBreakpoint return เร็วเกินไป)
 */
function refreshSwiperLayout() {
    const inst = swiperInstance.value;
    if (!inst?.update) return;
    inst.currentBreakpoint = undefined;
    inst.updateSize?.();
    inst.update();
    const withLoop = inst as Swiper & { loopFix?: () => void };
    if (inst.params.loop) {
        withLoop.loopFix?.();
    }
}

function handlePrev() {
    swiperInstance.value?.slidePrev();
}

function handleNext() {
    swiperInstance.value?.slideNext();
}

const debouncedRefresh = useDebounceFn(() => nextTick(refreshSwiperLayout), 100);

watch(
    containerRef,
    (el) => {
        if (el) nextTick(mountSwiperElement);
        else swiperInstance.value = null;
    },
    { flush: 'post' },
);

onBeforeUnmount(() => {
    const inst = swiperInstance.value;
    if (inst && !inst.destroyed) {
        inst.destroy(true, true);
    }
    swiperInstance.value = null;
});

watch(swiperOptions, () => {
    const el = getContainer();
    if (!el) return;
    Object.assign(el, swiperOptions.value as Record<string, unknown>);
    if (el.swiper) {
        swiperInstance.value = el.swiper;
        nextTick(refreshSwiperLayout);
    }
});

/** itemsData โหลดทีหลัง (เช่น useAsyncData) — ต้อง init/update ใหม่เมื่อจำนวน slide เปลี่ยน */
watch(
    () => slides.value.length,
    () => {
        nextTick(() => {
            const el = getContainer();
            if (!el) return;
            if (el.swiper) {
                swiperInstance.value = el.swiper;
                refreshSwiperLayout();
            } else {
                mountSwiperElement();
            }
        });
    },
);

useResizeObserver(containerRef, () => {
    debouncedRefresh();
});

const { width: windowWidth } = useWindowSize();
watch(windowWidth, () => {
    debouncedRefresh();
});
</script>

<template>
    <div>
        <ClientOnly>
            <!-- overflow-hidden: กันพื้นที่สัมผัสของ swiper ล้นไปทับแถวปุ่ม -->
            <div class="min-w-0 overflow-hidden">
                <swiper-container ref="containerRef" :class="props.containerClass">
                    <swiper-slide v-for="slide in slides" :key="slide.key" class="h-auto! min-w-0">
                        <template v-if="slide.dynamic">
                            <slot :item="slide.item" :index="slide.index" />
                        </template>
                        <template v-else>
                            <slot :name="`item-${slide.slotIndex}`" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
                        </template>
                    </swiper-slide>
                </swiper-container>
            </div>

            <!-- z-index ต่ำ: ไม่ให้ทับ Navbar -->
            <div
                v-if="props.showNavigation"
                class="relative z-0 flex justify-end gap-3 mt-5"
            >
                <UButton
                    icon="i-heroicons-chevron-left"
                    class="text-primary! min-w-fit! rounded-full"
                    color="neutral"
                    variant="outline"
                    aria-label="สไลด์ก่อนหน้า"
                    @click="handlePrev"
                />
                <UButton
                    icon="i-heroicons-chevron-right"
                    class="text-primary! min-w-fit! rounded-full"
                    color="neutral"
                    variant="outline"
                    aria-label="สไลด์ถัดไป"
                    @click="handleNext"
                />
            </div>
        </ClientOnly>
    </div>
</template>
