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
    <div class="mx-auto w-full max-w-5xl">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div v-for="(item, idx) in normalized" :key="idx" class="flex flex-col items-center text-center">
                <ProseImg
                    v-if="item.icon"
                    :src="item.icon"
                    :alt="item.iconAlt || item.text"
                    class="max-w-16"
                />
                <p class="mt-3 font-bold font-stretch-condensed text-base leading-snug text-stone-700">
                    {{ item.text }}
                </p>
            </div>
        </div>
    </div>
</template>
