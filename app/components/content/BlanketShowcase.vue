<script setup lang="ts">
// VARIABLE
const showcases = [
    {
        id: '1',
        image: '/blanket/showcases/blanket-1.png',
        alt: 'ตัวอย่างผ้าห่ม',
    },
    {
        id: '2',
        image: '/blanket/showcases/blanket-2.png',
        alt: 'ตัวอย่างผ้าห่ม',
    },
    {
        id: '3',
        image: '/blanket/showcases/blanket-3.png',
        alt: 'ตัวอย่างผ้าห่ม',
    },
    {
        id: '4',
        image: '/blanket/showcases/blanket-4.png',
        alt: 'ตัวอย่างผ้าห่ม',
    },
    {
        id: '5',
        image: '/blanket/showcases/blanket-5.png',
        alt: 'ตัวอย่างผ้าห่ม',
    },
];
</script>

<template>
    <!-- ใช้ grid แทน swiper -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        <HomePortfolioCard v-for="showcase in showcases" :key="showcase.id" name="" url="" :image="showcase.image" :alt="showcase.alt" />
    </div>
</template>
