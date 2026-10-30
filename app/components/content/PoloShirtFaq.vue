<script setup lang="ts">
// SLOTS
interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;

    'item-1-question'(): unknown;
    'item-1-answer'(): unknown;

    'item-2-question'?: () => unknown;
    'item-2-answer'?: () => unknown;

    'item-3-question'?: () => unknown;
    'item-3-answer'?: () => unknown;

    'item-4-question'?: () => unknown;
    'item-4-answer'?: () => unknown;

    'item-5-question'?: () => unknown;
    'item-5-answer'?: () => unknown;

    'item-6-question'?: () => unknown;
    'item-6-answer'?: () => unknown;

    'item-7-question'?: () => unknown;
    'item-7-answer'?: () => unknown;

    'item-8-question'?: () => unknown;
    'item-8-answer'?: () => unknown;

    'item-9-question'?: () => unknown;
    'item-9-answer'?: () => unknown;

    'item-10-question'?: () => unknown;
    'item-10-answer'?: () => unknown;
}
const slots = defineSlots<Slots>();

// รองรับสูงสุด 10 ข้อ แสดงเฉพาะข้อที่มี question slot จริง ข้อแรกเปิดไว้
const activeIndexes = computed(() => Array.from({ length: 10 }, (_, i) => i + 1).filter((n) => !!slots[`item-${n}-question`]));
</script>

<template>
    <section class="scroll-mt-20 bg-stone-100 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead center>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="mx-auto grid max-w-[54rem] gap-2.5">
                <details v-for="n in activeIndexes" :key="n" :open="n === 1" class="group rounded-xl border border-stone-200 bg-white px-5">
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-base font-bold text-stone-900 [&::-webkit-details-marker]:hidden"
                    >
                        <span><slot :name="`item-${n}-question`" mdc-unwrap="p" /></span>
                        <span class="text-xl leading-none text-primary" aria-hidden="true">
                            <span class="group-open:hidden">+</span>
                            <span class="hidden group-open:inline">–</span>
                        </span>
                    </summary>
                    <div class="pb-4.5 text-sm md:text-base [&_a]:text-primary [&_a]:underline">
                        <slot :name="`item-${n}-answer`" mdc-unwrap="p" />
                    </div>
                </details>
            </div>
        </div>
    </section>
</template>
