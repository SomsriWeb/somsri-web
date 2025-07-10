<script setup lang="ts">
const props = defineProps<{
  actionLink: string
}>()
</script>
<template>
  <section class="bg-white pt-10 px-5 text-primary text-center mb-5">
    <h2 class="text-1xl md:text-4xl font-bold p-3">
      หลากเทคนิคสกรีนเลือกได้ให้ตอบโจทย์
    </h2>
    <p class="p-2">ปัก ปักทรานเฟอร์ สกรีน พิมพ์ลาย</p>
    <div class="flex justify-center items-center">
      <img src="/polo/type-1-unsmushed.png" alt="" />
    </div>
    <h2 class="text-1xl md:text-4xl font-bold p-3">ราคาเสื้อโปโล</h2>
    <div class="flex justify-center items-center">
      <img src="/polo/polo_price_01092565.jpg" alt="" />
    </div>
    <div class="flex justify-center items-center p-3">
      <img src="/polo/step-1024x543.png" alt="" />
    </div>
    <a :href="props.actionLink" target="_blank" rel="noopener">
      <UButton size="xl" color="primary" variant="solid" icon="i-lucide-send">
        สั่งทำเสื้อ
      </UButton>
    </a>
  </section>
</template>
