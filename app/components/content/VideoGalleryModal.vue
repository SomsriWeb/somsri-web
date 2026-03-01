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

// Calculate video dimensions based on container size
const videoDimensions = computed(() => {
    if (!currentVideo.value) return { width: 0, height: 0 };

    const containerW = unref(containerWidth) || 1000;
    const containerH = unref(containerHeight) || 600;
    
    // Account for padding and buttons (less padding for larger videos)
    const availableWidth = containerW - 100; // 50px padding on each side for buttons
    const availableHeight = containerH - 20; // Minimal padding

    if (currentVideo.value.platform === 'facebook') {
        // Facebook videos can be square (1:1) or 16:9
        // Use most of the available space for larger display
        // Use 90% of available space for better visibility
        const useWidth = Math.floor(availableWidth * 0.9);
        const useHeight = Math.floor(availableHeight * 0.9);
        const maxWidth = Math.min(useWidth, 1600); // Increased max width
        const maxHeight = Math.min(useHeight, 1200); // Increased max height
        
        // If container is wider, use 16:9 format for better display
        if (availableWidth / availableHeight > 1.2) {
            const height = Math.min(maxHeight, Math.round(maxWidth * (9 / 16)));
            const width = Math.round(height * (16 / 9));
            return { width, height };
        }
        
        // Otherwise use square format, but make it larger
        const squareSize = Math.min(maxWidth, maxHeight);
        return { width: squareSize, height: squareSize };
    }

    // YouTube videos are 16:9 aspect ratio
    const height = Math.min(availableHeight, Math.round(availableWidth * (9 / 16)));
    const width = Math.round(height * (16 / 9));
    return { width, height };
});

const embedUrl = computed(() => {
    if (!currentVideo.value) return '';

    if (currentVideo.value.platform === 'facebook') {
        // Support both watch and reel formats
        const videoUrl = currentVideo.value.videoId.includes('/')
            ? `https://www.facebook.com/${currentVideo.value.videoId}`
            : `https://www.facebook.com/reel/${currentVideo.value.videoId}/`;
        const encodedUrl = encodeURIComponent(videoUrl);
        // Use calculated dimensions for responsive sizing
        const { width, height } = videoDimensions.value;
        return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=${width}&height=${height}`;
    }

    return `https://www.youtube.com/embed/${currentVideo.value.videoId}?rel=0`;
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
                    aria-label="วิดีโอก่อนหน้า"
                    @click="prevVideo"
                />

                <div
                    ref="videoContainer"
                    class="relative mx-auto"
                    :style="{
                        width: videoDimensions.width > 0 ? `${videoDimensions.width}px` : '100%',
                        height: videoDimensions.height > 0 ? `${videoDimensions.height}px` : '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }"
                >
                    <iframe
                        v-if="currentVideo && videoDimensions.width > 0"
                        class="absolute top-0 left-0 w-full h-full rounded"
                        :src="embedUrl"
                        :title="currentVideo.title || 'วิดีโอ'"
                        :aria-label="`วิดีโอ: ${currentVideo.title || 'วิดีโอ'} (${currentVideoIndex + 1} จาก ${videos.length})`"
                        :width="String(videoDimensions.width)"
                        :height="String(videoDimensions.height)"
                        style="border:none;overflow:hidden"
                        scrolling="no"
                        frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen="true"
                        loading="lazy"
                    />
                </div>

                <UButton
                    v-if="hasNext"
                    icon="i-heroicons-chevron-right"
                    class="text-white! min-w-fit! rounded-full absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    aria-label="วิดีโอถัดไป"
                    @click="nextVideo"
                />
            </div>
        </template>
    </UModal>
</template>
