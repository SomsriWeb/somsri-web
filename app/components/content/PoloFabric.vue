<script setup lang="ts">
const { data: fabrics } = await useAsyncData("fabrics", () =>
  queryCollection("fabric")
    .where("order", "in", [12,7,4,10,2])
    .order("order", "ASC")
    .all()
);
</script>
 
<template>
  <div class="flex justify-center items-center gap-2">
    <FabricCard
      v-for="fabric in fabrics"
      :key="fabric.name"
      :name="fabric.name"
      :image-url="fabric.imgUrl"
      :popup-image-url="fabric.popupImageUrl"
    />
  </div>
</template>