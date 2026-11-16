<script setup lang="ts">
import { ProductTypeIdEnum } from '../../types/global';

const { locale } = useI18n();

const { data } = await useAsyncData('fabrics', () =>
    queryCollection('fabrics').select('uid', 'nameTh', 'nameEn', 'imageAlt', 'imageAlt-en', 'imageUrl', 'popupImageUrl', 'forProductType', 'order').order('order', 'ASC').all(),
);

// COMPUTED
const fabrics = computed(() => {
    const isEn = locale.value === 'en';
    return (data.value || [])
        .filter((fabric) => fabric.forProductType?.includes(ProductTypeIdEnum.POLO))
        .map((fabric) => ({
            ...fabric,
            name: isEn ? fabric.nameEn : fabric.nameTh,
            alt: (isEn ? fabric['imageAlt-en'] : fabric.imageAlt) || (isEn ? fabric.nameEn : fabric.nameTh),
        }));
});
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <FabricCard
            v-for="fabric in fabrics"
            :key="fabric.uid"
            :name="fabric.name"
            :alt="fabric.alt"
            :image-url="fabric.imageUrl"
            :popup-image-url="fabric.popupImageUrl"
            class="w-full max-w-[250px] h-auto object-contain mx-auto"
        />
    </div>
</template>
