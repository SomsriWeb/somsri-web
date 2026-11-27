<script setup lang="ts">
interface ReviewImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface Props {
    title: string;
    items: ReviewImage[];
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <ProseH2 class="mb-6">
                {{ title }}
            </ProseH2>

            <p class="mb-3 text-sm text-stone-500">
                เลื่อนซ้าย–ขวาเพื่อดูรีวิวเพิ่มเติม
            </p>

            <div
                role="region"
                :aria-label="title"
                tabindex="0"
                class="flex snap-x snap-proximity gap-4 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-primary"
            >
                <figure
                    v-for="item in items"
                    :key="item.src"
                    class="w-[85%] shrink-0 snap-start self-start overflow-hidden rounded-xl border border-stone-200 bg-white p-3 sm:w-[48%] lg:w-[32%]"
                >
                    <NuxtImg
                        :src="item.src"
                        :alt="item.alt"
                        :width="item.width"
                        :height="item.height"
                        sizes="85vw sm:45vw lg:30vw"
                        format="webp"
                        loading="lazy"
                        class="h-auto w-full"
                    />
                </figure>
            </div>
        </div>
    </section>
</template>