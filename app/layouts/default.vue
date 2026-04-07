<script setup lang="ts">
import BackToTop from '~/components/content/BackToTop.vue';
import { LANGUAGE } from '~/lib/language';
import { USE_FOOTER } from '~/lib/useFooter';
import { USE_NAVBAR } from '~/lib/useNavbar';

const useNavbar = inject(USE_NAVBAR, true);
const useFooter = inject(USE_FOOTER, true);

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
        <Navbar v-if="useNavbar" class="fixed top-0 left-0 right-0 z-50" />
        <slot />
        <BackToTop />
        <Footer v-if="useFooter" />
    </div>
</template>
