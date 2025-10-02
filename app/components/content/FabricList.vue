<script setup lang="ts">
const { data: fabrics } = await useAsyncData('fabrics', () => queryCollection('fabrics').select('nameTh', 'imageUrl', 'popupImageUrl', 'order').order('order', 'ASC').all());
</script>
<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <FabricCard v-for="fabric in fabrics" :key="fabric.nameTh" :name="fabric.nameTh" :image-url="fabric.imageUrl" :popup-image-url="fabric.popupImageUrl" />
    </div>
</template>
