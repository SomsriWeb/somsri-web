<script setup lang="ts">
// TYPES
interface SocialItem {
    label: string;
    'label-en'?: string;
    label2?: string;
    icon?: string;
    order: number;
    url?: string;
}

// VARIABLE
const { data } = useAsyncData('social', () =>
    queryCollection('social' as any).order('order' as any, 'ASC').all() as Promise<SocialItem[]>,
);

const { t, locale } = useI18n({ useScope: 'local' });
const labelOf = (item: SocialItem) => (locale.value === 'en' ? (item['label-en'] ?? item.label) : item.label);

const config = useRuntimeConfig();
const siteUrl = (config.public as any)?.site?.url || 'https://somsritshirt.com';

// Structured data for Organization with sameAs (social media links)
const socialStructuredData = computed(() => {
    if (!data.value || data.value.length === 0) return null;

    const sameAs = data.value
        .map((item) => item.url)
        .filter((url): url is string => !!url);

    if (sameAs.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: t('brand'),
        url: siteUrl,
        sameAs: sameAs,
        logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/og.jpg`,
        },
    };
});

// Add structured data to head
useHead({
    script: [
        socialStructuredData.value
            ? {
                  type: 'application/ld+json',
                  children: JSON.stringify(socialStructuredData.value),
              }
            : null,
    ].filter(Boolean),
});
</script>

<i18n lang="json">
{
    "th": {
        "brand": "สมศรีมีเสื้อ",
        "navLabel": "ช่องทางการติดต่อผ่าน Social Media",
        "followUs": "ติดตามเราผ่าน {label}"
    },
    "en": {
        "brand": "SomsriTshirt",
        "navLabel": "Contact us on social media",
        "followUs": "Follow us on {label}"
    }
}
</i18n>

<template>
    <nav class="grid grid-cols-2 md:grid-cols-3 gap-4" :aria-label="t('navLabel')">
        <a
            v-for="item in data"
            :key="item.label"
            :href="item.url || '#'"
            :target="item.url ? '_blank' : undefined"
            :rel="item.url ? 'noopener noreferrer' : undefined"
            class="grid grid-cols-[auto_1fr] items-center gap-3 hover:opacity-80 transition-opacity"
            :aria-label="t('followUs', { label: `${labelOf(item)}${item.label2 ? ` - ${item.label2}` : ''}` })"
        >
            <div class="w-12 h-12 flex items-center justify-center" aria-hidden="true">
                <Icon
                    v-if="item.icon"
                    :name="item.icon"
                    class="w-full h-full text-primary"
                />
            </div>
            <div class="grid grid-cols-1">
                <p class="font-bold text-primary text-sm md:text-base leading-tight">
                    {{ labelOf(item) }}
                </p>
                <p v-if="item.label2" class="font-bold text-primary text-sm md:text-base leading-tight">
                    {{ item.label2 }}
                </p>
            </div>
        </a>
    </nav>
</template>

