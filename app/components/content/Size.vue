<script setup>
import ProseH1 from "./ProseH1.vue";
</script>
<template>
  <div class="grid grid-rows-1 gap-2 justify-center">
    
    <ProseH1 class="text-center bg-primary text-white rounded-2xl p-3"
      >ขนาดเสื้อ</ProseH1
    >
    <img
      src="/size/male.jpg"
      alt=""
      class="w-full max-w-md h-auto object-contain rounded-2xl"
    />
    <img
      src="/size/female.jpg"
      alt=""
      class="w-full max-w-md h-auto object-contain rounded-2xl shadow-md"
    />
  </div>
</template>
