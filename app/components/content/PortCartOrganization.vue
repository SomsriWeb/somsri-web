<script setup>
const items = [
  {
    name: 'Flash Express',
    method: 'พิมพ์ sublimation',
    image: 'home/portfolio/1.jpg',
  },
  {
    name: 'Casper',
    method: 'พิมพ์ sublimation',
    image: 'home/portfolio/2.jpg',
  },
  {
    name: 'Builder Smart',
    method: 'สกรีน',
    image: 'home/portfolio/3.jpg',
  },
  {
    name: 'Maxxis',
    method: 'สกรีน',
    image: 'home/portfolio/4.jpg',
  },
  {
    name: 'QUASAR',
    method: 'ปักทรานเฟอร์',
    image: 'home/portfolio/5.jpg',
  },
    {
    name: 'PR FOODLAND',
    method: 'สกรีนสียาง',
    image: 'home/portfolio/6.jpg',
  },
  {
    name: 'LEAO TIRE',
    method: 'พิมพ์ sublimation',
    image: 'home/portfolio/7.jpg',
  },
  {
    name: 'Gelplus Pro',
    method: 'สกรีน',
    image: 'home/portfolio/2.jpg',
  },
  {
    name: 'HONDA',
    method: 'พิมพ์ sublimation',
    image: 'home/portfolio/2.jpg',
  },
  {
    name: 'SOMPO',
    method: 'ปัก',
    image: 'home/portfolio/2.jpg',
  },
    {
    name: 'กฤษณวัจน์',
    method: 'ปักทรานเฟอร์',
    image: 'home/portfolio/2.jpg',
  },
]
</script>

<template>
  <div class="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center"
    >
      <div
        v-for="item in items"
        :key="item.name"
        class="flex flex-col items-center text-center"
      >
        <!-- กล่องรูป -->
        <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-md">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- ข้อความ -->
        <h3 class="text-base sm:text-lg font-semibold text-primary mt-3">
          {{ item.name }}
        </h3>
        <p class="text-sm text-primary mt-1">• {{ item.method }}</p>
      </div>
    </div>
  </div>
</template>