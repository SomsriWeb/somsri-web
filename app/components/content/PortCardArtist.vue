<script setup>
const items = [
  {
    name: 'Tattoo Colour',
    method: 'รีดร้อน DFT',
    image: 'product/totebag.jpg',
  },
  {
    name: 'Bonnadol',
    method: 'สกรีนฮาฟโทน',
    image: 'product/totebag.jpg',
  },
  {
    name: 'Polycat',
    method: 'สกรีน',
    image: 'product/totebag.jpg',
  },
  {
    name: 'Kongthapengfa',
    method: 'รีดร้อน DFT',
    image: 'product/totebag.jpg',
  },
  {
    name: 'YINWAR',
    method: 'ปัก',
    image: 'product/totebag.jpg',
  },
    {
    name: 'Jorin',
    method: 'รีดร้อน DFT',
    image: 'product/totebag.jpg',
  },
  {
    name: 'Nerd Out',
    method: 'สกรีนงานเม็ด',
    image: 'product/totebag.jpg',
  },
  {
    name: 'smallroom',
    method: 'สกรีน DTG',
    image: 'product/totebag.jpg',
  },
  {
    name: 'CHARLOTTE',
    method: 'สกรีน',
    image: 'product/totebag.jpg',
  },
  {
    name: 'BIG DRAGON',
    method: 'สกรีน',
    image: 'product/totebag.jpg',
  },
]
</script>

<template>
  <div class="">
    <div class="grid grid-cols-5 gap-6">
      <div
        v-for="item in items"
        :key="item.name"
        class="flex flex-col items-center text-center"
      >
        <img
          :src="item.image"
          alt=""
          class="w-3xl px-3 h-auto object-cover rounded-xl"
        />
        <h3 class="text-base sm:text-lg font-semibold text-primary mt-3">
          {{ item.name }}
        </h3>
        <p class="text-sm text-primary mt-1">• {{ item.method }}</p>
      </div>
    </div>
  </div>
</template>