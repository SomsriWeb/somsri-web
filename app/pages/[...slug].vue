<script setup lang="ts">
import { ALTERNATE_PATH } from '~/lib/alternatePath';
import { LINE_LINK } from '~/lib/lineLink';
import { USE_FOOTER } from '~/lib/useFooter';
import { USE_LINE_FLOATING_BUTTON } from '~/lib/useLineFloatingButton';
import { USE_NAVBAR } from '~/lib/useNavbar';
import BackToTop from '~/components/content/BackToTop.vue';

const SITE_URL = useSiteConfig().url;

const route = useRoute();
const { locale } = useI18n();
const pageType = ref<'page' | 'blog'>('page');
const contentRendererClass = computed(() => (page.value?.contentSpacing === false ? '' : 'space-y-8'));

// path ของเนื้อหาโดยไม่มี prefix ภาษา เช่น /en/tshirt → /tshirt
const slug = route.params.slug;
const contentPath = '/' + (Array.isArray(slug) ? slug.join('/') : slug || '').replace(/\/$/, '');

const { data } = await useAsyncData(`page-${locale.value}-${contentPath}`, async () => {
    // ภาษาอังกฤษ: มีเฉพาะหน้าใน content/page-en/ (บทความไม่มีฉบับอังกฤษ → 404)
    if (locale.value === 'en') {
        const page = await queryCollection('contentEn').path(contentPath).first();
        const thaiVersion = page ? await queryCollection('content').path(contentPath).select('path').first() : null;
        return { page, hasThai: !!thaiVersion, hasEnglish: !!page };
    }

    let page = await queryCollection('content').path(contentPath).first();
    let englishVersion = null;

    if (page) {
        englishVersion = await queryCollection('contentEn').path(contentPath).select('path').first();
    } else {
        page = await queryCollection('blog').path(contentPath).first();
    }

    return { page, hasThai: !!page, hasEnglish: !!englishVersion };
});

const page = computed(() => data.value?.page);

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

// ASSING BLOG PAGE TYPE
if (page.value.id.startsWith('blog')) {
    pageType.value = 'blog';
}

// SEO: hreflang เฉพาะหน้าที่มีครบสองภาษา
const thaiPath = contentPath;
const englishPath = contentPath === '/' ? '/en' : `/en${contentPath}`;
const hasBothLanguages = data.value?.hasThai && data.value?.hasEnglish;

if (hasBothLanguages) {
    useHead({
        link: [
            { rel: 'alternate', hreflang: 'th', href: SITE_URL + thaiPath },
            { rel: 'alternate', hreflang: 'en', href: SITE_URL + englishPath },
            { rel: 'alternate', hreflang: 'x-default', href: SITE_URL + thaiPath },
        ],
    });
}

provide(LINE_LINK, page.value.lineLink);
provide(USE_NAVBAR, page.value.navbar);
provide(USE_FOOTER, page.value.footer);
provide(USE_LINE_FLOATING_BUTTON, page.value.lineFloatingButton);
provide(ALTERNATE_PATH, hasBothLanguages ? (locale.value === 'en' ? thaiPath : englishPath) : null);
</script>

<template>
    <div v-if="page">
        <Metadata :page="page" />
        <NuxtLayout :name="page.activeNavbar || pageType === 'blog' ? 'color' : 'default'">
            <main>
                <ContentRenderer v-if="pageType === 'page'" :class="contentRendererClass" :value="page" />

                <template v-else>
                    <BlogHeader :image="page.image" :alt="page.title">
                        <template #title>{{ page.title }}</template>
                    </BlogHeader>
                    <Container>
                        <ContentRenderer :class="contentRendererClass" :value="page" />
                    </Container>
                </template>
                <BackToTop />
            </main>
        </NuxtLayout>
    </div>
</template>
