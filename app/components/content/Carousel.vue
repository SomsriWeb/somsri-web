<script setup lang="ts">
import type { Swiper } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import { useDebounceFn, useResizeObserver, useWindowSize } from '@vueuse/core';
import { useScrollTriggerRef } from '~/composables/useScrollTriggerRef';

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
     * จำนวน slide ต่อ viewport ฝั่งเล็ก (เริ่มที่ 320px)
     * ใช้สำหรับกรณีอยากให้มือถือแสดงหลายการ์ดพร้อมกัน
     */
    slidesPerViewMobile?: number;

    /**
     * ระยะห่างระหว่าง slide (px)
     */
    spaceBetween?: number;

    /**
     * เปิด/ปิด loop
     */
    loop?: boolean;

    /**
     * เลื่อนสไลด์อัตโนมัติ (ส่งต่อเป็น Swiper `autoplay`)
     */
    autoplay?: boolean;

    /**
     * ช่วงเวลาระหว่างสไลด์ (ms) เมื่อ `autoplay` เป็น true
     */
    autoplayDelay?: number;

    /**
     * แสดงปุ่ม prev/next
     */
    showNavigation?: boolean;

    /**
     * แสดง pagination dots ใต้แคโรเซล (Swiper `pagination` แบบ bullets, clickable)
     */
    dot?: boolean;

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
     * `simple-lg`: 1 คอลัมน์จนกว่า ≥1024px (lg) แล้วค่อยใช้ slidesPerView
     * `portfolio-grid`: สอดคล้อง grid หน้าแรก — 1 / sm:2 / md:3 / xl:slidesPerView
     */
    breakpointsPreset?: 'simple' | 'simple-lg' | 'portfolio-grid';

    /**
     * ฐานความกว้างสำหรับ breakpoints ของ Swiper
     * - `container`: ตามความกว้างแคโรเซล (แนะนำเมื่ออยู่ในเลย์เอาต์แคบกว่า viewport)
     * - `window`: ตามความกว้างหน้าต่าง
     */
    breakpointsBase?: 'window' | 'container';

    /**
     * เปิด overflow ให้สไลด์ขยาย (เช่น `scale` เมื่อ hover) ล้นออกมาทับการ์ดข้างได้
     * ค่าเริ่มต้นตัดด้วย overflow-hidden ทั้ง wrapper และ `.swiper` ใน shadow DOM
     * เมื่อเปิด: ปิด Swiper `observer` / `resizeObserver` ค่าเริ่มต้นของ element — ไม่ให้ความสูงที่เปลี่ยนตอน hover ไปเรียก `update()` แล้วเลื่อน/สลับการ์ด
     */
    slideOverflowVisible?: boolean;

    /**
     * padding ซ้าย-ขวาในแต่ละสไลด์ (px) — ดันเนื้อหาเข้ากลางช่อง ลดโอกาสการ์ดขยายไปทับการ์ดข้าง
     * ไม่ระบุและเปิด `slideOverflowVisible` → ใช้ 16px; ส่ง `0` เพื่อปิด
     */
    slideGutterX?: number;

    /**
     * บวกเพิ่มจาก `spaceBetween` (px) ให้สไลด์ห่างกันมากขึ้น
     * ไม่ระบุและเปิด `slideOverflowVisible` → ใช้ 12px; ส่ง `0` เพื่อปิด
     */
    slideSpaceExtra?: number;

    /** fade + เลื่อนขึ้นเมื่อสกรอล์ถึงแคโรเซล */
    revealOnScroll?: boolean;
    /** ScrollTrigger `start` สำหรับ reveal */
    revealStart?: string;
    revealDuration?: number;
    revealY?: number;
}

const props = withDefaults(defineProps<Props>(), {
    items: 0,
    itemsData: () => [],
    slidesPerView: 1,
    slidesPerViewMobile: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: true,
    autoplayDelay: 3000,
    showNavigation: true,
    dot: false,
    effect: 'slide',
    containerClass: '',
    breakpointsPreset: 'simple',
    breakpointsBase: 'container',
    slideOverflowVisible: false,
    revealOnScroll: true,
    revealStart: 'top 78%',
    revealDuration: 0.85,
    revealY: 36,
});

const slideInnerGutterX = computed(() =>
    props.slideGutterX !== undefined ? props.slideGutterX : props.slideOverflowVisible ? 16 : 0,
);

const slideSpaceExtraPx = computed(() =>
    props.slideSpaceExtra !== undefined ? props.slideSpaceExtra : props.slideOverflowVisible ? 12 : 0,
);

// SLOTS
type CarouselSlots = {
    default?(p: { item: unknown; index: number; active: boolean }): unknown;
} & Record<string, () => unknown>;

defineSlots<CarouselSlots>();

