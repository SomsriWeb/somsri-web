<script setup lang="ts">
const { data: polo } = await useAsyncData("polo", () =>
  queryCollection("PoloProduct").order("order", "ASC").all()
);
</script>

<template>
  <section class="pt-5 pb-10 bg-primary">
    <h2 class="text-white text-1xl md:text-3xl font-bold text-center mb-2 m-0">
      เนื้อผ้าและคุณสมบัติพิเศษ
    </h2>
    <div class="grid grid-rows-1 gap-2 bg-primary px-30 ">
      <div class="bg-white rounded-3xl" >
        <div
          v-for="(item, index) in polo"
          :key="index"
          class="flex flex-col items-center bg-white pb-10 rounded-3xl "
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-120 h-50 object-contain"
          />
        </div>
      </div>
    </div>
    
  </section>
</template>
