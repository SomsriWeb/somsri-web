<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { useTemplateRef, unref } from 'vue';
interface VideoItem {
    videoId: string;
    title?: string;
    platform?: 'youtube' | 'facebook';
}

interface Props {
    videos: VideoItem[];
    initialIndex?: number;
}

const { initialIndex = 0, videos } = defineProps<Props>();
const open = defineModel<boolean>('open', { default: false });

const currentVideoIndex = ref(initialIndex);
const videoContainerRef = useTemplateRef<HTMLDivElement>('videoContainer');
const bodyContainerRef = useTemplateRef<HTMLDivElement>('bodyContainer');
const { width: containerWidth, height: containerHeight } = useElementSize(bodyContainerRef);

const currentVideo = computed(() => videos?.[currentVideoIndex.value] ?? null);
const hasNext = computed(() => currentVideoIndex.value < videos.length - 1);
const hasPrev = computed(() => currentVideoIndex.value > 0);

const embedUrl = computed(() => {
    if (!currentVideo.value) return '';

    if (currentVideo.value.platform === 'facebook') {
        // Support both watch and reel formats
        const videoUrl = currentVideo.value.videoId.includes('/')
            ? `https://www.facebook.com/${currentVideo.value.videoId}`
            : `https://www.facebook.com/reel/${currentVideo.value.videoId}/`;
        const encodedUrl = encodeURIComponent(videoUrl);
        return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=734&height=734`;
    }

    return `https://www.youtube.com/embed/${currentVideo.value.videoId}?rel=0`;
});

// Extract width and height from embed URL
const videoDimensions = computed(() => {
    if (!currentVideo.value || !embedUrl.value) return { width: 0, height: 0 };

    try {
        const url = new URL(embedUrl.value);
        const urlWidth = url.searchParams.get('width');
        const urlHeight = url.searchParams.get('height');

        if (urlWidth && urlHeight) {
            return {
                width: parseInt(urlWidth),
                height: parseInt(urlHeight),
            };
        }

        // Fallback: use container size for YouTube
        if (currentVideo.value.platform === 'youtube') {
            const height = unref(containerHeight) || 400;
            return { width: Math.round(height * (16 / 9)), height };
        }

        // Fallback for Facebook
        return { width: 734, height: 734 };
    } catch {
        // If URL parsing fails, use defaults
        if (currentVideo.value.platform === 'facebook') {
            return { width: 734, height: 734 };
        }
        const height = unref(containerHeight) || 400;
        return { width: Math.round(height * (16 / 9)), height };
    }
});

function nextVideo() {
    if (hasNext.value) {
        currentVideoIndex.value++;
    }
}

function prevVideo() {
    if (hasPrev.value) {
        currentVideoIndex.value--;
    }
}

function selectVideo(index: number) {
    currentVideoIndex.value = index;
}

watch(
    () => initialIndex,
    (newIndex) => {
        if (newIndex >= 0 && newIndex < videos.length) {
            currentVideoIndex.value = newIndex;
        }
    },
);

watch(open, (isOpen) => {
    if (isOpen) {
        currentVideoIndex.value = initialIndex >= 0 && initialIndex < videos.length ? initialIndex : 0;
    }
});

function handleKeydown(event: KeyboardEvent) {
    if (!open.value) return;

    switch (event.key) {
        case 'ArrowLeft':
            prevVideo();
            break;
        case 'ArrowRight':
            nextVideo();
            break;
        case 'Escape':
            open.value = false;
            break;
    }
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
    <UModal
        v-model:open="open"
        :ui="{
            content: 'max-w-4xl h-[90vh] sm:h-[85vh] md:h-full max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]',
            header: 'p-2 sm:px-4 min-h-fit flex-shrink-0',
            body: 'p-0 sm:p-0 overflow-hidden flex-1',
        }"
    >
        <template #header="{ close }">
            <div class="flex items-center justify-between w-full">
                <h2 v-if="currentVideo?.title" class="text-base sm:text-xl font-bold text-primary truncate pr-4">
                    {{ currentVideo.title }}
                </h2>
                <UButton icon="i-lucide-x" color="neutral" variant="ghost" class="rounded-full ml-auto shrink-0" @click="close" />
            </div>
        </template>
        <template #body>
            <div ref="bodyContainer" class="relative bg-black h-full flex items-center justify-center">
                <UButton
                    v-if="hasPrev"
                    icon="i-heroicons-chevron-left"
                    class="text-white! min-w-fit! rounded-full absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    @click="prevVideo"
                />

                <div
                    ref="videoContainer"
                    class="relative mx-auto"
                    :style="{
                        width: videoDimensions.width > 0 ? `${Math.min(videoDimensions.width, unref(containerWidth) || 1000)}px` : '100%',
                        height: videoDimensions.height > 0 ? `${Math.min(videoDimensions.height, unref(containerHeight) || 1000)}px` : '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }"
                >
                    <iframe
                        v-if="currentVideo && videoDimensions.width > 0"
                        class="rounded"
                        :src="embedUrl"
                        :title="currentVideo.title || 'Video'"
                        :width="String(videoDimensions.width)"
                        :height="String(videoDimensions.height)"
                        style="border:none;overflow:hidden"
                        scrolling="no"
                        frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen="true"
                    />
                </div>

                <UButton
                    v-if="hasNext"
                    icon="i-heroicons-chevron-right"
                    class="text-white! min-w-fit! rounded-full absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    @click="nextVideo"
                />
            </div>
        </template>
    </UModal>
</template>
