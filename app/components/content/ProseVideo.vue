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
    /**
     * สัดส่วนวิดีโอ (ใช้กับ CSS `aspect-ratio`)
     * - '16/9' = แนวนอน
     * - '9/16' = แนวตั้ง
     */
    aspectRatio?: '16/9' | '9/16';

    /** true เฉพาะสไลด์ที่อยู่กลาง (ใช้ควบคุม play/pause) */
    active?: boolean;
    /** ถ้า true จะ autoplay เมื่อ active เท่านั้น */
    autoplayWhenActive?: boolean;
    /** วิธีหยุดวิดีโอเมื่อไม่ active */
    pauseMode?: 'unmount' | 'blank' | 'reload';

    /**
     * โหมดควบคุมวิดีโอ
     * - `src`: ควบคุมด้วยการสลับ src (ไม่การันตี autoplay ของ FB)
     * - `facebook-sdk`: ใช้ FB Embedded Video Player API เพื่อสั่ง play/pause (การันตีมากสุด)
     */
    controlMode?: 'src' | 'facebook-sdk';
}

const props = withDefaults(defineProps<Props>(), {
    videoId: '',
    title: 'Video',
    platform: 'youtube',
    autoplay: false,
    muted: false,
    description: '',
    thumbnail: '',
    aspectRatio: '16/9',
    active: true,
    autoplayWhenActive: true,
    pauseMode: 'reload',
    controlMode: 'src',
});

const config = useRuntimeConfig();
const siteUrl = (config.public as any)?.site?.url || 'https://somsritshirt.com';

declare global {
    interface Window {
        FB?: any;
        fbAsyncInit?: () => void;
        __somsriFbSdkPromise?: Promise<any>;
    }
}

function loadFacebookSdk(): Promise<any> {
    if (typeof window === 'undefined') return Promise.resolve(null);
    if (window.__somsriFbSdkPromise) return window.__somsriFbSdkPromise;

    window.__somsriFbSdkPromise = new Promise((resolve) => {
        if (window.FB) return resolve(window.FB);

        window.fbAsyncInit = () => {
            // FB SDK init (ไม่จำเป็นต้องมี appId สำหรับ xfbml ส่วนใหญ่)
            try {
                window.FB?.init?.({
                    xfbml: true,
                    version: 'v20.0',
                });
            } catch {
                // ignore
            }
            resolve(window.FB);
        };

        // fb-root จำเป็นสำหรับบางโหมดของ SDK
        if (!document.getElementById('fb-root')) {
            const root = document.createElement('div');
            root.id = 'fb-root';
            document.body.appendChild(root);
        }

        const id = 'facebook-jssdk';
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
            // ถ้ามี script อยู่แล้ว ให้รอจน FB พร้อม แล้ว resolve (กัน promise ค้าง)
            const startedAt = Date.now();
            const timer = window.setInterval(() => {
                if (window.FB) {
                    window.clearInterval(timer);
                    resolve(window.FB);
                    return;
                }
                if (Date.now() - startedAt > 8000) {
                    window.clearInterval(timer);
                    resolve(null);
                }
            }, 100);
            return;
        }
        const js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.defer = true;
        js.crossOrigin = 'anonymous';
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        document.head.appendChild(js);
    });

    return window.__somsriFbSdkPromise;
}

const fbContainer = ref<HTMLElement | null>(null);
const fbPlayer = shallowRef<any>(null);
const fbReady = ref(false);
const fbPlayerId = `fb-video-${Math.random().toString(36).slice(2)}`;
const fbSdkFailed = ref(false);

const effectiveControlMode = computed<'src' | 'facebook-sdk'>(() => {
    if (props.platform !== 'facebook') return 'src';
    if (props.controlMode !== 'facebook-sdk') return 'src';
    return fbSdkFailed.value ? 'src' : 'facebook-sdk';
});

async function initFacebookPlayer() {
    if (props.platform !== 'facebook') return;
    if (effectiveControlMode.value !== 'facebook-sdk') return;
    if (!fbContainer.value) return;

    const FB = await loadFacebookSdk();
    if (!FB?.Event?.subscribe) {
        fbSdkFailed.value = true;
        return;
    }

    fbReady.value = false;
    fbPlayer.value = null;

    // สร้าง XFBML ใน container แล้วรอ player instance
    fbContainer.value.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'fb-video';
    div.id = fbPlayerId;
    div.setAttribute(
        'data-href',
        props.videoId.includes('/') ? `https://www.facebook.com/${props.videoId}` : `https://www.facebook.com/watch/?v=${props.videoId}`,
    );
    div.setAttribute('data-allowfullscreen', 'true');
    div.setAttribute('data-autoplay', 'false');
    div.setAttribute('data-show-text', 'false');
    // บราวเซอร์ส่วนใหญ่ “บล็อก autoplay” ถ้าไม่ mute → ถ้าต้องการเล่นอัตโนมัติเมื่อ active ให้ force mute
    div.setAttribute('data-mute', props.autoplayWhenActive ? 'true' : props.muted ? 'true' : 'false');
    div.setAttribute('data-width', '560');
    fbContainer.value.appendChild(div);

    FB.Event.subscribe('xfbml.ready', (msg: any) => {
        if (msg?.type !== 'video') return;
        if (msg?.id !== fbPlayerId) return;
        fbPlayer.value = msg.instance;
        fbReady.value = true;
        try {
            if (props.autoplayWhenActive) msg.instance?.mute?.();
            else if (props.muted) msg.instance?.mute?.();
            else msg.instance?.unmute?.();
            if (props.active) msg.instance?.play?.();
            else msg.instance?.pause?.();
        } catch {
            // ignore
        }
    });

    FB.XFBML?.parse?.(fbContainer.value);
}

