<script setup lang="ts">
import FabricCatalogCard from '~/components/Fabric/CatalogCard.vue';
import FabricFilter from '~/components/Fabric/Filter.vue';
import type { ProductTypeIdEnum } from '~/types/global';
import { ProductTypeIdEnum as ProductType } from '~/types/global';
import { defaultFabricFilterState, filterFabrics } from '~/utils/fabricCatalog';

interface Props {
    type?: ProductTypeIdEnum;
}

const { type = ProductType.FABRIC_SPECIFICATION } = defineProps<Props>();

const filters = ref(defaultFabricFilterState());
const MOBILE_VISIBLE_COUNT = 8;
const DESKTOP_VISIBLE_COUNT = 9;
const LOAD_MORE_STEP = 6;
const visibleCount = ref(MOBILE_VISIBLE_COUNT);

const isDesktop = useMediaQuery('(min-width: 1024px)');
const initialVisibleCount = computed(() => (isDesktop.value ? DESKTOP_VISIBLE_COUNT : MOBILE_VISIBLE_COUNT));

const { data } = await useAsyncData('fabric-catalog', () => {
    return queryCollection('fabrics').order('order', 'ASC').all();
});

const filteredFabrics = computed(() => filterFabrics(data.value || [], filters.value, type));

const visibleFabrics = computed(() => filteredFabrics.value.slice(0, visibleCount.value));

const hasMore = computed(() => visibleCount.value < filteredFabrics.value.length);

watch([filteredFabrics, isDesktop], () => {
    visibleCount.value = initialVisibleCount.value;
}, { immediate: true });

function loadMore() {
    visibleCount.value += LOAD_MORE_STEP;
}

function scrollToResults() {
    const element = document.getElementById('fabric-catalog-results');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
    <div class="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-start xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-6">
        <div class="space-y-5">
            <FabricFilter v-model="filters" @apply="scrollToResults" />
            <UButton color="primary" class="flex w-full justify-center py-3 font-semibold" @click="scrollToResults">
                ดูผลลัพธ์
            </UButton>
        </div>

        <div id="fabric-catalog-results" class="min-w-0">
            <p class="mb-5 text-lg text-stone-700">
                พบเนื้อผ้า
                <span class="font-bold text-primary">{{ filteredFabrics.length }}</span>
                รายการ
            </p>

            <div v-if="visibleFabrics.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FabricCatalogCard v-for="fabric in visibleFabrics" :key="fabric.uid" :fabric="fabric" />
            </div>

            <p v-else class="rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center text-stone-500">
                ไม่พบเนื้อผ้าตามเงื่อนไขที่เลือก
            </p>

            <div v-if="hasMore" class="mt-8">
                <div class="flex justify-center pb-4">
                    <button
                        type="button"
                        class="inline-flex items-center gap-1.5 text-base font-medium text-stone-800 transition-colors hover:text-primary"
                        @click="loadMore"
                    >
                        ดูเพิ่มเติม
                        <Icon name="lucide:chevron-down" class="size-4" />
                    </button>
                </div>
                <div class="border-b border-stone-200" />
            </div>
        </div>
    </div>
</template>
