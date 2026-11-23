<script setup lang="ts">
// VARIABLE
const { locale } = useI18n();
const showcaseItems = [
    {
        id: '1',
        image: '/hawaiian-shirt/showcases/hawaiian-1.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
        'alt-en': 'Hawaiian shirt sample',
    },
    {
        id: '2',
        image: '/hawaiian-shirt/showcases/hawaiian-2.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
        'alt-en': 'Hawaiian shirt sample',
    },
    {
        id: '3',
        image: '/hawaiian-shirt/showcases/hawaiian-3.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
        'alt-en': 'Hawaiian shirt sample',
    },
    {
        id: '4',
        image: '/hawaiian-shirt/showcases/hawaiian-4.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
        'alt-en': 'Hawaiian shirt sample',
    },
    {
        id: '5',
        image: '/hawaiian-shirt/showcases/hawaiian-5.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
        'alt-en': 'Hawaiian shirt sample',
    },
];
const showcases = computed(() =>
    showcaseItems.map((item) => ({ id: item.id, image: item.image, alt: locale.value === 'en' ? item['alt-en'] : item.alt })),
);
</script>

<template>
    <!-- ใช้ grid แทน swiper -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        <HomePortfolioCard v-for="showcase in showcases" :key="showcase.id" name="" url="" :image="showcase.image" :alt="showcase.alt" />
    </div>
</template>
