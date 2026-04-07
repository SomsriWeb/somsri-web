<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

// VARIABLE
const { data: priceTabData } = await useAsyncData(`priceTab`, () => queryCollection('priceTab').order('order', 'ASC').all());
const activeTab = ref<string>(priceTabData.value?.[0]?.uid ?? '');

function tabName(tab: { name: string; 'name-en'?: string }) {
    return lang.value === 'en' && tab['name-en'] ? tab['name-en'] : tab.name;
}

interface Slots {
    /**
     * ข้อความหัวข้อ รายละเอียด (แสดงผลเป็น H2)
     */
    title(): unknown;
}
defineSlots<Slots>();

</script>
<template>
    <div class="flex flex-col items-center">
        <ProseH2 v-if="$slots.title" class="mb-2"><slot name="title" mdc-unwrap="p" /></ProseH2>
        <div class="border-2 border-primary rounded-lg p-2 max-w-[30rem]">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto mb-2">
                <UButton v-for="tab in priceTabData" :key="tab.uid" :variant="activeTab === tab.uid ? 'solid' : 'outline'" class="!min-w-fit" @click="activeTab = tab.uid">
                    {{ tabName(tab) }}
                </UButton>
            </div>
            <ProseImg v-for="tab in priceTabData" :key="tab.uid" :src="tab.imageUrl" :alt="tabName(tab)" class="rounded-lg" :class="[activeTab === tab.uid ? 'block' : 'hidden']" />
        </div>
    </div>
</template>