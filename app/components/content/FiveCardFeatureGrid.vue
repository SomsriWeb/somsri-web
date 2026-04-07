<script setup lang="ts">
interface FeatureItem {
    icon: string;
    text: string;
    iconAlt?: string;
}

interface Props {
    items: FeatureItem[];
}

const props = defineProps<Props>();

const normalized = computed<FeatureItem[]>(() => (props.items ?? []).slice(0, 5));
</script>

<template>
    <div class="five-card-grid mx-auto w-full max-w-5xl">
        <div class="five-card-grid__layout gap-5">
            <div
                v-for="(item, idx) in normalized"
                :key="idx"
                class="five-card-grid__card flex flex-col items-center text-center gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                :class="[
                    'lg:col-span-2',
                    idx === 3 ? 'five-card-grid__card--bottom-left lg:col-start-2' : null,
                    idx === 4 ? 'five-card-grid__card--bottom-right lg:col-start-4' : null,
                ]"
            >
                <ProseImg
                    class="five-card-grid__icon"
                    :src="item.icon"
                    :alt="item.iconAlt || item.text"
                />
                <ProseP class="text-stone-700 leading-relaxed">
                    {{ item.text }}
                </ProseP>
            </div>
        </div>
    </div>
</template>

<style scoped>
.five-card-grid__layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

@media (min-width: 640px) {
    .five-card-grid__layout {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .five-card-grid__layout {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    /* จัด 2 ใบล่างให้อยู่กึ่งกลางของ 6 คอลัมน์ (เว้นซ้าย/ขวาอย่างละ 1 คอลัมน์) */
    .five-card-grid__card--bottom-left {
        grid-column: 2 / span 2;
    }

    .five-card-grid__card--bottom-right {
        grid-column: 4 / span 2;
    }
}

.five-card-grid__card :deep(img) {
    width: 3.25rem !important;
    height: 3.25rem !important;
    max-width: 3.25rem !important;
    max-height: 3.25rem !important;
    object-fit: contain;
}
</style>
