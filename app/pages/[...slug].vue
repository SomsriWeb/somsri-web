<script setup lang="ts">
import type AlertLineHack from '~/components/content/AlertLineHack.vue';
import { LANGUAGE } from '~/lib/language';
import { LINE_LINK } from '~/lib/lineLink';
import { USE_FOOTER } from '~/lib/useFooter';
import { USE_LINE_FLOATING_BUTTON } from '~/lib/useLineFloatingButton';
import { USE_NAVBAR } from '~/lib/useNavbar';
import BackToTop from '~/components/content/BackToTop.vue';

const route = useRoute();
const pageType = ref<'page' | 'blog'>('page');
const contentRendererClass = computed(() => (page.value?.contentSpacing === false ? '' : 'space-y-8'));

const { data: page } = await useAsyncData('page-' + route.path, async () => {
    let data = await queryCollection('content').path(route.path).first();

    if (!data) {
        data = await queryCollection('blog').path(route.path).first();
    }

    return data;
});

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

// ASSING BLOG PAGE TYPE
if (page.value.id.startsWith('blog')) {
    pageType.value = 'blog';
}

provide(LINE_LINK, page.value.lineLink);
provide(USE_NAVBAR, page.value.navbar);
provide(USE_FOOTER, page.value.footer);
provide(USE_LINE_FLOATING_BUTTON, page.value.lineFloatingButton);
provide(LANGUAGE, page.value.language || 'th');
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
