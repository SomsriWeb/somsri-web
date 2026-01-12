<script setup lang="ts">
// PROPS
interface Props {
    videoId: string;
    title?: string;
    platform?: 'youtube' | 'facebook';
    autoplay?: boolean;
    muted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    videoId: '',
    title: 'Video',
    platform: 'youtube',
    autoplay: false,
    muted: false,
});

const embedUrl = computed(() => {
    if (props.platform === 'facebook') {
        // Facebook Video Embed
        const videoUrl = encodeURIComponent(`https://www.facebook.com/watch/?v=${props.videoId}`);
        return `https://www.facebook.com/plugins/video.php?href=${videoUrl}&show_text=false&width=560`;
    }

    // YouTube Video Embed
    const params = new URLSearchParams();
    if (props.autoplay) params.append('autoplay', '1');
    if (props.muted) params.append('mute', '1');
    params.append('rel', '0');

    const queryString = params.toString();
    return `https://www.youtube.com/embed/${props.videoId}${queryString ? '?' + queryString : ''}`;
});
</script>

<template>
    <div class="prose-video-wrapper relative h-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" style="aspect-ratio: 16/9">
        <iframe
            class="absolute top-0 left-0"
            :src="embedUrl"
            :title="props.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        />
    </div>
</template>
