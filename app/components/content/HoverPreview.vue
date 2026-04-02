<script setup lang="ts">
import { useMediaQuery, useResizeObserver } from '@vueuse/core';

interface Props {
    /** เปิด/ปิดการสลับรูปเมื่อ hover */
    enabled?: boolean;
    /** ขยายด้วย scale เมื่อ hover (ไม่กระทบ layout) */
    expandOnHover?: boolean;
    /** ค่า scale ตอน hover (เช่น 1.06) */
    hoverScale?: number;
    /** ความเร็ว transition (ms) */
    transitionMs?: number;
    /** class เพิ่มให้ wrapper หลัก */
    wrapperClass?: string;
    /** class เพิ่มให้แถบข้อความใต้รูป (slot caption) */
    captionClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    expandOnHover: false,
    hoverScale: 1.06,
    transitionMs: 250,
    wrapperClass: '',
    captionClass: '',
});

defineSlots<{
    /** รูปหลัก */
    default(): unknown;
    /** รูปรอง (แสดงเมื่อ hover) */
    hover(): unknown;
    /** ข้อความใต้การ์ด — ไม่ถูก scale เมื่อ expandOnHover (อยู่เหนือส่วนที่ล้นลงมา) */
    caption(): unknown;
}>();

const slots = useSlots();

/** ตรงกับ breakpoint `md` ของ Tailwind (768px) — มือถือใช้ปุ่มสลับแทน hover */
const isMdUp = useMediaQuery('(min-width: 768px)');

const mediaRef = ref<HTMLElement | null>(null);
const mediaHeightPx = ref(0);

useResizeObserver(mediaRef, (entries) => {
    const entry = entries[0];
    const h = entry?.contentRect.height ?? mediaRef.value?.offsetHeight ?? 0;
    mediaHeightPx.value = h;
});

const rootStyle = computed(() => {
    const scale = Number.isFinite(props.hoverScale) ? props.hoverScale : 1.04;
    const duration = Number.isFinite(props.transitionMs) ? props.transitionMs : 250;
    return {
        '--hp-scale': String(scale),
        '--hp-duration': `${duration}ms`,
        '--hp-media-h': `${mediaHeightPx.value}px`,
    } as Record<string, string>;
});

/** ขยาย + ดัน caption เฉพาะเดสก์ท็อป — มือถือไม่ scale */
const expandActive = computed(() => props.expandOnHover && props.enabled && isMdUp.value);

const showCaptionPush = computed(() => expandActive.value && !!slots.caption);

/** มี slot hover ถึงจะ crossfade สลับรูป — ไม่มีแล้วใช้แค่รูปเดียว (เช่น ขยายด้วย expandOnHover อย่างเดียว) */
const hasHoverSlot = computed(() => !!slots.hover);

/** มือถือ: สลับดูรูปที่สองแทน hover */
const showAltOnMobile = ref(false);

watch(isMdUp, (up) => {
    if (up) showAltOnMobile.value = false;
});

function toggleMobileAlt() {
    showAltOnMobile.value = !showAltOnMobile.value;
}

const defaultLayerOpacityClass = computed(() => {
    if (!hasHoverSlot.value) return 'opacity-100';
    if (!props.enabled) return 'opacity-100';
    if (isMdUp.value) return 'opacity-100 group-hover:opacity-0';
    return showAltOnMobile.value ? 'opacity-0' : 'opacity-100';
});

const hoverLayerOpacityClass = computed(() => {
    if (!hasHoverSlot.value) return '';
    if (!props.enabled) return 'opacity-0';
    if (isMdUp.value) return 'opacity-0 group-hover:opacity-100';
    return showAltOnMobile.value ? 'opacity-100' : 'opacity-0';
});

const showMobileSwapButton = computed(
    () => hasHoverSlot.value && props.enabled && !isMdUp.value,
);
</script>

<template>
    <div
        :class="[
            'hp-root relative flex min-w-0 w-full flex-col mt-5',
            props.enabled && 'group',
            expandActive && 'hp-expand',
            props.wrapperClass,
            /* overflow-hidden บน wrapper จะตัด scale — ตอนขยายทับการ์ดข้างต้อง visible */
            expandActive && 'overflow-visible!',
        ]"
        :style="rootStyle"
    >
        <!-- เฉพาะบล็อกนี้ที่ scale — caption อยู่นอกจึงไม่ถูกขยาย/ทับโดยเลเยอร์รูป -->
        <div ref="mediaRef" class="hp-media relative z-1 min-w-0 w-full">
            <div class="hp-inner grid w-full">
                <div
                    class="hp-layer col-start-1 row-start-1 h-full w-3/4 mx-auto"
                    :class="defaultLayerOpacityClass"
                >
                    <slot />
                </div>

                <div
                    v-if="hasHoverSlot"
                    class="hp-layer col-start-1 row-start-1 h-full w-4/5 mx-auto"
                    :class="hoverLayerOpacityClass"
                >
                    <slot name="hover" />
                </div>
            </div>

            <UButton
                v-if="showMobileSwapButton"
                type="button"
                icon="i-heroicons-arrows-right-left"
                color="neutral"
                variant="solid"
                square
                class="pointer-events-auto absolute bottom-2 left-1/2 z-10 size-11 min-h-11 min-w-11! max-w-11! -translate-x-1/2 rounded-full! bg-neutral-900/75 p-0! text-white shadow-md backdrop-blur-sm hover:bg-neutral-900/90 [&>span]:m-0"
                :aria-pressed="showAltOnMobile"
                aria-label="สลับดูภาพอีกแบบ"
                @click="toggleMobileAlt"
            />
        </div>

        <div
            v-if="showCaptionPush"
            class="hp-caption-push shrink-0"
            aria-hidden="true"
        />

        <div
            v-if="$slots.caption"
            class="hp-caption relative z-2 min-w-0 shrink-0 pt-2"
            :class="props.captionClass"
        >
            <slot name="caption" />
        </div>
    </div>
</template>

<style scoped>
.hp-expand {
    /* ให้การ์ดที่ hover อยู่เหนือสไลด์ข้าง ๆ */
    z-index: 0;
}

.hp-expand:hover,
.hp-expand:focus-within {
    z-index: 20;
}

.hp-layer {
    transform-origin: center center;
    transition-property: opacity, transform;
    transition-duration: var(--hp-duration);
    transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: opacity, transform;
}

.hp-expand:hover .hp-layer,
.hp-expand:focus-within .hp-layer {
    transform: scale(var(--hp-scale));
}

/* ดันข้อความลงตามส่วนที่รูปขยายลง (scale จากกลาง → ครึ่งล่างของความสูงมีเดีย) */
.hp-caption-push {
    height: 0;
    transition-property: height;
    transition-duration: var(--hp-duration);
    transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hp-expand:hover .hp-caption-push,
.hp-expand:focus-within .hp-caption-push {
    height: calc((var(--hp-scale) - 1) * 0.5 * var(--hp-media-h, 0px));
}

@media (prefers-reduced-motion: reduce) {
    .hp-layer {
        transition-duration: 0ms;
    }

    .hp-caption-push {
        transition-duration: 0ms;
    }
}
</style>

