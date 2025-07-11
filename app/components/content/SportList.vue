<script setup lang="ts">
const { data: fabrics } = await useAsyncData("fabrics", () =>
  queryCollection("fabric")
    .where("order", "in", [12, 7])
    .order("order", "ASC")
    .all()
);
</script>

<template>
<div class="flex justify-center pb-5 bg-primary p-5 rounded-2xl">
  <div class="grid grid-cols-2 gap-2 w-[800px]">
    <FabricCard
      v-for="fabric in fabrics"
      :key="fabric.name"
      :name="fabric.name"
      :image-url="fabric.imgUrl"
      :popup-image-url="fabric.popupImageUrl"
    />
  </div>
</div>
</template>