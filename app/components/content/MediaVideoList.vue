<script setup lang="ts">
interface Props {
    category?: string;
}
const props = defineProps<Props>();

const cacheKey = props.category ? `media-videos-${props.category}` : 'media-videos-all';

const { data: videos } = await useAsyncData(cacheKey, () => {
    let query = queryCollection('mediaVideos').order('order', 'ASC');
    if (props.category) {
        query = query.where('category', '=', props.category);
    }
    return query.all();
});

// Modal state
const isModalOpen = ref(false);
const initialVideoIndex = ref(0);

// Transform videos for modal
const galleryVideos = computed(() => {
    if (!videos.value) return [];
    return videos.value.map((video) => ({
        videoId: video.videoId,
        title: video.title,
        platform: video.platform as 'youtube' | 'facebook' | undefined,
    }));
});

// Get thumbnail URL
function getThumbnailUrl(video: NonNullable<typeof videos.value>[number]) {
    // Use custom thumbnail if provided
    const videoWithThumbnail = video as { thumbnail?: string };
    if (videoWithThumbnail.thumbnail) {
        return videoWithThumbnail.thumbnail;
    }
    
    if (video.platform === 'facebook') {
        // Facebook doesn't have public thumbnail API, use placeholder
        return '/placeholder-video.png';
    }
    return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
}

function openModal(index: number) {
    initialVideoIndex.value = index;
    isModalOpen.value = true;
}
</script>

<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(video, index) in videos" :key="video.videoId" class="relative group cursor-pointer" @click="openModal(index)">
                <!-- Thumbnail with play button overlay -->
                <div class="relative w-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" style="aspect-ratio: 16/9">
                    <img :src="getThumbnailUrl(video)" :alt="video.title || 'Video thumbnail'" class="w-full h-full object-cover" />
                    <!-- Play button overlay -->
                    <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div class="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <!-- Platform badge -->
                    <div v-if="video.platform === 'facebook'" class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">Facebook</div>
                    <div v-else class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">YouTube</div>
                </div>
                <!-- Video title -->
                <p v-if="video.title" class="mt-2 text-center text-sm text-stone-600 group-hover:text-primary transition-colors">
                    {{ video.title }}
                </p>
            </div>
        </div>

        <!-- Video Modal -->
        <VideoGalleryModal v-model:open="isModalOpen" :videos="galleryVideos" :initial-index="initialVideoIndex" />
    </div>
</template>
