<script setup lang="ts">
import type { PriceList } from '~/types/priceList';

// PROPS
interface Props {
    priceLists: PriceList;
}
const { priceLists } = defineProps<Props>();

// COMPUTED
const startRate = computed(() => priceLists.rates[0]);
const loopedRates = computed(() => priceLists.rates.slice(1));
</script>

<template>
    <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <h3 class="flex min-h-13 items-center justify-center bg-primary px-3 py-2.5 text-center text-base leading-tight font-bold text-white md:text-lg">
            {{ priceLists.fabricName }}
        </h3>

        <div class="flex flex-col items-center justify-center gap-0.5 bg-stone-100 px-3 py-4">
            <p class="text-xs text-stone-500 md:text-sm">เริ่มต้นที่</p>
            <p class="inline-flex items-baseline justify-center gap-1 whitespace-nowrap text-4xl font-extrabold text-primary md:text-5xl">
                {{ startRate?.price ?? 'สอบถามราคา' }}
                <span v-if="startRate?.price" class="text-sm font-normal text-stone-600">THB</span>
            </p>
            <p class="min-h-4 text-xs text-stone-500 md:text-sm">
                <template v-if="startRate">({{ startRate.min }}+ ตัว)</template>
            </p>
        </div>

        <div class="flex-1 px-3 md:px-4">
            <div
                v-for="(rate, i) in loopedRates"
                :key="rate.min"
                class="flex items-center justify-between gap-3 py-2.5"
                :class="i !== loopedRates.length - 1 ? 'border-b border-stone-100' : ''"
            >
                <div>
                    <p class="text-xs leading-none text-stone-500">จำนวน(ตัว)</p>
                    <p class="mt-1 leading-none font-bold text-stone-900">{{ rate.min }} +</p>
                </div>
                <p
                    class="inline-flex items-baseline justify-end gap-1 text-right leading-none font-bold whitespace-nowrap text-primary"
                    :class="rate.price ? 'text-2xl' : 'text-sm'"
                >
                    {{ rate.price ?? 'สอบถามราคา' }}
                    <span v-if="rate.price" class="text-xs font-normal text-stone-600">THB</span>
                </p>
            </div>
        </div>
    </div>
</template>