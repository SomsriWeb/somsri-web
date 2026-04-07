<script setup lang="ts">
import type { ProductTypeIdEnum } from '~/types/global';
import { LANGUAGE } from '~/lib/language';

// PROPS
interface Props {
    /**
     * ประเภทของสินค้า
     */
    type: ProductTypeIdEnum;
}
const { type } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

// VARIABLE
const { data } = await useAsyncData('fabrics', () => {
    return queryCollection('fabrics').order('nameEn', 'ASC').all();
});

// COMPUTED
const fabrics = computed(() => {
    return (data.value || []).filter((fabric) => fabric.forProductType?.includes(type));
});

function recommendText(fabric: { recommendForStyle: string; recommendForStyleEn?: string }) {
    if (lang.value === 'en') return fabric.recommendForStyleEn || fabric.recommendForStyle;
    return fabric.recommendForStyle;
}

function advantageList(fabric: { advantage: string[]; advantageEn?: string[] }) {
    if (lang.value === 'en') return fabric.advantageEn?.length ? fabric.advantageEn : fabric.advantage;
    return fabric.advantage;
}
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="fabric in fabrics" :key="fabric.id" class="">
            <div class="aspect-square w-full overflow-hidden rounded-lg mb-2 bg-stone-100">
                <ProseImg :src="fabric.imageUrl" :alt="fabric.nameEn" class="h-full! w-full! object-cover!" />
            </div>

            <!-- หัวข้อ -->
            <h3 class="text-lg uppercase text-black font-medium leading-tight break-words">
                {{ fabric.nameEn }}
            </h3>

            <!-- คำอธิบาย (เทา) -->
            <p class="text-stone-500 text-sm leading-snug break-words mb-2">
                {{ lang === 'en' ? 'Recommended for' : 'สำหรับทำ' }} {{ recommendText(fabric) }}
            </p>

            <!-- รายการ (แดง) -->
            <ul class="list-disc list-inside font-light text-primary space-y-1">
                <li v-for="advantage in advantageList(fabric)" :key="advantage" class="text-sm leading-snug break-words">
                    {{ advantage }}
                </li>
            </ul>
        </div>
    </div>
</template>
