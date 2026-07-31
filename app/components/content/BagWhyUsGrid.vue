<script setup lang="ts">
interface Slots {
    eyebrow(): unknown;
    title(): unknown;

    'item-1-image'(): unknown;
    'item-1-title'(): unknown;
    'item-1-description'(): unknown;

    'item-2-image'(): unknown;
    'item-2-title'(): unknown;
    'item-2-description'(): unknown;

    'item-3-image'(): unknown;
    'item-3-title'(): unknown;
    'item-3-description'(): unknown;

    'item-4-image'(): unknown;
    'item-4-title'(): unknown;
    'item-4-description'(): unknown;

    'item-5-image'(): unknown;
    'item-5-title'(): unknown;
    'item-5-description'(): unknown;

    'item-6-image'(): unknown;
    'item-6-title'(): unknown;
    'item-6-description'(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <div class="mx-auto max-w-2xl text-center">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
            <div v-for="n in 6" :key="n" class="overflow-hidden rounded-2xl border border-stone-200">
                <div class="aspect-[4/3] w-full">
                    <slot :name="`item-${n}-image`" />
                </div>

                <div class="px-3 py-3 md:px-4 md:py-4">
                    <h3 class="text-sm font-bold text-stone-900 md:text-lg">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>

                    <div v-if="$slots[`item-${n}-description`]" class="mt-1 text-xs text-stone-600 md:text-sm">
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>