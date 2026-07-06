<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';
type SplitDirection = 'left-to-right' | 'right-to-left';

interface Props {
    textClass?: string;
    imageClass?: string;
    direction?: SplitDirection;
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'left-to-right',
});

interface Slots {
    Headertitle(): unknown;
    description(): unknown;
    image(): unknown;
    textExtra(): unknown;
}
defineSlots<Slots>();

const isRightToLeft = computed(() => props.direction === 'right-to-left');

const textOrderClass = computed(() => (isRightToLeft.value ? 'order-2 md:order-2' : 'order-2 md:order-1'));
const imageOrderClass = computed(() => (isRightToLeft.value ? 'order-1 md:order-1' : 'order-1 md:order-2'));

const textCellClass = computed(() => [
    'min-w-0 p-1 md:p-0 self-center w-full max-w-[460px] mx-auto md:mx-0 md:w-[380px] md:shrink-0',
    textOrderClass.value,
]);
const imageCellClass = computed(() => [
    'min-w-0 w-fit mx-auto h-20 md:h-[320px] flex justify-center items-center md:shrink-0',
    imageOrderClass.value,
]);
const rootRef = ref<HTMLElement | null>(null);

useScrollRevealUp(rootRef, { start: 'top 60%' });
</script>

<template>
    <section
        ref="rootRef"
        class="relative py-0 md:py-6"
    >
        <div class="hidden md:block absolute inset-0 -z-10" aria-hidden="true">
            <div class="absolute inset-0 bg-[#F3F5FA] shadow-[0_15px_20px_-10px_rgba(0,0,0,0.15)]"></div>
        </div>

        <div
            class="max-w-3xl mx-auto w-full items-center gap-0 md:gap-6 px-1 md:px-4 flex flex-col md:flex-row md:justify-center text-center md:text-left"
        >
            <div
                :class="[props.textClass, textCellClass]"
                class="space-y-0.5 md:space-y-4 [&_ul]:my-0 [&_ul]:list-outside [&_ul]:pl-3 md:[&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-0.5 md:[&_ul]:space-y-2 [&_ol]:my-0 [&_ol]:list-inside [&_ol]:list-decimal [&_ol]:space-y-0.5 md:[&_ol]:space-y-2 [&_li]:leading-tight md:[&_li]:leading-relaxed [&_li]:text-stone-700 [&_li]:text-[11px] md:[&_li]:text-base [&_p]:text-stone-700 text-left [&_ul]:inline-block [&_ul]:text-left"
            >
                <ProseH3 v-if="$slots.Headertitle" class="text-primary text-base md:text-5xl font-bold mb-1 md:mb-4">
                    <slot name="Headertitle" mdc-unwrap="p" />
                </ProseH3>

                <div class="leading-relaxed [&_p]:font-light [&_p]:text-stone-700 [&_li]:list-outside [&_ul]:pl-6">
                    <slot name="description" mdc-unwrap="p" />
                </div>

                <slot name="textExtra" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
            </div>

            <div
                :class="[props.imageClass, imageCellClass]"
                class="[&_img]:max-h-full [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_img]:mx-auto"
            >
                <slot name="image" mdc-unwrap="p" />
            </div>
        </div>
    </section>
</template>