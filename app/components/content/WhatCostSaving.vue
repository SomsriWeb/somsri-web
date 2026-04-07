<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

// PROPS
interface Props {
    /**
     * เปลี่ยน Tag หัวข้อ
     * @default h2
     */
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const { titleAsTag = 'h2' } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

// SLOTS
interface Slots {
    /**
     * ข้อความในหัวข้อ
     * @default เลือก Somsri แล้วดียังไง?
     */
    title(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const { data } = await useAsyncData('what-cost-saving', () => queryCollection('whatCostSaving').order('order', 'ASC').all());

function itemLabel(item: { label: string; 'label-en'?: string }) {
    return lang.value === 'en' && item['label-en'] ? item['label-en'] : item.label;
}
</script>

<template>
    <Container class="grid grid-cols-1 py-5! sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 bg-primary" no-space>
        <component :is="titleAsTag" class="sm:col-span-2 md:col-span-full lg:col-span-1 font-bold text-white text-4xl leading-none">
            <slot name="title" mdc-unwrap="p">{{ lang === 'en' ? 'Why choose Somsri?' : 'เลือก Somsri แล้วดียังไง?' }}</slot>
        </component>

        <div v-for="item in data" :key="item.label" class="flex flex-col justify-start items-center">
            <ProseImg v-if="item.image" :src="item.image" :alt="itemLabel(item)" class="max-w-[4rem]" />
            <p class="font-bold font-stretch-condensed text-xl text-white leading-none text-center mt-3">
                {{ itemLabel(item) }}
            </p>
        </div>
    </Container>
</template>
