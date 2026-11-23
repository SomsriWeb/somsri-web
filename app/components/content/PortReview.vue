<script setup lang="ts">
import ProseH2 from './ProseH2.vue';
// SLOTS
interface Slots {
    /**
     * หัวข้อ
     */
     othertitle(): unknown;
}
defineSlots<Slots>();

// TYPES
interface ReviewItem {
    image: string;
    alt: string;
    'alt-en'?: string;
    order: number;
}

const { t, locale } = useI18n({ useScope: 'local' });
const altOf = (review: ReviewItem) => (locale.value === 'en' ? (review['alt-en'] ?? review.alt) : review.alt);

// VARIABLE
const { data: reviews } = await useAsyncData('data-portfolio-reviews', () => {
    return queryCollection('portfolioReview' as any).order('order' as any, 'ASC').all() as Promise<ReviewItem[]>;
});

const config = useRuntimeConfig();
const siteUrl = (config.public as any)?.site?.url || 'https://somsritshirt.com';

// Structured data for Review aggregation
const reviewStructuredData = computed(() => {
    if (!reviews.value || reviews.value.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: t('brand'),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: reviews.value.length.toString(),
            bestRating: '5',
            worstRating: '5',
        },
        review: reviews.value.map((review, index) => ({
            '@type': 'Review',
            '@id': `${siteUrl}/review/${index + 1}`,
            author: {
                '@type': 'Person',
                name: t('customer'),
            },
            reviewBody: altOf(review) || t('customerReview'),
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '5',
            },
            image: review.image.startsWith('http') ? review.image : `${siteUrl}${review.image}`,
        })),
    };
});

// Add structured data to head
useHead({
    script: [
        reviewStructuredData.value
            ? {
                  type: 'application/ld+json',
                  children: JSON.stringify(reviewStructuredData.value),
              }
            : null,
    ].filter(Boolean),
});
</script>

<i18n lang="json">
{
    "th": {
        "brand": "สมศรีมีเสื้อ",
        "customer": "ลูกค้า",
        "customerReview": "รีวิวจากลูกค้า",
        "carouselLabel": "รีวิวจากลูกค้า ทั้งหมด {count} รีวิว"
    },
    "en": {
        "brand": "SomsriTshirt",
        "customer": "Customer",
        "customerReview": "Customer review",
        "carouselLabel": "Customer reviews, {count} in total"
    }
}
</i18n>

<template>
    <section aria-labelledby="reviews-heading">
        <ProseH2 id="reviews-heading" class="text-start text-5xl font-bold text-primary mb-3">
            <slot mdc-unwrap="p" name="othertitle" />
        </ProseH2>

        <UCarousel
            v-slot="{ item }"
            :items="reviews"
            loop
            dots
            :autoplay="{ delay: 3000 }"
            :ui="{
                item: 'ps-4 sm:basis-1/1 md:basis-1/2 lg:basis-1/3',
                dot: 'bg-stone-200 shadow-md data-[state=active]:bg-primary'
            }"
            class="w-full"
            role="region"
            :aria-label="t('carouselLabel', { count: reviews?.length || 0 })"
        >
            <article class="relative rounded-xl overflow-hidden w-full" role="article">
                <ProseImg
                    :src="item.image"
                    :alt="altOf(item) || t('customerReview')"
                    :title="altOf(item) || t('customerReview')"
                    class="w-full h-auto object-cover rounded-xl"
                    sizes="sm:400px md:500px lg:600px"
                    loading="lazy"
                    decoding="async"
                />
            </article>
        </UCarousel>
    </section>
</template>

