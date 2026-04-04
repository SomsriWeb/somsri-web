<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';

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
}

const props = withDefaults(defineProps<Props>(), {
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    showNavigation: true,
    containerClass: 'w-full max-w-full',
});

const asyncDataKey = () => (props.category ? `video-carousel-${props.category}` : 'video-carousel-idle');

const { data: contentItems } = useAsyncData(
    asyncDataKey,
    async () => {
        if (!props.category) return [];
        const videos = await queryCollection('mediaVideos').where('category', '=', props.category).order('order', 'ASC').all();
        return videos.map((v) => ({
            videoId: v.videoId,
            title: v.title,
            platform: (v.platform as Platform) || 'facebook',
            muted: v.muted ?? true,
            aspectRatio: (v.aspectRatio ?? '9/16') as '16/9' | '9/16',
        }));
    },
    { watch: [() => props.category] },
);

const resolvedItems = computed<VideoItem[]>(() => {
    if (props.items?.length) return props.items;
    return (contentItems.value as VideoItem[] | null) ?? [];
});

function proseVideoBindings(it: VideoItem, active: boolean) {
    return {
        videoId: it.videoId,
        title: it.title || 'Video',
        platform: it.platform || 'facebook',
        muted: it.muted ?? true,
        aspectRatio: it.aspectRatio || '9/16',
        active,
        autoplayWhenActive: true,
        controlMode: 'facebook-sdk' as const,
        pauseMode: 'reload' as const,
    };
}

const rootRef = ref<HTMLElement | null>(null);
useScrollRevealUp(rootRef, { start: 'top 60%' });
</script>

<template>
    <div ref="rootRef" :class="props.containerClass">
        <!-- 1 สไลด์จนกว่า lg (1024px) แล้วใช้ slidesPerView — สอดคล้อง UX แทน grid+hover ที่ md -->
        <Carousel
            :items-data="resolvedItems"
            :slides-per-view="props.slidesPerView"
            :space-between="props.spaceBetween"
            :loop="props.loop"
            :show-navigation="props.showNavigation"
            breakpoints-preset="simple-lg"
            breakpoints-base="container"
            container-class="w-full max-w-full"
        >
            <template #default="{ item, active }">
                <ProseVideo v-bind="proseVideoBindings(item as VideoItem, active)" />
            </template>
        </Carousel>
    </div>
</template>

