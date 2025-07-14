<script setup lang="ts"></script>

<template>

  <!-- ข้อความข้างล่าง -->
  <div div class="px-[4.6rem] py-[3rem]">
    <h2 class="text-2xl font-bold mb-8 text-start text-primary">
      เลือกผ้าแบบไหนให้เหมาะกับแบรนด์คุณ
    </h2>
    <p class="text-stone-500 text-start"><slot name="products" /></p>
  </div>

  <!-- ปุ่มๆๆๆๆๆ -->
   
  <div class="flex justify-center m-5">
    <nuxt-link to="/fabric-specification">
    <UButton
      class="relative inline-flex rounded-lg px-4 py-2 text-white bg-primary hover:bg-primary-50 cursor-pointer"
      >เนื้อผ้าและคุณสมบัติ</UButton
    >
    </nuxt-link>
  </div>
</template>
