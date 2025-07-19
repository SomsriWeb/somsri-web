<script setup lang="ts">
import ProseH1 from './ProseH1.vue';
import ProseP from './ProseP.vue';

const { data: databrand } = await useAsyncData(`databrand`, () => {
  return queryCollection("brandService").order("order", "ASC").all();
});
</script>

<!--Component ส่วน Oursurvice หน้า brand -->
<template>
  <div class="px-4 py-10">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
    >
      <div
        v-for="item in databrand"
        :key="item.name"
        class="flex flex-col items-center text-center"
      >
        <div class="w-[160px] sm:w-[180px]">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
          />
        </div>
        <ProseH1 class="text-base sm:text-lg font-semibold text-primary mt-3">
          {{ item.name }}
        </ProseH1>
        <ProseP class="text-sm text-primary mt-1">• {{ item.method }}</ProseP>
      </div>
    </div>
  </div>
</template>
