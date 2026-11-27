<script setup lang="ts">
interface ClientLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface FeatureItem {
    title: string;
    description: string;
}

interface Props {
    title: string;
    description?: string;
    logos: ClientLogo[];
    featuresTitle: string;
    features: FeatureItem[];
}

defineProps<Props>();
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

            <ul class="grid grid-cols-3 items-center gap-4 sm:grid-cols-5 lg:grid-cols-7">
                <li
                    v-for="logo in logos"
                    :key="logo.src"
                    class="flex min-h-20 items-center justify-center rounded-xl border border-stone-100 bg-white p-3"
                >
                    <NuxtImg
                        :src="logo.src"
                        :alt="logo.alt"
                        :width="logo.width"
                        :height="logo.height"
                        sizes="100px"
                        format="webp"
                        loading="lazy"
                        class="h-auto max-h-14 w-auto max-w-full object-contain"
                    />
                </li>
            </ul>

            <h3 class="mt-8 mb-5 text-xl font-semibold text-primary">
                {{ featuresTitle }}
            </h3>

            <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li
                    v-for="feature in features"
                    :key="feature.title"
                    class="rounded-xl border border-stone-200 bg-white p-5"
                >
                    <h4 class="text-lg font-semibold text-primary">
                        {{ feature.title }}
                    </h4>

                    <p class="mt-2 text-base leading-relaxed text-stone-600">
                        {{ feature.description }}
                    </p>
                </li>
            </ol>
        </div>
    </section>
</template>