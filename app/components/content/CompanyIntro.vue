<script setup lang="ts">
const imgs = [
  "/pants/cut2.jpg",
  "/pants/screen3.jpg",
  "/pants/screen4.jpg",
  "/pants/screen5.jpg",
  "/pants/screen6.jpg",
];
</script>
<template>
  <!-- Section ข้อความ -->
  <section class="flex flex-col items-center text-center px-4 py-10">
    <h1
      class="text-primary text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
    >
      COMPANY INTRODUCTION
    </h1>
    <h2
      class="text-primary text-xl sm:text-2xl md:text-3xl font-bold mb-4 flex justify-center items-center gap-2"
    >
      <Icon name="lucide:shirt" class="text-primary w-6 h-6" />
      บริษัท สมศรี การ์เมนท์ จำกัด
    </h2>
    <p class="text-sm sm:text-base max-w-3xl">
      <slot name="company-description" mdc-unwrap="p" />
    </p>
  </section>

  <!--รูป-->

  <Vue3Marquee class="rounded-xl" :duration="40">
    <img
      v-for="img in imgs"
      :key="img"
      :src="img"
      class="max-h-[17rem] object-cover"
    />
  </Vue3Marquee>
</template>