type SwiperContainerEl = HTMLElement & {
    initialize?: () => void;
    swiper?: Swiper;
};

const containerRef = ref<SwiperContainerEl | null>(null);
/** เก็บ Swiper instance เอง — init หลัง `containerRef` พร้อม (อยู่ใน ClientOnly ไม่ใช้ useSwiper) */
const swiperInstance = ref<Swiper | null>(null);
/** index ของสไลด์ที่อยู่กลาง/active (อิง realIndex) */
const activeRealIndex = ref(0);

function syncActiveIndex(inst?: Swiper | null) {
    if (!inst) return;
    // realIndex สอดคล้องกับ itemsData index แม้เปิด loop
    activeRealIndex.value = typeof inst.realIndex === 'number' ? inst.realIndex : inst.activeIndex ?? 0;
}

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
    const spaceBetween = props.spaceBetween + slideSpaceExtraPx.value;
    const isPortfolioGrid = props.breakpointsPreset === 'portfolio-grid';
    const isSimpleLg = props.breakpointsPreset === 'simple-lg';

    const breakpoints = isPortfolioGrid
        ? {
              640: { slidesPerView: 2, spaceBetween },
              768: { slidesPerView: 3, spaceBetween },
              1280: { slidesPerView: props.slidesPerView, spaceBetween },
          }
        : isSimpleLg
          ? {
                320: { slidesPerView: props.slidesPerViewMobile, spaceBetween },
                1024: { slidesPerView: props.slidesPerView, spaceBetween },
            }
          : {
                320: { slidesPerView: props.slidesPerViewMobile, spaceBetween },
                640: { slidesPerView: props.slidesPerView, spaceBetween },
            };

    return {
        // Explicitly include modules used by options (autoplay).
        // When this component initializes Swiper manually, we must provide modules ourselves.
        modules: [Autoplay],
        breakpointsBase: props.breakpointsBase,
        slidesPerView: isPortfolioGrid ? 1 : props.slidesPerView,
        spaceBetween,
        // ทำให้ “slide ที่ active” ถูกจัดให้อยู่กลาง viewport เสมอเวลามีการเลื่อน
        centeredSlides: true,
        // ต้องการให้รูปแรก/รูปสุดท้ายก็อยู่กลางได้ (ซ้าย/ขวาเว้นว่างได้)
        centeredSlidesBounds: false,
        centerInsufficientSlides: true,
        autoplay: props.autoplay
            ? { delay: props.autoplayDelay, disableOnInteraction: false }
            : false,
        loop: props.loop,
        effect: props.effect,
        breakpoints,
        /* swiper element ใส่ observer/resizeObserver เป็นค่าเริ่มต้น — hover ทำให้สูงสไลด์เปลี่ยนแล้ว Swiper update → slideTo ดูเหมือนการ์ดสลับ */
        ...(props.slideOverflowVisible
            ? {
                  observer: false,
                  observeParents: false,
                  observeSlideChildren: false,
                  resizeObserver: false,
              }
            : {}),
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
        syncActiveIndex(el.swiper);
        refreshSwiperLayout();
        return;
    }

    el.initialize?.();
    swiperInstance.value = el.swiper ?? null;
    syncActiveIndex(swiperInstance.value);
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

function goToSlide(realIndex: number) {
    const inst = swiperInstance.value;
    if (!inst) return;
    if (inst.params.loop && typeof inst.slideToLoop === 'function') {
        inst.slideToLoop(realIndex);
    } else {
        inst.slideTo(realIndex);
    }
}

const debouncedRefresh = useDebounceFn(() => nextTick(refreshSwiperLayout), 100);

/** รีเฟรช Swiper เฉพาะเมื่อความกว้างแคโรเซลเปลี่ยน — ไม่ตอบสนองแค่ความสูงจาก hover/ข้อความ */
const lastCarouselObservedWidth = ref<number | null>(null);

useResizeObserver(containerRef, (entries) => {
    const entry = entries[0];
    if (!entry) return;
    const w = entry.contentRect.width;
    if (lastCarouselObservedWidth.value !== null && Math.abs(w - lastCarouselObservedWidth.value) < 1) {
        return;
    }
    lastCarouselObservedWidth.value = w;
    debouncedRefresh();
});

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
        syncActiveIndex(el.swiper);
        nextTick(refreshSwiperLayout);
    }
});

