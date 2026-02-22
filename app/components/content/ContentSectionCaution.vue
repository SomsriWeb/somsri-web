<script setup lang="ts">
interface Slots {
    title(): unknown;
    card1Image(): unknown;
    card1Title(): unknown;
    card1Description(): unknown;
    card2Image(): unknown;
    card2Title(): unknown;
    card2Description(): unknown;
    footer(): unknown;
}
defineSlots<Slots>();

const cards = [1, 2] as const
</script>

<template>
    <section class="w-full px-5 lg:px-[4.6rem] space-y-5 text-primary">
        <div class="mb-6">
            <ProseH2 size="lg">
                <slot name="title" />
            </ProseH2>
        </div>
        <div class="max-w-3xl mx-auto">
            <div class="flex flex-col sm:flex-row items-stretch gap-5">
                <div
                    v-for="n in cards"
                    :key="n"
                    class="flex-1 flex flex-col min-h-0 my-5"
                >
                    <div class="w-5/6 mx-auto aspect-square overflow-hidden rounded-md [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                        <slot :name="`card${n}Image`" />
                    </div>
                    <div class="flex flex-col items-center text-center space-y-2 p-3 sm:p-4 pt-3">
                        <h4 class="text-lg font-bold">
                            <slot :name="`card${n}Title`" mdc-unwrap="p" />
                        </h4>
                        <p class="text-stone-500 text-sm font-light">
                            <slot :name="`card${n}Description`" mdc-unwrap="p" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-center font-bold text-lg">
            <slot name="footer" mdc-unwrap="p" />
        </p>
    </section>
</template>
