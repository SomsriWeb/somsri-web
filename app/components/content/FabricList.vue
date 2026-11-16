<script setup lang="ts">
const { locale } = useI18n();
const { data: fabrics } = await useAsyncData('fabrics', () => queryCollection('fabrics').select('nameTh', 'nameEn', 'imageUrl', 'popupImageUrl', 'order').order('order', 'ASC').all());
</script>
<template>
    <div class="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <FabricCard
            v-for="fabric in fabrics"
            :key="fabric.nameTh"
            class="min-w-0"
            :name="locale === 'en' ? fabric.nameEn : fabric.nameTh"
            :image-url="fabric.imageUrl"
            :popup-image-url="fabric.popupImageUrl"
        />
    </div>
</template>
