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

const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": {
        "startingAt": "เริ่มต้นที่",
        "askPrice": "สอบถามราคา",
        "pcs": "ตัว",
        "qty": "จำนวน(ตัว)"
    },
    "en": {
        "startingAt": "Starting at",
        "askPrice": "Contact for price",
        "pcs": "pcs",
        "qty": "Qty (pcs)"
    }
}
</i18n>

<template>
    <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <h4 class="flex min-h-13 items-center justify-center bg-primary px-3 py-2.5 text-center text-base leading-tight font-bold text-white md:text-lg">
            {{ priceLists.fabricName }}
        </h4>

        <div class="flex flex-col items-center justify-center gap-0.5 bg-stone-100 px-3 py-4">
            <p class="text-xs text-stone-500 md:text-sm">{{ t('startingAt') }}</p>
            <p class="inline-flex items-baseline justify-center gap-1 whitespace-nowrap text-4xl font-extrabold text-primary md:text-5xl">
                {{ startRate?.price ?? t('askPrice') }}
                <span v-if="startRate?.price" class="text-sm font-normal text-stone-600">THB</span>
            </p>
            <p class="min-h-4 text-xs text-stone-500 md:text-sm">
                <template v-if="startRate">({{ startRate.min }}+ {{ t('pcs') }})</template>
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
                    <p class="text-xs leading-none text-stone-500">{{ t('qty') }}</p>
                    <p class="mt-1 leading-none font-bold text-stone-900">{{ rate.min }} +</p>
                </div>
                <p
                    class="inline-flex items-baseline justify-end gap-1 text-right leading-none font-bold whitespace-nowrap text-primary"
                    :class="rate.price ? 'text-2xl' : 'text-sm'"
                >
                    {{ rate.price ?? t('askPrice') }}
                    <span v-if="rate.price" class="text-xs font-normal text-stone-600">THB</span>
                </p>
            </div>
        </div>
    </div>
</template>