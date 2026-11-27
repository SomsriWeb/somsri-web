<script setup lang="ts">
interface OrderStep {
    title: string;
    description: string;
    badge: string;
}

interface Props {
    title: string;
    description?: string;
    items: OrderStep[];
    summary: string[];
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 bg-stone-50 px-5 py-10 lg:px-18 lg:py-14">
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

            <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <li
                    v-for="(item, index) in items"
                    :key="item.title"
                    class="rounded-xl border border-stone-200 bg-white p-5"
                >
                    <span
                        aria-hidden="true"
                        class="mb-4 flex size-10 items-center justify-center rounded-full bg-primary text-base font-semibold text-white"
                    >
                        {{ index + 1 }}
                    </span>

                    <h3 class="text-lg font-semibold text-primary">
                        {{ item.title }}
                    </h3>

                    <p class="mt-2 text-base leading-relaxed text-stone-600">
                        {{ item.description }}
                    </p>

                    <p class="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {{ item.badge }}
                    </p>
                </li>
            </ol>

            <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-3 rounded-xl bg-primary px-5 py-4 text-base text-white">
                <li
                    v-for="text in summary"
                    :key="text"
                >
                    {{ text }}
                </li>
            </ul>

            <NuxtLink
                to="/how-to-order"
                class="mt-5 inline-block text-base text-primary underline underline-offset-4"
            >
                ดูขั้นตอนแบบละเอียด
            </NuxtLink>
        </div>
    </section>
</template>