<script setup lang="ts">
import { ProductTypeIdEnum } from '../../types/global';
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const { data } = await useAsyncData('fabrics', () =>
    queryCollection('fabrics').select('uid', 'nameTh', 'nameEn', 'imageAlt', 'imageUrl', 'popupImageUrl', 'forProductType', 'order').order('order', 'ASC').all(),
);

// COMPUTED
const fabrics = computed(() => {
    return (data.value || []).filter((fabric) => fabric.forProductType?.includes(ProductTypeIdEnum.POLO));
});
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <FabricCard
            v-for="fabric in fabrics"
            :key="fabric.uid"
            :name="lang === 'en' ? fabric.nameEn : fabric.nameTh"
            :alt="fabric.imageAlt || (lang === 'en' ? fabric.nameEn : fabric.nameTh)"
            :image-url="fabric.imageUrl"
            :popup-image-url="fabric.popupImageUrl"
            class="w-full max-w-[250px] h-auto object-contain mx-auto"
        />
    </div>
</template>
