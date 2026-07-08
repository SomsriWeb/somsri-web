<script setup lang="ts">
import type { FabricsCollectionItem } from '@nuxt/content';
import { extractFabricGram } from '~/utils/fabricCatalog';

interface Props {
    fabric: FabricsCollectionItem;
}

const { fabric } = defineProps<Props>();

const gram = computed(() => extractFabricGram(fabric));
</script>

<template>
    <article class="group relative min-h-52 overflow-hidden rounded-2xl bg-stone-200 shadow-sm sm:min-h-56 lg:min-h-60">
        <div class="absolute inset-0 overflow-hidden">
            <ProseImg
                :src="fabric.imageUrl"
                :alt="fabric.imageAlt || fabric.nameEn"
                class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
        </div>

        <div
            v-if="gram"
            class="absolute top-0 right-0 z-20 rounded-bl-xl bg-white px-2.5 py-1 text-xs font-bold text-primary shadow-sm"
        >
            {{ gram }} แกรม
        </div>

        <div
            class="absolute inset-x-0 bottom-0 z-10 flex h-27 flex-col justify-start gap-0 rounded-t-2xl bg-linear-to-b from-black/35 via-black/75 to-black/92 px-3.5 pt-1.5 text-white sm:h-28 lg:h-36"
        >
            <h3 class="text-base font-bold uppercase leading-tight wrap-break-word lg:text-lg">
                {{ fabric.nameEn }}
            </h3>
            <p class="mt-0.5 text-xs leading-tight text-white/90">
                สำหรับทำ{{ fabric.recommendForStyle }}
            </p>
            <ul class="mt-0.5 space-y-0 text-[0.7rem] leading-tight text-white/85 lg:text-xs">
                <li v-for="advantage in fabric.advantage.slice(0, 3)" :key="advantage" class="flex gap-1.5">
                    <span class="mt-1 size-1 shrink-0 rounded-full bg-white/80" />
                    <span>{{ advantage }}</span>
                </li>
            </ul>
        </div>
    </article>
</template>

<style scoped>
article :deep(img) {
    display: block;
    height: 100%;
    width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
