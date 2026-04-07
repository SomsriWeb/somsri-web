<script setup lang="ts">
import type { PriceList } from '~/types/priceList';
import { LANGUAGE } from '~/lib/language';

interface Props {
    priceLists: PriceList;
}
const { priceLists } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));

const displayFabricName = computed(() => {
    if (lang.value === 'en' && priceLists.fabricNameEn) return priceLists.fabricNameEn;
    return priceLists.fabricName;
});

const copy = computed(() =>
    lang.value === 'en'
        ? {
              startingAt: 'Starting at',
              askPrice: 'Contact for quote',
              pcs: 'pcs',
              qty: 'Qty (pcs)',
          }
        : {
              startingAt: 'เริ่มต้นที่',
              askPrice: 'สอบถามราคา',
              pcs: 'ตัว',
              qty: 'จำนวน(ตัว)',
          },
);

const loopedRates = computed(() => priceLists.rates.slice(1));
</script>

<template>
    <div class="rounded-xl border-2 border-primary overflow-hidden bg-primary h-full">
        <h3 class="text-center text-white bg-primary font-bold px-1 py-0.5 text-lg">
            {{ displayFabricName }}
        </h3>
        <div class="bg-white flex flex-col gap-0.5 items-center p-1">
            <p class="text-primary">{{ copy.startingAt }}</p>
            <p class="text-primary text-5xl font-bold">
                {{ priceLists.rates[0]?.price || copy.askPrice }}
                <span v-if="priceLists.rates[0]?.price" class="text-sm text-stone-800">THB</span>
            </p>
            <p class="text-primary">({{ priceLists.rates[0]?.min }} - {{ priceLists.rates[0]?.max }} {{ copy.pcs }})</p>
        </div>
        <div class="space-y-1 text-white">
            <div v-for="rate in loopedRates" :key="rate.min" class="flex justify-between gap-3 items-center px-2 py-1">
                <div>
                    <p class="leading-none">{{ copy.qty }}</p>
                    <p v-if="rate.max" class="font-bold leading-none">{{ rate.min }} - {{ rate.max }}</p>
                    <p v-else class="font-bold leading-none">{{ rate.min }}+</p>
                </div>
                <p class="font-bold leading-none" :class="[rate.price ? 'text-3xl' : 'text-sm']">
                    {{ rate.price || copy.askPrice }}
                    <span v-if="rate.price" class="text-xs font-normal">THB</span>
                </p>
            </div>
        </div>
    </div>
</template>
