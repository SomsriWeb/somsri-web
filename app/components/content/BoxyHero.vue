<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface HeroImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface Props {
    title: string;
    description: string;
    image: HeroImage;
    facts?: string[];
    lineLabel?: string;
}

withDefaults(defineProps<Props>(), {
    facts: () => [],
    lineLabel: 'ทักไลน์ ขอราคาเสื้อ Boxy',
});

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="bg-white px-5 py-8 lg:px-18 lg:py-12">
        <div class="mx-auto max-w-6xl">
            <nav
                aria-label="breadcrumb"
                class="mb-5 flex flex-wrap items-center gap-2 text-sm text-stone-500"
            >
                <NuxtLink to="/" class="hover:text-primary">
                    หน้าหลัก
                </NuxtLink>

                <span aria-hidden="true">›</span>

                <NuxtLink to="/tshirt" class="hover:text-primary">
                    เสื้อยืด
                </NuxtLink>

                <span aria-hidden="true">›</span>

                <span aria-current="page">เสื้อ Boxy</span>
            </nav>

            <div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                <NuxtImg
                    :src="image.src"
                    :alt="image.alt"
                    :width="image.width"
                    :height="image.height"
                    sizes="100vw sm:90vw lg:50vw"
                    format="webp"
                    loading="eager"
                    fetchpriority="high"
                    class="h-auto w-full rounded-2xl"
                />

                <div>
                    <h1 class="text-3xl leading-tight font-bold text-primary md:text-4xl">
                        {{ title }}
                    </h1>

                    <p class="mt-4 text-base leading-relaxed text-stone-700">
                        {{ description }}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-3">
                        <UButton
                            v-if="lineLink"
                            :to="lineLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="lg"
                        >
                            {{ lineLabel }}
                        </UButton>

                        <UButton
                            to="#price"
                            color="primary"
                            variant="outline"
                            size="lg"
                        >
                            ดูราคา
                        </UButton>
                    </div>

                    <ul
                        v-if="facts.length"
                        class="mt-6 grid grid-cols-2 gap-3"
                    >
                        <li
                            v-for="fact in facts"
                            :key="fact"
                            class="rounded-xl bg-stone-50 px-3 py-3 text-sm text-stone-700"
                        >
                            {{ fact }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>