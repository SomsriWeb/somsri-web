<script setup lang="ts">
const { data: fabrics } = await useAsyncData("fabrics", () =>
  queryCollection("fabric")
    .where("order", "in", [12,7,4,10,2])
    .order("order", "ASC")
    .all()
);
</script>
 
<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5  lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <FabricCard
      v-for="fabric in fabrics"
      :key="fabric.name"
      :name="fabric.name"
      :image-url="fabric.imgUrl"
      :popup-image-url="fabric.popupImageUrl"
      class="w-full max-w-[250px] h-auto object-contain mx-auto"
    />
  </div>
</template>