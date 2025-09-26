<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ใช้ภาษาไทยเป็นค่า default
     */
    lang?: 'th' | 'en';
}
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

const { data: products } = await useAsyncData('data-products', () => {
    return queryCollection('product').where('featured', '=', true).order('order', 'ASC').all();
});
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[2.5rem] mb-5">
            <HomeProductCard
                v-for="product in products"
                :key="product.name"
                :name="lang === 'th' ? product.name : product['name-en']"
                :url="product.url"
                :image="product.image"
                :alt="lang === 'th' ? product.alt : product['alt-en']"
                :lang="lang"
            >
                <template #cta-text>
                    <slot name="cta-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">ดูเพิ่มเติม</slot>
                </template>
            </HomeProductCard>
        </div>

        <div class="flex justify-end">
            <NuxtLink to="/product-type">
                <UButton color="neutral" variant="outline" class="rounded-full" trailing-icon="lucide:chevron-right">
                    <slot name="other-product-button-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">ดูสินค้าอื่น ๆ</slot></UButton
                >
            </NuxtLink>
        </div>
    </div>
</template>
