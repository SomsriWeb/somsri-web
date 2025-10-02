<script lang="ts" setup>
const { proxy } = useScriptGoogleAnalytics();

// VARIABLE
const config = useRuntimeConfig();
// RUN GTAG
if (config.env === 'production') {
    proxy.gtag('js', new Date());
    proxy.gtag('config', config.public.scripts.googleAnalytics.id);
}
</script>
<template>
    <UApp>
        <NuxtPage />
        <!-- BLOCK PURGE  -->
        <div class="space-y-5" />
    </UApp>
</template>
