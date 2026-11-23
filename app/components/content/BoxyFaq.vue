<script setup lang="ts">
interface FaqItem {
    question: string;
    answer: string;
    link?: {
        label: string;
        to: string;
    };
}

interface Props {
    title: string;
    items: FaqItem[];
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <ProseH2 class="mb-6">
                {{ title }}
            </ProseH2>

            <div class="space-y-3">
                <details
                    v-for="(item, index) in items"
                    :key="item.question"
                    :open="index === 0"
                    class="rounded-xl border border-stone-200 bg-white px-5"
                >
                    <summary
                        class="cursor-pointer py-4 text-base font-semibold text-stone-900 focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        {{ item.question }}
                    </summary>

                    <div class="pb-5 text-base leading-relaxed text-stone-600">
                        <p>{{ item.answer }}</p>

                        <NuxtLink
                            v-if="item.link"
                            :to="item.link.to"
                            class="mt-3 inline-block text-primary underline underline-offset-4"
                        >
                            {{ item.link.label }}
                        </NuxtLink>
                    </div>
                </details>
            </div>
        </div>
    </section>
</template>