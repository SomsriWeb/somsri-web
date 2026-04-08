export default defineNuxtRouteMiddleware((to) => {
    // Keep existing URL scheme working:
    // - English: /en or *-en (with optional trailing slash)
    // - Thai: everything else
    const path = (to.path || '').toLowerCase();
    const isEn = path === '/en' || /-en\/?$/.test(path);

    // NOTE: `useI18n()` is a Vue composable and must run in component setup.
    // In route middleware, use the Nuxt-injected i18n instance instead.
    const i18n = useNuxtApp().$i18n;
    const target = isEn ? 'en' : 'th';

    if (i18n?.locale?.value !== target) {
        // Avoid navigation side effects during SSR/prerender.
        i18n.locale.value = target;
    }
});

