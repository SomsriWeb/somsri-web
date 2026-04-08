<script lang="ts" setup>
const { proxy } = useScriptGoogleAnalytics();
const { proxy: metaPixel } = useScriptMetaPixel();

// VARIABLE
const config = useRuntimeConfig();
const { locale } = useI18n();

useHead({
    htmlAttrs: {
        lang: computed(() => (locale.value === 'en' ? 'en' : 'th')),
    },
});

if (config.env === 'production') {
    // RUN GTAG
    proxy.gtag('js', new Date());
    proxy.gtag('config', config.public.scripts.googleAnalytics.id);

    // RUN META PIXEL
    metaPixel.fbq('init', config.public.scripts.metaPixel.id);
    metaPixel.fbq('track', 'PageView');
}
</script>
<template>
    <UApp>
        <NuxtPage />
        <!-- BLOCK PURGE  -->
        <div class="space-y-5" />
    </UApp>
</template>
