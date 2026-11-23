<script setup lang="ts">
import type { ProductTypeIdEnum } from '~/types/global';

// PROPS
interface Props {
    /**
     * ประเภทของสินค้า
     */
    type: ProductTypeIdEnum;
}
const { type } = defineProps<Props>();

const { t, locale } = useI18n({ useScope: 'local' });

// VARIABLE
const { data } = await useAsyncData('fabrics', () => {
    return queryCollection('fabrics').order('nameEn', 'ASC').all();
});

// COMPUTED
const fabrics = computed(() => {
    const isEn = locale.value === 'en';
    return (data.value || [])
        .filter((fabric) => fabric.forProductType?.includes(type))
        .map((fabric) => ({
            ...fabric,
            recommendForStyle: isEn ? (fabric['recommendForStyle-en'] ?? fabric.recommendForStyle) : fabric.recommendForStyle,
            advantage: isEn ? (fabric['advantage-en'] ?? fabric.advantage) : fabric.advantage,
        }));
});
</script>

<i18n lang="json">
{
    "th": { "forStyle": "สำหรับทำ{style}" },
    "en": { "forStyle": "Ideal for: {style}" }
}
</i18n>

<template>
    <div class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <div v-for="fabric in fabrics" :key="fabric.id" class="min-w-0">
            <ProseImg :src="fabric.imageUrl" :alt="fabric.nameEn" class="rounded-lg mb-2" />

            <!-- หัวข้อ -->
            <h3 class="text-lg uppercase text-black font-medium w-max leading-none">
                {{ fabric.nameEn }}
            </h3>

            <!-- คำอธิบาย (เทา) -->
            <p class="text-stone-500 text-sm leading-normal w-full wrap-break-word whitespace-normal mb-1">
                {{ t('forStyle', { style: fabric.recommendForStyle }) }}
            </p>

            <!-- รายการ (แดง) -->
            <ul class="list-disc list-inside font-light text-primary space-y-1">
                <li v-for="advantage in fabric.advantage" :key="advantage" class="text-sm leading-snug wrap-break-word">
                    {{ advantage }}
                </li>
            </ul>
        </div>
    </div>
</template>
