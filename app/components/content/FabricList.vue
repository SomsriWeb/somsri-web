<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

interface Props {
    lang?: 'th' | 'en';
}
const props = defineProps<Props>();

const LANG = inject<'th' | 'en'>(LANGUAGE, 'th');
const effectiveLang = computed(() => props.lang ?? LANG);

const { data: fabrics } = await useAsyncData('fabrics', () =>
    queryCollection('fabrics').select('uid', 'nameTh', 'nameEn', 'imageUrl', 'popupImageUrl', 'order').order('order', 'ASC').all(),
);
</script>
<template>
    <div class="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <FabricCard
            v-for="fabric in fabrics"
            :key="fabric.uid"
            class="min-w-0"
            :name="effectiveLang === 'en' ? fabric.nameEn : fabric.nameTh"
            :image-url="fabric.imageUrl"
            :popup-image-url="fabric.popupImageUrl"
        />
    </div>
</template>
