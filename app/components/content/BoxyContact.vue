<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';
import { SALES_PEOPLE } from '~/lib/salesPeople';

interface Props {
    title: string;
    description: string;
    lineLabel: string;
}

defineProps<Props>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="bg-primary px-5 py-10 text-white lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl text-center">
            <h2 class="text-2xl font-bold leading-tight md:text-3xl">
                {{ title }}
            </h2>

            <p class="mt-4 text-base leading-relaxed">
                {{ description }}
            </p>

            <UButton v-if="lineLink" :to="lineLink" target="_blank" rel="noopener noreferrer" color="neutral" variant="solid" size="lg" class="mt-6">
                {{ lineLabel }}
            </UButton>

            <div class="mt-6">
                <p class="mb-3 text-base">หรือโทร</p>

                <ul class="flex flex-wrap justify-center gap-x-5 gap-y-3">
                    <li v-for="person in SALES_PEOPLE" :key="person.phoneNumber">
                        <a
                            :href="`tel:${person.phoneNumber.replaceAll('-', '')}`"
                            class="inline-block py-2 text-base underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            {{ person.phoneNumber }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
