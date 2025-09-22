<script setup lang="ts">
//PROPS
interface Props {
    lang?: 'th' | 'en';
}
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

// VARIABLE
const { data: products } = await useAsyncData('products', () => queryCollection('product').where('name', 'NOT LIKE', 'หมวก').order('order', 'ASC').all());
</script>

<template>
    <section>
        <ProseH2 class="text-5xl mb-5">สินค้าของเรา</ProseH2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <NuxtLink v-for="(item, index) in products" :key="index" :to="item.url">
                <Card class="shadow hover:scale-105 transition duration-300">
                    <ProseImg :src="item.image" :alt="item.alt" class="aspect-square object-cover rounded-lg" />
                    <ProseH3 class="text-4xl text-center">{{ lang === 'th' ? item.name : item['name-en'] }}</ProseH3>
                    <NuxtLink :to="item.url">
                        <UButton class="w-full"><slot name="cta-text" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">รายละเอียด</slot></UButton></NuxtLink
                    >
                </Card>
            </NuxtLink>
        </div>
    </section>
</template>
