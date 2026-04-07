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
/** id คงที่ต่อ instance — ใช้ useId แทน Math.random() เพื่อ SSR/hydration */
const fbPlayerId = `fb-video-${useId().replace(/[^\w-]/g, '')}`;
const fbSdkFailed = ref(false);
/** เก็บ handler เดิมเพื่อ unsubscribe ก่อน init ซ้ำ / unmount */
let xfbmlReadyHandler: ((msg: any) => void) | null = null;

const effectiveControlMode = computed<'src' | 'facebook-sdk'>(() => {
    if (props.platform !== 'facebook') return 'src';
    if (props.controlMode !== 'facebook-sdk') return 'src';
    return fbSdkFailed.value ? 'src' : 'facebook-sdk';
});

/** URL หน้าวิดีโอบน Facebook (ใช้ทั้ง XFBML data-href, iframe, schema) */
const facebookPageUrl = computed(() =>
    props.videoId.includes('/') ? `https://www.facebook.com/${props.videoId}` : `https://www.facebook.com/watch/?v=${props.videoId}`,
);

function buildFacebookPluginUrl(includeAutoplay: boolean) {
    const p = new URLSearchParams();
    p.set('href', facebookPageUrl.value);
    p.set('show_text', 'false');
    p.set('width', '560');
    const wantAutoplay = includeAutoplay && (props.autoplay || props.autoplayWhenActive) && props.active;
    if (wantAutoplay) {
        p.set('autoplay', '1');
        if (props.muted || props.autoplayWhenActive) p.set('mute', '1');
    }
    return `https://www.facebook.com/plugins/video.php?${p.toString()}`;
}

/** YouTube: allowAutoplay=false = โหมด inactive (ไม่ส่ง autoplay; mute เฉพาะเมื่อ props.muted) */
function buildYoutubeEmbedUrl(allowAutoplay: boolean) {
    const shouldAutoplay = allowAutoplay && (props.autoplay || props.autoplayWhenActive) && props.active;
    const params = new URLSearchParams();
    if (shouldAutoplay) params.append('autoplay', '1');
    if (props.muted || shouldAutoplay) params.append('mute', '1');
    params.append('rel', '0');
    const qs = params.toString();
    return `https://www.youtube.com/embed/${props.videoId}${qs ? `?${qs}` : ''}`;
}

function applyFacebookPlayerAV(inst: any) {
    try {
        if (props.autoplayWhenActive) inst.mute?.();
        else if (props.muted) inst.mute?.();
        else inst.unmute?.();
        if (props.active) inst.play?.();
        else inst.pause?.();
    } catch {
        // ignore
    }
}

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
    div.setAttribute('data-href', facebookPageUrl.value);
    div.setAttribute('data-allowfullscreen', 'true');
    div.setAttribute('data-autoplay', 'false');
    div.setAttribute('data-show-text', 'false');
    // บราวเซอร์ส่วนใหญ่ “บล็อก autoplay” ถ้าไม่ mute → ถ้าต้องการเล่นอัตโนมัติเมื่อ active ให้ force mute
    div.setAttribute('data-mute', props.autoplayWhenActive ? 'true' : props.muted ? 'true' : 'false');
    div.setAttribute('data-width', '560');
    fbContainer.value.appendChild(div);

    if (xfbmlReadyHandler) {
        try {
            FB.Event?.unsubscribe?.('xfbml.ready', xfbmlReadyHandler);
        } catch {
            // ignore
        }
        xfbmlReadyHandler = null;
    }

    xfbmlReadyHandler = (msg: any) => {
        if (msg?.type !== 'video') return;
        if (msg?.id !== fbPlayerId) return;
        fbPlayer.value = msg.instance;
        fbReady.value = true;
        applyFacebookPlayerAV(msg.instance);
    };
    FB.Event.subscribe('xfbml.ready', xfbmlReadyHandler);

    FB.XFBML?.parse?.(fbContainer.value);
}

const embedUrl = computed(() =>
    props.platform === 'facebook' ? buildFacebookPluginUrl(true) : buildYoutubeEmbedUrl(true),
);

/** ไม่ autoplay — สไลด์ข้างๆ / JSON-LD */
const inactiveEmbedUrl = computed(() =>
    props.platform === 'facebook' ? buildFacebookPluginUrl(false) : buildYoutubeEmbedUrl(false),
);

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
    () => ({
        videoId: props.videoId,
        platform: props.platform,
        controlMode: props.controlMode,
        active: props.active,
        autoplayWhenActive: props.autoplayWhenActive,
        muted: props.muted,
    }),
    async (curr, prev) => {
        if (props.platform !== 'facebook') return;
        if (effectiveControlMode.value !== 'facebook-sdk') return;
        const identityChanged =
            !prev ||
            prev.videoId !== curr.videoId ||
            prev.platform !== curr.platform ||
            prev.controlMode !== curr.controlMode;
        // เปลี่ยนคลิป / โหมด → ต้อง parse XFBML ใหม่ (ก่อนหน้านี้แค่สั่ง play บน instance เก่า)
        if (identityChanged) {
            await initFacebookPlayer();
            return;
        }
        if (!fbReady.value) await initFacebookPlayer();
        const inst = fbPlayer.value;
        if (!inst) return;
        applyFacebookPlayerAV(inst);
    },
    { flush: 'post' },
);

onMounted(() => {
    if (props.platform === 'facebook' && effectiveControlMode.value === 'facebook-sdk') {
        initFacebookPlayer();
    }
});

onBeforeUnmount(() => {
    const FB = typeof window !== 'undefined' ? window.FB : null;
    if (xfbmlReadyHandler && FB?.Event?.unsubscribe) {
        try {
            FB.Event.unsubscribe('xfbml.ready', xfbmlReadyHandler);
        } catch {
            // ignore
        }
    }
    xfbmlReadyHandler = null;
    fbPlayer.value = null;
    fbReady.value = false;
    if (fbContainer.value) fbContainer.value.innerHTML = '';
});

const videoUrl = computed(() =>
    props.platform === 'facebook' ? facebookPageUrl.value : `https://www.youtube.com/watch?v=${props.videoId}`,
);

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

// Structured data for VideoObject (embedUrl คงที่ — ไม่ผูกกับ active เพื่อไม่ให้ JSON-LD เปลี่ยนตามสไลด์)
const videoStructuredData = computed(() => {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${siteUrl}/video/${encodeURIComponent(props.videoId)}`,
        name: props.title,
        description: props.description || props.title,
        thumbnailUrl: thumbnailUrl.value,
        contentUrl: videoUrl.value,
        embedUrl: inactiveEmbedUrl.value,
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

useHead(() => {
    if (!props.videoId) return {};
    return {
        script: [
            {
                key: `prose-video-ld-${fbPlayerId}`,
                type: 'application/ld+json',
                children: JSON.stringify(videoStructuredData.value),
            },
        ],
    };
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
