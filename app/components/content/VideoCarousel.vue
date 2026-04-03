<script setup lang="ts">
type Platform = 'youtube' | 'facebook';

type VideoItem = {
    videoId: string;
    title?: string;
    platform?: Platform;
    muted?: boolean;
    aspectRatio?: '16/9' | '9/16';
};

interface Props {
    /** ระบุ items เอง (override การดึงจาก content) */
    items?: VideoItem[];
    /** ดึงข้อมูลจาก `content/data/media-videos/*.json` โดย filter category */
    category?: string;
    slidesPerView?: number;
    spaceBetween?: number;
    loop?: boolean;
    showNavigation?: boolean;
    containerClass?: string;
    /** หน่วงก่อนเริ่มเล่นบน Desktop hover (ms) */
    hoverDelayMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    showNavigation: true,
    containerClass: 'w-full max-w-full',
    hoverDelayMs: 250,
});

const cacheKey = computed(() => (props.category ? `video-carousel-${props.category}` : 'video-carousel'));

const { data: contentItems } = useAsyncData(cacheKey, async () => {
    if (!props.category) return [];
    const videos = await queryCollection('mediaVideos').where('category', '=', props.category).order('order', 'ASC').all();
    return videos.map((v) => ({
        videoId: v.videoId,
        title: v.title,
        platform: (v.platform as Platform) || 'facebook',
        muted: true,
        aspectRatio: '9/16' as const,
    }));
});

const resolvedItems = computed<VideoItem[]>(() => {
    if (props.items && props.items.length) return props.items;
    return (contentItems.value as VideoItem[] | null) ?? [];
});

const activeHoverIndex = ref<number | null>(null);
const pendingHoverIndex = ref<number | null>(null);
const hoverTimer = ref<number | null>(null);

function clearHoverTimer() {
    if (hoverTimer.value == null) return;
    window.clearTimeout(hoverTimer.value);
    hoverTimer.value = null;
}

function onDesktopEnter(index: number) {
    pendingHoverIndex.value = index;
    clearHoverTimer();
    hoverTimer.value = window.setTimeout(() => {
        activeHoverIndex.value = index;
        pendingHoverIndex.value = null;
        hoverTimer.value = null;
    }, props.hoverDelayMs);
}

function onDesktopLeave(index: number) {
    if (pendingHoverIndex.value === index) pendingHoverIndex.value = null;
    clearHoverTimer();
    if (activeHoverIndex.value === index) activeHoverIndex.value = null;
}
</script>

<template>
    <div :class="props.containerClass">
        <!-- Desktop: grid 4 คลิป เล่นเมื่อ hover -->
        <div class="hidden md:grid md:grid-cols-4 gap-4">
            <div
                v-for="(it, index) in resolvedItems"
                :key="`${it.platform || 'facebook'}-${it.videoId}-${index}`"
                class="min-w-0"
                @mouseenter="onDesktopEnter(index)"
                @mouseleave="onDesktopLeave(index)"
                @focusin="onDesktopEnter(index)"
                @focusout="onDesktopLeave(index)"
            >
                <ProseVideo
                    :video-id="it.videoId"
                    :title="it.title || 'Video'"
                    :platform="it.platform || 'facebook'"
                    :muted="it.muted ?? true"
                    :aspect-ratio="it.aspectRatio || '9/16'"
                    :active="activeHoverIndex === index"
                    :autoplay-when-active="true"
                    control-mode="facebook-sdk"
                    pause-mode="reload"
                />
            </div>
        </div>

        <!-- Mobile: ใช้ carousel component และเล่นเฉพาะสไลด์ที่ active -->
        <div class="md:hidden">
            <Carousel
                :items-data="resolvedItems"
                :slides-per-view="1"
                :space-between="props.spaceBetween"
                :loop="props.loop"
                :show-navigation="props.showNavigation"
                breakpoints-preset="simple"
                breakpoints-base="container"
                container-class="w-full max-w-full"
            >
                <template #default="{ item, active }">
                    <ProseVideo
                        :video-id="(item as any).videoId"
                        :title="(item as any).title || 'Video'"
                        :platform="(item as any).platform || 'facebook'"
                        :muted="(item as any).muted ?? true"
                        :aspect-ratio="(item as any).aspectRatio || '9/16'"
                        :active="active"
                        :autoplay-when-active="true"
                        control-mode="facebook-sdk"
                        pause-mode="reload"
                    />
                </template>
            </Carousel>
        </div>
    </div>
</template>

