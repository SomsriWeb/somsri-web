<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
    badge: string;
    points: string[];
    lineLabel: string;
}

defineProps<Props>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div class="min-w-0">
                <NuxtImg
                    :src="image.src"
                    :alt="image.alt"
                    :width="image.width"
                    :height="image.height"
                    sizes="100vw sm:90vw lg:50vw"
                    format="webp"
                    loading="lazy"
                    class="h-auto w-full rounded-xl"
                />

                <p class="mt-4 rounded-xl bg-primary px-4 py-3 text-base text-white">
                    {{ badge }}
                </p>
            </div>

            <div class="min-w-0">
                <ProseH2>{{ title }}</ProseH2>

                <p class="mt-4 text-base leading-relaxed text-stone-600">
                    {{ description }}
                </p>

                <ul class="mt-5 list-disc space-y-3 pl-5 text-base text-stone-700">
                    <li
                        v-for="point in points"
                        :key="point"
                    >
                        {{ point }}
                    </li>
                </ul>

                <UButton
                    v-if="lineLink"
                    :to="lineLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="lg"
                    class="mt-6"
                >
                    {{ lineLabel }}
                </UButton>
            </div>
        </div>
    </section>
</template>