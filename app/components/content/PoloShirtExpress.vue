<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Step {
    title: string;
    text: string;
}
interface Props {
    image: string;
    alt?: string;
    steps: Step[];
    fitTitle?: string;
    fitItems?: string[];
    limitTitle?: string;
    limitItems?: string[];
    lineLabel?: string;
    secondaryLabel?: string;
    secondaryTo?: string;
}
const {
    image,
    alt = '',
    steps,
    fitTitle = 'เหมาะกับ',
    fitItems = [],
    limitTitle = 'ข้อจำกัด',
    limitItems = [],
    lineLabel = 'สั่งทำเสื้อโปโล',
    secondaryLabel,
    secondaryTo,
} = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
    /** หัวข้อในการ์ด เหนือขั้นตอน */
    'card-title'?: () => unknown;
    /** ข้อความเล็กท้ายการ์ด */
    note?: () => unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="scroll-mt-20 bg-stone-100 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="grid items-start gap-8 rounded-2xl border border-stone-200 bg-white p-4 md:p-6 lg:grid-cols-[1fr_1.1fr]">
                <NuxtImg
                    :src="image"
                    :alt="alt"
                    loading="lazy"
                    format="webp"
                    class="aspect-[4/3] w-full rounded-xl bg-primary/12 object-cover object-right"
                />

                <div class="flex flex-col gap-5">
                    <h3 v-if="$slots['card-title']" class="text-lg font-bold text-stone-900 md:text-xl">
                        <slot name="card-title" mdc-unwrap="p" />
                    </h3>

                    <ol class="grid gap-3.5">
                        <li v-for="(step, i) in steps" :key="i" class="relative grid gap-0.5 pl-11">
                            <span
                                class="absolute top-0 left-0 grid size-8 place-items-center rounded-full bg-primary font-bold text-white"
                                aria-hidden="true"
                            >
                                {{ i + 1 }}
                            </span>
                            <b class="text-base text-stone-900">{{ step.title }}</b>
                            <span class="text-sm text-slate-500">{{ step.text }}</span>
                        </li>
                    </ol>

                    <div class="grid gap-4 border-t border-stone-200 pt-4 text-sm sm:grid-cols-2">
                        <div v-if="fitItems.length">
                            <h4 class="text-base font-bold text-stone-900">{{ fitTitle }}</h4>
                            <PoloShirtTickList :items="fitItems" />
                        </div>
                        <div v-if="limitItems.length">
                            <h4 class="text-base font-bold text-stone-900">{{ limitTitle }}</h4>
                            <PoloShirtTickList :items="limitItems" variant="warn" />
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <UButton :to="lineLink" color="line" icon="hugeicons:line" class="px-6 py-2.5 text-sm md:text-base">
                            {{ lineLabel }}
                        </UButton>
                        <UButton
                            v-if="secondaryLabel && secondaryTo"
                            :to="secondaryTo"
                            variant="outline"
                            class="bg-white px-6 py-2.5 text-sm md:text-base"
                        >
                            {{ secondaryLabel }}
                        </UButton>
                    </div>

                    <div v-if="$slots.note" class="text-sm text-slate-500 [&_a]:text-primary [&_a]:underline">
                        <slot name="note" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