const embedUrl = computed(() => {
    const shouldAutoplay = (props.autoplay || props.autoplayWhenActive) && props.active;

    if (props.platform === 'facebook') {
        // Facebook Video Embed - support both watch and reel formats
        const videoUrl = props.videoId.includes('/')
            ? `https://www.facebook.com/${props.videoId}`
            : `https://www.facebook.com/watch/?v=${props.videoId}`;
        const params = new URLSearchParams();
        params.set('href', videoUrl);
        params.set('show_text', 'false');
        params.set('width', '560');
        if (shouldAutoplay) {
            params.set('autoplay', '1');
            // Facebook autoplay มักต้อง mute
            if (props.muted || props.autoplayWhenActive) params.set('mute', '1');
        }
        return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
    }

    // YouTube Video Embed
    const params = new URLSearchParams();
    if (shouldAutoplay) params.append('autoplay', '1');
    if (props.muted || shouldAutoplay) params.append('mute', '1');
    params.append('rel', '0');

    const queryString = params.toString();
    return `https://www.youtube.com/embed/${props.videoId}${queryString ? '?' + queryString : ''}`;
});

const inactiveEmbedUrl = computed(() => {
    // เหมือน embedUrl แต่ “ไม่ autoplay” เพื่อให้เห็นตัว player/thumbnail ที่สไลด์ข้างๆ
    if (props.platform === 'facebook') {
        const videoUrl = props.videoId.includes('/')
            ? `https://www.facebook.com/${props.videoId}`
            : `https://www.facebook.com/watch/?v=${props.videoId}`;
        const params = new URLSearchParams();
        params.set('href', videoUrl);
        params.set('show_text', 'false');
        params.set('width', '560');
        return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
    }

    const params = new URLSearchParams();
    if (props.muted) params.append('mute', '1');
    params.append('rel', '0');
    const queryString = params.toString();
    return `https://www.youtube.com/embed/${props.videoId}${queryString ? '?' + queryString : ''}`;
});

const iframeSrc = computed(() => {
    if (props.pauseMode === 'blank') return props.active ? embedUrl.value : 'about:blank';
    return props.active ? embedUrl.value : inactiveEmbedUrl.value;
});

const shouldRenderIframe = computed(() => props.pauseMode !== 'unmount' || props.active);

const iframeKey = computed(() => {
    // บังคับ reload เมื่อ active เปลี่ยน เพื่อหยุด playback ให้ชัวร์ แต่ยังเห็น iframe ข้างๆ
    if (props.pauseMode === 'reload') return `${props.platform}-${props.videoId}-${props.active ? 'active' : 'inactive'}`;
    return `${props.platform}-${props.videoId}`;
});

watch(
    () => [props.active, props.controlMode, props.videoId, props.platform] as const,
    async () => {
        if (props.platform !== 'facebook') return;
        if (effectiveControlMode.value !== 'facebook-sdk') return;
        // ให้แน่ใจว่า player ถูก init
        if (!fbReady.value) await initFacebookPlayer();
        const inst = fbPlayer.value;
        if (!inst) return;
        try {
            if (props.active && props.autoplayWhenActive) inst.mute?.();
            if (props.active) inst.play?.();
            else inst.pause?.();
        } catch {
            // ignore
        }
    },
    { flush: 'post' },
);

onMounted(() => {
    if (props.platform === 'facebook' && effectiveControlMode.value === 'facebook-sdk') {
        initFacebookPlayer();
    }
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
        videoStructuredData.value
            ? {
                  type: 'application/ld+json',
                  children: JSON.stringify(videoStructuredData.value),
              }
            : null,
    ].filter(Boolean),
});
</script>

<template>
    <figure
        class="prose-video-wrapper relative h-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        :style="{ aspectRatio: props.aspectRatio }"
    >
        <div
            v-if="props.platform === 'facebook' && effectiveControlMode === 'facebook-sdk'"
            ref="fbContainer"
            class="absolute inset-0 "
        />
        <iframe
            v-if="shouldRenderIframe && !(props.platform === 'facebook' && effectiveControlMode === 'facebook-sdk')"
            :key="iframeKey"
            class="absolute top-0 left-0 w-full h-full"
            :src="iframeSrc"
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
