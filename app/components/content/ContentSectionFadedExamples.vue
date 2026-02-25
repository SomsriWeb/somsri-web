<script setup lang="ts">
interface Slots {
    title(): unknown;
    image1(): unknown;
    image1alt(): unknown;
    image1subalt(): unknown;
    image2(): unknown;
    image2alt(): unknown;
    image2subalt(): unknown;
    image3(): unknown;
    image3alt(): unknown;
    image3subalt(): unknown;
    action(): unknown;
}
defineSlots<Slots>();

const slots = useSlots();
const hasImage1 = computed(() => (slots.image1?.()?.length ?? 0) > 0);
const hasImage2 = computed(() => (slots.image2?.()?.length ?? 0) > 0);
const hasImage3 = computed(() => (slots.image3?.()?.length ?? 0) > 0);

const cardUi = {
    root: 'rounded-lg bg-white border-2 border-white shadow-sm flex flex-col',
    body: 'p-2 md:p-3 space-y-3 flex flex-col',
};
</script>

<template>
    <section class="bg-primary text-white py-8 md:py-12 px-5 lg:px-[4.6rem]">
        <ProseH2 class="text-white text-center text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            <slot name="title" mdc-unwrap="p" />
        </ProseH2>
        <div class="flex flex-col md:flex-row md:flex-nowrap md:justify-around gap-4 md:gap-6 mb-8">
            <div v-if="hasImage1" class="w-full sm:flex-1 lg:min-w-0 lg:max-w-3xs">
            <UCard :ui="cardUi">
                <div class="aspect-square overflow-hidden rounded-md bg-stone-100 relative [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                    <slot name="image1" />
                </div>
                <p class="text-primary text-center font-bold text-lg leading-tight">
                    <slot name="image1alt" mdc-unwrap="p" />
                </p>
                <p class="text-stone-500 text-center text-sm leading-tight">
                    <slot name="image1subalt" mdc-unwrap="p" />
                </p>
            </UCard>
            </div>
            <div v-if="hasImage2" class="w-full sm:flex-1 lg:min-w-0 lg:max-w-3xs">
            <UCard :ui="cardUi">
                <div class="aspect-square overflow-hidden rounded-md bg-stone-100 [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                    <slot name="image2" />
                </div>
                <p class="text-primary text-center font-bold text-lg leading-tight">
                    <slot name="image2alt" mdc-unwrap="p" />
                </p>
                <p class="text-stone-500 text-center text-sm leading-tight">
                    <slot name="image2subalt" mdc-unwrap="p" />
                </p>
            </UCard>
            </div>
            <div v-if="hasImage3" class="w-full sm:flex-1 lg:min-w-0 lg:max-w-3xs">
            <UCard :ui="cardUi">
                <div class="aspect-square overflow-hidden rounded-md bg-stone-100 [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                    <slot name="image3" />
                </div>
                <p class="text-primary text-center font-bold text-lg leading-tight">
                    <slot name="image3alt" mdc-unwrap="p" />
                </p>
                <p class="text-stone-500 text-center text-sm leading-tight">
                    <slot name="image3subalt" mdc-unwrap="p" />
                </p>
            </UCard>
            </div>
        </div>
        <div class="flex justify-center">
            <slot name="action" />
        </div>
    </section>
</template>
