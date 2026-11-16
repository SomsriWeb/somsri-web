<script setup lang="ts">
import { thead } from '#build/ui/prose';

// VARIABLE
const { data } = useAsyncData('new-hat-styles', () => queryCollection('hatStyles').order('order', 'ASC').all());

const { t, locale } = useI18n({ useScope: 'local' });

const cardUi = {
    root: 'rounded-none',
};
</script>

<i18n lang="json">
{
    "th": {
        "title": "ชนิดหมวกและตารางราคา",
        "qty": "จำนวน(ตัว)",
        "price": "ราคา(บาท)"
    },
    "en": {
        "title": "Hat Styles & Price List",
        "qty": "Qty (pcs)",
        "price": "Price (THB)"
    }
}
</i18n>
<template>
    <div>
        <slot name="title">
            <ProseH2>{{ t('title') }}</ProseH2>
        </slot>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <UCard v-for="item in data" :key="item.label" :ui="cardUi">
                <ProseImg :src="item.image" class="mb-1" />
                <h3 class="text-center text-primary text-xl">{{ locale === 'en' ? (item['label-en'] ?? item.label) : item.label }}</h3>

                <div class="overflow-x-auto">
                    <table class="w-full text-xs border-collapse min-w-[240px]">
                        <thead>
                            <tr class="border-b">
                                <th class="py-2 text-left font-semibold whitespace-nowrap">{{ t('qty') }}</th>
                                <th class="py-2 text-center font-medium px-2">100</th>
                                <th class="py-2 text-center font-medium px-2">300</th>
                                <th class="py-2 text-center font-medium px-2">500</th>
                                <th class="py-2 text-center font-bold text-primary px-2 whitespace-nowrap">1,000+</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="py-3 text-left font-semibold whitespace-nowrap">{{ t('price') }}</td>
                                <td class="py-3 text-center font-medium px-2">{{ item.priceperunit[0] }}</td>
                                <td class="py-3 text-center font-medium px-2">{{ item.priceperunit[1] }}</td>
                                <td class="py-3 text-center font-medium px-2">{{ item.priceperunit[2] }}</td>
                                <td class="py-3 text-center font-bold text-primary px-2">{{ item.priceperunit[3] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </UCard>
        </div>
    </div>
</template>
