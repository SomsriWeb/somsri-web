<script setup lang="ts">
interface FabricItem {
    name: string;
    weight: number;
    description: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

interface Props {
    title: string;
    description?: string;
    items: FabricItem[];
    note?: string;
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

            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <article
                    v-for="item in items"
                    :key="item.name"
                    class="min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white"
                >
                    <NuxtImg
                        :src="item.image.src"
                        :alt="item.image.alt"
                        :width="item.image.width"
                        :height="item.image.height"
                        sizes="50vw md:33vw lg:20vw"
                        format="webp"
                        loading="lazy"
                        class="aspect-square h-auto w-full object-cover"
                    />

                    <div class="p-4">
                        <p class="text-sm font-semibold text-primary">
                            {{ item.weight }} แกรม
                        </p>

                        <h3 class="mt-1 text-lg font-semibold leading-tight text-stone-900">
                            {{ item.name }}
                        </h3>

                        <p class="mt-2 text-sm leading-relaxed text-stone-600">
                            {{ item.description }}
                        </p>
                    </div>
                </article>
            </div>

            <p
                v-if="note"
                class="mt-4 text-sm text-stone-600"
            >
                {{ note }}
            </p>

            <NuxtLink
                to="/fabric-specification"
                class="mt-3 inline-block text-base text-primary underline underline-offset-4"
            >
                ดูผ้าทั้งหมด
            </NuxtLink>
        </div>
    </section>
</template>