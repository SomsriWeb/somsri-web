<script setup lang="ts">
// VARIABLE
const showcases = [
    {
        id: '1',
        image: 'https://storage.googleapis.com/somsri-web/hawaiian-shirt/showcases/hawaiian-1.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
    },
    {
        id: '2',
        image: 'https://storage.googleapis.com/somsri-web/hawaiian-shirt/showcases/hawaiian-2.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
    },
    {
        id: '3',
        image: 'https://storage.googleapis.com/somsri-web/hawaiian-shirt/showcases/hawaiian-3.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
    },
    {
        id: '4',
        image: 'https://storage.googleapis.com/somsri-web/hawaiian-shirt/showcases/hawaiian-4.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
    },
    {
        id: '5',
        image: 'https://storage.googleapis.com/somsri-web/hawaiian-shirt/showcases/hawaiian-5.png',
        alt: 'ตัวอย่างเสื้อฮาวาย',
    },
];
</script>

<template>
    <!-- ใช้ grid แทน swiper -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        <HomePortfolioCard v-for="showcase in showcases" :key="showcase.id" name="" url="" :image="showcase.image" :alt="showcase.alt" />
    </div>
</template>
