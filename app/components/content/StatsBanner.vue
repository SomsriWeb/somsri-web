<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

interface Props {
    wrapperClass?: string;
    innerClass?: string;
    gridClass?: string;
    itemClass?: string;

    /** เลขเป้าหมายแต่ละช่อง (ถ้าไม่ใส่ ช่องนั้นใช้ slot แบบเดิมทั้งก้อน + แค่ slide) */
    count1?: number | string;
    count2?: number | string;
    count3?: number | string;
    count4?: number | string;

    /** ต่อท้ายตัวเลข เช่น `" +"` */
    suffix1?: string;
    suffix2?: string;
    suffix3?: string;
    suffix4?: string;

    /** ระยะเวลานับเลขรวม (ms) */
    duration?: number;
    /** หน่วงเริ่มแต่ละช่อง (ms) */
    stagger?: number;
    /** ปิดแอนิเมชัน */
    animate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    wrapperClass: 'relative left-1/2 w-screen -translate-x-1/2 bg-primary text-white',
    innerClass: 'px-5 lg:px-[4.6rem]',
    gridClass: 'grid grid-cols-2 sm:grid-cols-4 gap-y-6',
    itemClass: 'flex flex-col items-center justify-center text-center py-6',
    suffix1: '',
    suffix2: '',
    suffix3: '',
    suffix4: '',
    duration: 1800,
    stagger: 120,
    animate: true,
});

type Slots = {
    'item-1'?: () => unknown;
    'item-2'?: () => unknown;
    'item-3'?: () => unknown;
    'item-4'?: () => unknown;
};

defineSlots<Slots>();

function toNum(v: unknown): number | null {
    if (v === undefined || v === null || v === '') return null;
    const n = typeof v === 'number' ? v : Number(String(v).replace(/,/g, ''));
    return Number.isFinite(n) ? n : null;
}

function formatInt(n: number): string {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));
}

function easeOutCubic(t: number): number {
    return 1 - (1 - t) ** 3;
}

const items = computed(() =>
    (
        [
            { slot: 'item-1' as const, count: toNum(props.count1), suffix: props.suffix1 ?? '' },
            { slot: 'item-2' as const, count: toNum(props.count2), suffix: props.suffix2 ?? '' },
            { slot: 'item-3' as const, count: toNum(props.count3), suffix: props.suffix3 ?? '' },
            { slot: 'item-4' as const, count: toNum(props.count4), suffix: props.suffix4 ?? '' },
        ] as const
    ).map((it, index) => ({ ...it, index })),
);

const rootEl = ref<HTMLElement | null>(null);
const motionOk = ref(false);
/** เปิดแอนิเมชัน label/slot หลังเข้า viewport */
const reveal = ref(false);
const displayed = ref<[number, number, number, number]>([0, 0, 0, 0]);

let rafId = 0;

onMounted(() => {
    if (typeof window === 'undefined') return;
    motionOk.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

function runCountUp() {
    if (!props.animate || !motionOk.value) {
        const next: [number, number, number, number] = [0, 0, 0, 0];
        items.value.forEach((it, i) => {
            if (it.count != null) next[i] = it.count;
        });
        displayed.value = next;
        reveal.value = true;
        return;
    }

    const targets = items.value.map((it) => (it.count != null ? it.count : 0));
    const any = items.value.some((it) => it.count != null);
    if (!any) {
        reveal.value = true;
        return;
    }

    const startedAt = performance.now();

    function tick(now: number) {
        const elapsed = now - startedAt;
        let done = true;
        const next: [number, number, number, number] = [...displayed.value];

        items.value.forEach((it, i) => {
            if (it.count == null) return;
            const delay = it.index * props.stagger;
            const t = Math.max(0, Math.min(1, (elapsed - delay) / props.duration));
            const eased = easeOutCubic(t);
            next[i] = Math.round(it.count * eased);
            if (t < 1) done = false;
        });

        displayed.value = next;

        if (!done) {
            rafId = requestAnimationFrame(tick);
        } else {
            const final: [number, number, number, number] = [...displayed.value];
            items.value.forEach((it, i) => {
                if (it.count != null) final[i] = it.count;
            });
            displayed.value = final;
        }
    }

    cancelAnimationFrame(rafId);
    displayed.value = [0, 0, 0, 0];
    reveal.value = true;
    rafId = requestAnimationFrame(tick);
}

const hasPlayed = ref(false);

useIntersectionObserver(
    rootEl,
    ([entry]) => {
        if (!entry?.isIntersecting || hasPlayed.value) return;
        hasPlayed.value = true;
        runCountUp();
    },
    { threshold: 0.2 },
);

onBeforeUnmount(() => cancelAnimationFrame(rafId));
</script>

<template>
    <!-- fallback = ค่า SEO/SSR; ตัวเลขตรงเป้าหมาย -->
    <ClientOnly>
        <section ref="rootEl" :class="props.wrapperClass" aria-label="สถิติ">
            <div :class="props.innerClass">
                <div :class="props.gridClass">
                    <div v-for="it in items" :key="it.slot" :class="props.itemClass">
                        <template v-if="it.count != null">
                            <div
                                class="text-5xl font-bold leading-none tabular-nums transition-opacity duration-300"
                                :class="reveal ? 'opacity-100' : 'opacity-0'"
                            >
                                {{ formatInt(displayed[it.index] ?? 0) }}{{ it.suffix }}
                            </div>
                            <div
                                class="mt-2 text-xl overflow-hidden"
                                :class="['stats-banner-label', reveal && 'stats-banner-label--in']"
                                :style="{ animationDelay: `${0.25 + it.index * 0.09}s` }"
                            >
                                <slot :name="it.slot" />
                            </div>
                        </template>
                        <template v-else>
                            <div
                                :class="['stats-banner-whole', reveal && 'stats-banner-whole--in']"
                                :style="{ animationDelay: `${0.08 + it.index * 0.08}s` }"
                            >
                                <slot :name="it.slot" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <template #fallback>
            <section :class="props.wrapperClass" aria-label="สถิติ">
                <div :class="props.innerClass">
                    <div :class="props.gridClass">
                        <div v-for="it in items" :key="it.slot" :class="props.itemClass">
                            <template v-if="it.count != null">
                                <div class="text-5xl font-bold leading-none tabular-nums">
                                    {{ formatInt(it.count) }}{{ it.suffix }}
                                </div>
                                <div class="mt-2 text-xl">
                                    <slot :name="it.slot" />
                                </div>
                            </template>
                            <template v-else>
                                <slot :name="it.slot" />
                            </template>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </ClientOnly>
</template>

<style scoped>
.stats-banner-label {
    opacity: 0;
    transform: translateY(0.75rem);
}

.stats-banner-label--in {
    animation: stats-banner-slide-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.stats-banner-whole {
    opacity: 0;
    transform: translateY(0.75rem);
}

.stats-banner-whole--in {
    animation: stats-banner-slide-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes stats-banner-slide-up {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
