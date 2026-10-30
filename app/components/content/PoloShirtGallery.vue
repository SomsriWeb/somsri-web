<script setup lang="ts">
interface Filter {
    /** "all" = แสดงทั้งหมด */
    key: string;
    label: string;
}
interface Work {
    image: string;
    alt?: string;
    /** ตรงกับ key ของ filter */
    category: string;
    name: string;
    tags?: string[];
    text?: string;
}
interface Props {
    filters?: Filter[];
    filtersLabel?: string;
    items: Work[];
    buttonLabel?: string;
    buttonTo?: string;
}
const { filters = [], filtersLabel = 'กรองตามธุรกิจ', items, buttonLabel, buttonTo } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const activeFilter = ref(filters[0]?.key ?? 'all');
const isVisible = (item: Work) => activeFilter.value === 'all' || item.category === activeFilter.value;
</script>

<template>
    <section class="scroll-mt-20 bg-stone-100 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div v-if="filters.length" role="group" :aria-label="filtersLabel" class="mb-5 flex flex-wrap gap-2">
                <button
                    v-for="filter in filters"
                    :key="filter.key"
                    type="button"
                    :aria-pressed="filter.key === activeFilter"
                    class="cursor-pointer rounded-full border px-3.5 py-1 text-sm transition-colors"
                    :class="filter.key === activeFilter ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white hover:bg-stone-50'"
                    @click="activeFilter = filter.key"
                >
                    {{ filter.label }}
                </button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <figure
                    v-for="item in items"
                    v-show="isVisible(item)"
                    :key="item.image"
                    class="m-0 overflow-hidden rounded-xl border border-stone-200 bg-white"
                >
                    <NuxtImg
                        :src="item.image"
                        :alt="item.alt || item.name"
                        loading="lazy"
                        format="webp"
                        class="aspect-square w-full bg-primary/12 object-cover"
                    />
                    <figcaption class="grid gap-2 px-3.5 pt-3 pb-4 text-sm">
                        <b class="text-base text-stone-900">{{ item.name }}</b>
                        <span v-if="item.tags?.length" class="flex flex-wrap gap-1.5 text-xs">
                            <span v-for="tag in item.tags" :key="tag" class="rounded-lg bg-primary/12 px-2 py-0.5 text-[#76182f]">{{ tag }}</span>
                        </span>
                        <p v-if="item.text" class="text-slate-500">{{ item.text }}</p>
                    </figcaption>
                </figure>
            </div>

            <div v-if="buttonLabel && buttonTo" class="mt-6 flex flex-wrap gap-3">
                <UButton :to="buttonTo" variant="outline" class="bg-white px-6 py-2.5 text-sm md:text-base">{{ buttonLabel }}</UButton>
            </div>
        </div>
    </section>
</template>
