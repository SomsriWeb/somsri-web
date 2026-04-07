<script setup lang="ts">
import type { PriceCarouselCollectionItem } from '@nuxt/content';
import { LANGUAGE } from '~/lib/language';

interface Props {
    priceData: PriceCarouselCollectionItem;
}
const { priceData } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const displayName = computed(() => {
    const row = priceData as { name: string; 'name-en'?: string };
    return lang.value === 'en' && row['name-en'] ? row['name-en'] : row.name;
});

function conditionText(c: { text: string; 'text-en'?: string }) {
    return lang.value === 'en' && c['text-en'] ? c['text-en'] : c.text;
}
</script>
<template>
    <div>
        <ProseH2 size="sm" class="mb-2 text-center">{{ displayName }}</ProseH2>
        <ProseImg :src="priceData.imageUrl" :alt="displayName" class="mb-2" />
        <ul class="list-disc list-inside">
            <li v-for="(condition, i) in priceData.conditions" :key="i" class="text-primary leading-none">
                {{ conditionText(condition as { text: string; 'text-en'?: string }) }}
            </li>
        </ul>
    </div>
</template>
