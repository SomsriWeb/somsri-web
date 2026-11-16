<script setup lang="ts">
interface BuilderOption {
    /** รูปภาพประกอบ (ไฟล์ SVG ใน /custom-polo-shirt/builder/) */
    image: string;
    name: string;
    text?: string;
}
interface BuilderTab {
    key: string;
    label: string;
    options: BuilderOption[];
}
interface Props {
    tabs: BuilderTab[];
    tabsLabel?: string;
}
const { tabs, tabsLabel = 'ส่วนประกอบเสื้อโปโล' } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const activeKey = ref(tabs[0]?.key);
</script>

<template>
    <section class="scroll-mt-20 bg-stone-100 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div role="tablist" :aria-label="tabsLabel" class="mb-5 flex flex-wrap gap-2">
                <button
                    v-for="tab in tabs"
                    :id="`polo-builder-tab-${tab.key}`"
                    :key="tab.key"
                    type="button"
                    role="tab"
                    :aria-selected="tab.key === activeKey"
                    :aria-controls="`polo-builder-panel-${tab.key}`"
                    class="cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors md:text-base"
                    :class="tab.key === activeKey ? 'border-primary bg-primary text-white' : 'border-stone-200 bg-white hover:bg-stone-50'"
                    @click="activeKey = tab.key"
                >
                    {{ tab.label }}
                </button>
            </div>

            <!-- render ทุกแท็บไว้ใน HTML (ซ่อนด้วย v-show) เพื่อให้ search engine เห็นเนื้อหาครบ -->
            <div
                v-for="tab in tabs"
                v-show="tab.key === activeKey"
                :id="`polo-builder-panel-${tab.key}`"
                :key="tab.key"
                role="tabpanel"
                :aria-labelledby="`polo-builder-tab-${tab.key}`"
                class="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4"
            >
                <figure
                    v-for="option in tab.options"
                    :key="option.image"
                    class="m-0 rounded-xl border border-stone-200 bg-white px-3.5 pt-4 pb-4.5 text-center text-sm"
                >
                    <div class="mb-2.5 rounded-lg bg-gradient-to-b from-white to-primary/12 px-4 pt-3 pb-1.5">
                        <img :src="option.image" :alt="`เสื้อโปโล${option.name}`" width="200" height="210" loading="lazy" class="mx-auto h-auto max-h-48 w-full" />
                    </div>
                    <figcaption class="text-slate-500">
                        <b class="block text-base text-stone-900">{{ option.name }}</b>
                        {{ option.text }}
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>
