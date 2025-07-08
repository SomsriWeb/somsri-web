<script setup lang="ts">
const { data: products } = await useAsyncData("products", () =>
  queryCollection("product").order("order", "ASC").all()
);
</script>
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
</template>

<style scoped></style>
