<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';

type ProductRow = {
    name: string;
    'name-en': string;
    image: string;
    url: string;
    alt?: string;
    'alt-en'?: string;
};

// PROPS
interface Props {
    /**
     * ถ้าส่งมา จะ override ภาษาจาก i18n
     */
    lang?: 'th' | 'en';
}
const props = defineProps<Props>();
const { locale } = useI18n();
const effectiveLang = computed<'th' | 'en'>(() => props.lang ?? (locale.value === 'en' ? 'en' : 'th'));

function productCardBindings(p: ProductRow) {
    return {
        name: effectiveLang.value === 'th' ? p.name : p['name-en'],
        url: p.url,
        image: p.image,
        alt: effectiveLang.value === 'th' ? p.alt : p['alt-en'],
        lang: effectiveLang.value,
    };
}

const { data: products } = await useAsyncData('data-products', () => {
    return queryCollection('product').where('featured', '=', true).order('order', 'ASC').all();
});

const featuredList = computed<ProductRow[]>(() => (products.value ?? []) as ProductRow[]);

const cardsGridRef = ref<HTMLElement | null>(null);

/** แต่ละ HomeProductCard เป็นลูกตรงของ grid — stagger ทีละใบ */
useScrollRevealUp(cardsGridRef, {
    childSelector: ':scope > *',
    start: 'top 75%',
    duration: 0.75,
    stagger: 0.14,
    y: 40,
});
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <template v-if="featuredList.length">
            <!-- มือถือ: แคโรเซล 1 สไลด์ — ตั้งแต่ sm ขึ้นไปใช้ grid -->
            <Carousel
                class="mb-5 sm:hidden"
                :items-data="featuredList"
                :slides-per-view="1"
                :space-between="20"
                :loop="featuredList.length > 1"
                :show-navigation="featuredList.length > 1"
                breakpoints-preset="simple"
                breakpoints-base="container"
                container-class="w-full max-w-full"
                :reveal-on-scroll="false"
            >
                <template #default="{ item }">
                    <HomeProductCard v-bind="productCardBindings(item as ProductRow)">
                        <template #cta-text>
                            <slot name="cta-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">{{ $t('common.learnMore') }}</slot>
                        </template>
                    </HomeProductCard>
                </template>
            </Carousel>

            <div
                ref="cardsGridRef"
                class="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-10 mb-5"
            >
                <HomeProductCard v-for="product in featuredList" :key="product.name" v-bind="productCardBindings(product)">
                    <template #cta-text>
                        <slot name="cta-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">{{ $t('common.learnMore') }}</slot>
                    </template>
                </HomeProductCard>
            </div>
        </template>

        <div class="flex justify-end">
            <NuxtLink to="/product-type">
                <UButton color="neutral" variant="outline" class="rounded-full" trailing-icon="lucide:chevron-right">
                    <slot name="other-product-button-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">{{ $t('common.viewMoreProducts') }}</slot></UButton
                >
            </NuxtLink>
        </div>
    </div>
</template>
