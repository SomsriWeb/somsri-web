<script setup lang="ts">
import type { TickItem } from '~/components/PoloShirt/TickList.vue';

interface Props {
    freeTitle: string;
    freeItems: TickItem[];
    cautionTitle: string;
    cautions: TickItem[];
}
const { freeTitle, freeItems, cautionTitle, cautions } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="scroll-mt-20 bg-primary/12 py-10 md:py-14 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead on-tint>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="grid gap-5 md:grid-cols-2">
                <div class="rounded-xl border border-stone-200 bg-white p-5 text-sm md:text-base">
                    <h3 class="text-base font-bold text-stone-900 md:text-lg">{{ freeTitle }}</h3>
                    <PoloShirtTickList :items="freeItems" />
                </div>
                <div class="rounded-xl border border-stone-200 bg-white p-5 text-sm md:text-base">
                    <h3 class="text-base font-bold text-stone-900 md:text-lg">{{ cautionTitle }}</h3>
                    <PoloShirtTickList :items="cautions" variant="warn" />
                </div>
            </div>
        </div>
    </section>
</template>
