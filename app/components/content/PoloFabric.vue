<script setup lang="ts">
const { data: fabrics } = await useAsyncData("fabrics", () =>
  queryCollection("fabric")
    .where("order", "in", [12,7,4,10,2])
    .order("order", "ASC")
    .all()
);
</script>
 
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
    <FabricCard
      v-for="fabric in fabrics"
      :key="fabric.name"
      :name="fabric.name"
      :image-url="fabric.imgUrl"
      :popup-image-url="fabric.popupImageUrl"
    />
  </div>
</template>