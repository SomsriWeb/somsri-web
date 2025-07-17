<script setup lang="ts"></script>

<template>
  <!-- ข้อความข้างล่าง -->
  <div class="px-4 sm:px-8 md:px-12 lg:px-[4.6rem] py-6 md:py-10">
    <ProseH2
      class="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-4 md:mb-8 text-start text-primary"
    >
      เลือกผ้าแบบไหนให้เหมาะกับแบรนด์คุณ
    </ProseH2>
    <ProseP class="text-sm sm:text-base md:text-lg  text-start">
      <slot name="products" mdc-unwrap="p" />
    </ProseP>
  </div>

  <!-- ปุ่ม -->
  <div class="flex justify-center my-5">
    <UButton
    
      class="relative inline-flex rounded-lg px-4 py-2 text-white text-sm sm:text-base md:text-lg bg-primary hover:bg-primary-50 cursor-pointer"
    >
      เนื้อผ้าและคุณสมบัติ
    </UButton>
  </div>
</template>
