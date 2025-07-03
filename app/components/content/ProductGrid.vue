<template>
  <section class="max-w-4xl mx-auto py-5 px-4">
    <h2 class="text-2xl font-bold mb-5 text-center">สินค้าของเรา</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="(item, index) in products"
        :key="index"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full h-auto rounded mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
        <button
          class="bg-primary-400 text-white px-4 py-2 rounded shadow hover:bg-primary-500"
        >
          รายละเอียด
        </button>
      </div>
    </div>
  </section>

  <!-- ข้อความข้างล่าง -->

  <div div class="px-[4.6rem] py-[3rem]">
    <h2 class="text-2xl font-bold mb-8 text-start text-primary">
      เลือกผ้าแบบไหนให้เหมาะกับแบรนด์คุณ
    </h2>
    <p class="text-stone-500 text-start"><slot name="products" /></p>
  </div>

  <!-- ปุ่มๆๆๆๆๆ -->
  <div class="flex justify-center m-5">
    <button
      class="relative inline-flex rounded-lg px-4 py-2 text-white bg-primary hover:bg-primary-50"
    >
      เนื้อผ้าและคุณสมบัติ
      <span
        class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
      ></span>
    </button>
  </div>
</template>

<script setup>
const products = [
  { name: 'เสื้อยืด', image: 'product/tshirt.jpg' },
  { name: 'เสื้อโปโล', image: 'product/polo.jpg' },
  { name: 'เสื้อกีฬา', image: 'product/sport.png' },
  { name: 'หมวก', image: 'product/hat.png' },
  { name: 'หน้ากาก', image: 'product/mask.png' },
  { name: 'กระเป๋าผ้า', image: 'product/totebag.jpg' },
]
</script>

<style scoped></style>
