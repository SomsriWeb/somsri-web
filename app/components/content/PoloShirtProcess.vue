<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Step {
    title: string;
    text: string;
    /** ระยะเวลา/ช่วงเวลา แสดงสี primary ท้ายการ์ด */
    time?: string;
}
interface Props {
    steps: Step[];
    lineLabel?: string;
}
const { steps, lineLabel = 'สอบถามเพิ่มเติม' } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead center>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <ol class="grid gap-x-4 gap-y-7 pt-3 md:grid-cols-2 lg:grid-cols-3">
                <li v-for="(step, i) in steps" :key="i" class="relative rounded-xl border border-stone-200 bg-white px-5 pt-6 pb-5">
                    <span
                        class="absolute -top-3.5 left-4.5 grid size-8.5 place-items-center rounded-full bg-primary font-bold text-white"
                        aria-hidden="true"
                    >
                        {{ i + 1 }}
                    </span>
                    <h3 class="text-base font-bold text-stone-900 md:text-lg">{{ step.title }}</h3>
                    <p class="mt-1.5 text-sm text-slate-500">{{ step.text }}</p>
                    <div v-if="step.time" class="mt-2 text-xs font-bold text-primary">{{ step.time }}</div>
                </li>
            </ol>

            <div class="mt-7 flex justify-center">
                <UButton :to="lineLink" color="line" icon="hugeicons:line" class="px-6 py-2.5 text-sm md:text-base">
                    {{ lineLabel }}
                </UButton>
            </div>
        </div>
    </section>
</template>