watch(swiperInstance, (inst, prev) => {
    if (!inst || inst === prev) return;
    syncActiveIndex(inst);
    // อัปเดต index เมื่อเลื่อน/transition จบ เพื่อให้ “กลาง” แม่นยำ
    const handler = () => syncActiveIndex(inst);
    inst.on?.('init', handler);
    inst.on?.('slideChange', handler);
    inst.on?.('transitionEnd', handler);
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

const { width: windowWidth } = useWindowSize();
watch(windowWidth, () => {
    debouncedRefresh();
});

const revealRootRef = ref<HTMLElement | null>(null);

const swiperContainerAttrs = { init: 'false' } as Record<string, unknown>;

useScrollTriggerRef(revealRootRef, ({ gsap, el }) => {
    if (!props.revealOnScroll) return;
    gsap.from(el, {
        opacity: 0,
        y: props.revealY,
        duration: props.revealDuration,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: el,
            start: props.revealStart,
            toggleActions: 'play none none reverse',
        },
    });
});
</script>

<template>
    <div>
        <ClientOnly>
            <!-- ตัดการ์ด/สไลด์ที่ล้นออกนอกความกว้างเลย์เอาต์ (โดยเฉพาะ centeredSlides) — ชั้นใน overflow-visible ได้เมื่อ slideOverflowVisible เพื่อ scale ทับการ์ดข้าง -->
            <div ref="revealRootRef" class="min-w-0 w-full max-w-full overflow-x-hidden">
                <div
                    class="relative min-w-0"
                    :class="props.slideOverflowVisible ? 'overflow-visible' : 'overflow-hidden'"
                >
                <swiper-container
                    ref="containerRef"
                    v-bind="swiperContainerAttrs"
                    :class="[
                        props.containerClass,
                        props.slideOverflowVisible ? 'carousel-slide-overflow-visible' : '',
                    ]"
                >
                    <swiper-slide v-for="slide in slides" :key="slide.key" class="h-auto! min-w-0">
                        <div
                            class="box-border min-h-0 min-w-0"
                            :style="
                                slideInnerGutterX > 0
                                    ? {
                                          paddingLeft: `${slideInnerGutterX}px`,
                                          paddingRight: `${slideInnerGutterX}px`,
                                      }
                                    : undefined
                            "
                        >
                            <template v-if="slide.dynamic">
                                <slot
                                    :item="slide.item"
                                    :index="slide.index"
                                    :active="slide.index === activeRealIndex"
                                />
                            </template>
                            <template v-else>
                                <slot :name="`item-${slide.slotIndex}`" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
                            </template>
                        </div>
                    </swiper-slide>
                </swiper-container>

                <div
                    v-if="props.showNavigation"
                    class="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-1 sm:px-3"
                    :class="props.slideOverflowVisible ? 'z-30' : 'z-10'"
                >
                    <UButton
                        icon="i-heroicons-chevron-left"
                        color="neutral"
                        variant="solid"
                        class="pointer-events-auto min-w-fit! p-1.5! sm:p-2.5! rounded-full bg-primary/75 text-white shadow-md backdrop-blur-sm hover:bg-primary/90"
                        aria-label="สไลด์ก่อนหน้า"
                        @click="handlePrev"
                    />
                    <UButton
                        icon="i-heroicons-chevron-right"
                        color="neutral"
                        variant="solid"
                        class="pointer-events-auto min-w-fit! p-1.5! sm:p-2.5! rounded-full bg-primary/75 text-white shadow-md backdrop-blur-sm hover:bg-primary/90"
                        aria-label="สไลด์ถัดไป"
                        @click="handleNext"
                    />
                </div>
                </div>

                <div
                    v-if="props.dot && slides.length > 1"
                    class="mt-3 flex items-center justify-center gap-2"
                    role="tablist"
                    aria-label="เลือกสไลด์"
                >
                    <button
                        v-for="(slide, idx) in slides"
                        :key="`dot-${slide.key}`"
                        type="button"
                        role="tab"
                        :aria-selected="idx === activeRealIndex"
                        :aria-label="`ไปสไลด์ที่ ${idx + 1}`"
                        class="carousel-dot"
                        :class="idx === activeRealIndex ? 'carousel-dot--active' : ''"
                        @click="goToSlide(idx)"
                    />
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<style>
/* Shadow DOM (swiper-container): ยก overflow:hidden ของ .swiper / wrapper เมื่อใช้คลาส carousel-slide-overflow-visible */
.carousel-slide-overflow-visible::part(container) {
    overflow: visible;
}

.carousel-slide-overflow-visible::part(wrapper) {
    overflow: visible;
}

/* Custom pagination dots: render นอก shadow DOM ของ swiper-container ใต้แคโรเซลเสมอ */
.carousel-dot {
    width: 9px;
    height: 9px;
    border-radius: 9999px;
    background: #111827;
    opacity: 0.3;
    transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease, width 0.2s ease;
    cursor: pointer;
    border: 0;
    padding: 0;
}

.carousel-dot:hover {
    opacity: 0.6;
}

.carousel-dot--active {
    background: var(--color-primary);
    opacity: 1;
    width: 22px;
}
</style>
