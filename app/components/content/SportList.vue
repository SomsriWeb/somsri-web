<script setup lang="ts">
const { data: fabrics } = await useAsyncData("fabrics", () =>
  queryCollection("fabric")
    .where("order", "in", [12, 7])
    .order("order", "ASC")
    .all()
);
</script>

<template>
  <div class="flex justify-center p-5">
   <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 px-2 w-100 max-w-lg">
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