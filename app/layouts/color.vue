<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

// Provided by pages; consumed by Navbar/components
const languageState = useState<'th' | 'en'>('language', () => 'th');
provide(LANGUAGE, languageState);

// Fallback: derive language from route (covers Navbar/layout-level UI)
const route = useRoute();
watchEffect(() => {
    const p = route.path || '';
    languageState.value = p === '/en' || /-en\/?$/.test(p) ? 'en' : 'th';
});
</script>

<template>
    <div>
        <Navbar class="sticky top-0 left-0 right-0 z-50" active-navbar />
        <slot class="mt-5" />
        <Footer />
    </div>
</template>
