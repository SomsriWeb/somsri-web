<script setup lang="ts">
type GalleryCategory = 'screen' | 'emb' | 'sub';

interface GalleryItem {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    category: GalleryCategory;
}

interface Props {
    title: string;
    description?: string;
    items: GalleryItem[];
}

const props = defineProps<Props>();

const galleryFilter = ref<'all' | GalleryCategory>('all');

const filters: {
    value: 'all' | GalleryCategory;
    label: string;
}[] = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'screen', label: 'สกรีน' },
    { value: 'emb', label: 'ปัก' },
    { value: 'sub', label: 'Sublimation' },
];

const filteredItems = computed(() => {
    if (galleryFilter.value === 'all') {
        return props.items;
    }

    return props.items.filter(
        (item) => item.category === galleryFilter.value,
    );
});
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <header class="mb-6">
                <ProseH2>{{ title }}</ProseH2>

                <p
                    v-if="description"
                    class="mt-3 text-base text-stone-600"
                >
                    {{ description }}
                </p>
            </header>

            <div
                role="group"
                aria-label="กรองประเภทผลงาน"
                class="mb-6 flex flex-wrap gap-2"
            >
                <button
                    v-for="filter in filters"
                    :key="filter.value"
                    type="button"
                    :aria-pressed="galleryFilter === filter.value"
                    class="min-h-11 rounded-full border border-primary px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    :class="
                        galleryFilter === filter.value
                            ? 'bg-primary text-white'
                            : 'bg-white text-primary'
                    "
                    @click="galleryFilter = filter.value"
                >
                    {{ filter.label }}
                </button>
            </div>

            <div
                aria-live="polite"
                aria-atomic="true"
                class="sr-only"
            >
                แสดง {{ filteredItems.length }} ผลงาน
            </div>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <figure
                    v-for="item in filteredItems"
                    :key="item.src"
                    class="min-w-0"
                >
                    <NuxtImg
                        :src="item.src"
                        :alt="item.alt"
                        :width="item.width"
                        :height="item.height"
                        sizes="50vw md:33vw lg:25vw"
                        format="webp"
                        loading="lazy"
                        class="aspect-square h-auto w-full rounded-xl object-cover"
                    />

                    <figcaption class="mt-2 text-sm text-stone-700">
                        {{ item.caption }}
                    </figcaption>
                </figure>
            </div>

            <div class="mt-6">
                <UButton
                    to="/portfolio"
                    color="primary"
                    variant="outline"
                >
                    ดูผลงานทั้งหมด
                </UButton>
            </div>
        </div>
    </section>
</template>