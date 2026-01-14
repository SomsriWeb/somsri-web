<script setup lang="ts">
// PROPS
interface Props {
    videoId: string;
    title?: string;
    platform?: 'youtube' | 'facebook';
    autoplay?: boolean;
    muted?: boolean;
    description?: string;
    thumbnail?: string;
}

const props = withDefaults(defineProps<Props>(), {
    videoId: '',
    title: 'Video',
    platform: 'youtube',
    autoplay: false,
    muted: false,
    description: '',
    thumbnail: '',
});

const config = useRuntimeConfig();
const siteUrl = (config.public as any)?.site?.url || 'https://somsritshirt.com';

const embedUrl = computed(() => {
    if (props.platform === 'facebook') {
        // Facebook Video Embed - support both watch and reel formats
        const videoUrl = props.videoId.includes('/')
            ? `https://www.facebook.com/${props.videoId}`
            : `https://www.facebook.com/watch/?v=${props.videoId}`;
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=560`;
    }

    // YouTube Video Embed
    const params = new URLSearchParams();
    if (props.autoplay) params.append('autoplay', '1');
    if (props.muted) params.append('mute', '1');
    params.append('rel', '0');

    const queryString = params.toString();
    return `https://www.youtube.com/embed/${props.videoId}${queryString ? '?' + queryString : ''}`;
});

// Get video URL for structured data
const videoUrl = computed(() => {
    if (props.platform === 'facebook') {
        return props.videoId.includes('/')
            ? `https://www.facebook.com/${props.videoId}`
            : `https://www.facebook.com/watch/?v=${props.videoId}`;
    }
    return `https://www.youtube.com/watch?v=${props.videoId}`;
});

// Get thumbnail URL for structured data
const thumbnailUrl = computed(() => {
    if (props.thumbnail) {
        return props.thumbnail.startsWith('http') ? props.thumbnail : `${siteUrl}${props.thumbnail}`;
    }
    if (props.platform === 'youtube') {
        return `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`;
    }
    return `${siteUrl}/placeholder-video.png`;
});

// Structured data for VideoObject
const videoStructuredData = computed(() => {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${siteUrl}/video/${props.videoId}`,
        name: props.title,
        description: props.description || props.title,
        thumbnailUrl: thumbnailUrl.value,
        uploadDate: new Date().toISOString(),
        contentUrl: videoUrl.value,
        embedUrl: embedUrl.value,
        publisher: {
            '@type': 'Organization',
            name: 'สมศรีมีเสื้อ',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/og.jpg`,
            },
        },
    };
});

// Add structured data to head
useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(videoStructuredData.value),
        },
    ],
});
</script>

<template>
    <figure class="prose-video-wrapper relative h-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" style="aspect-ratio: 16/9">
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="embedUrl"
            :title="props.title"
            :aria-label="`วิดีโอ: ${props.title}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            :referrerpolicy="props.platform === 'facebook' ? undefined : 'strict-origin-when-cross-origin'"
            :style="props.platform === 'facebook' ? 'border:none;overflow:hidden' : ''"
            :scrolling="props.platform === 'facebook' ? 'no' : undefined"
            allowfullscreen
            loading="lazy"
        />
        <figcaption v-if="props.description" class="sr-only">{{ props.description }}</figcaption>
    </figure>
</template>
