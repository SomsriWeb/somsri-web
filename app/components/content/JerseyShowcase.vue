<script setup lang="ts">
// VARIABLE
const showcases = [
    {
        id: '1',
        image: '/jersey/showcase/jersey-1.png',
        alt: 'ตัวอย่างเสื้อ Jersey',
    },
    {
        id: '2',
        image: '/jersey/showcase/jersey-2.png',
        alt: 'ตัวอย่างเสื้อ Jersey',
    },
    {
        id: '3',
        image: '/jersey/showcase/jersey-3.png',
        alt: 'ตัวอย่างเสื้อ Jersey',
    },
    {
        id: '4',
        image: '/jersey/showcase/jersey-4.png',
        alt: 'ตัวอย่างเสื้อ Jersey',
    },
    {
        id: '5',
        image: '/jersey/showcase/jersey-5.png',
        alt: 'ตัวอย่างเสื้อ Jersey',
    },
];
</script>

<template>
    <!-- ใช้ grid แทน swiper -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        <HomePortfolioCard v-for="showcase in showcases" :key="showcase.id" name="" url="" :image="showcase.image" :alt="showcase.alt" />
    </div>
</template>
