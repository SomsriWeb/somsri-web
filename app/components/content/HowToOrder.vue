<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

interface Props {
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleCenter?: boolean;
}
const { titleAsTag = 'h2', titleCenter = false } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const { data } = await useAsyncData('how-to-order', () => queryCollection('howToOrder').order('order', 'ASC').all());

function itemLabel(item: { label: string; 'label-en'?: string }) {
    return lang.value === 'en' && item['label-en'] ? item['label-en'] : item.label;
}

function itemDescription(item: { description?: string; 'description-en'?: string }) {
    if (lang.value === 'en' && item['description-en']) return item['description-en'];
    return item.description;
}

</script>
<template>
    <div>
        <component
            :is="titleAsTag"
            class="font-bold text-[2rem] md:text-[2.5rem] leading-none text-primary font-stretch-condensed"
            :class="{ 'text-center': titleCenter }"
        >
            <slot name="title" mdc-unwrap="p">{{ lang === 'en' ? 'How to order' : 'ขั้นตอนการสั่งผลิต' }}</slot>
        </component>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            <div v-for="(item, index) in data" :key="item.label" class="flex flex-col items-center">
                <ProseImg v-if="item.image" class="max-w-12 md:max-w-20" :src="item.image" :alt="itemLabel(item)" />
                <div class="flex items-start mt-3">
                    <p class="font-bold font-stretch-condensed text-md md:text-xl bg-primary aspect-square w-5 h-5 flex items-center justify-center rounded-full text-white mr-2">
                        {{ index + 1 }}
                    </p>
                    <div>
                        <p class="font-bold font-stretch-condensed text-primary text-md md:text-xl leading-none text-center">
                            {{ itemLabel(item) }}
                        </p>
                        <p v-if="itemDescription(item)" class="text-primary text-xs leading-none text-center">
                            {{ itemDescription(item) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <ProseP v-if="lang === 'en'" class="text-primary! font-stretch-condensed font-bold! text-center text-xl mt-5">
            **We provide thorough QC and packing — quality guaranteed.**
        </ProseP>
        <ProseP v-else class="text-primary! font-stretch-condensed font-bold! text-center text-xl mt-5">
            **ทางเรามีบริการ QC & Pack อย่างดี รับประกันคุณภาพสูง**
        </ProseP>
    </div>
</template>
