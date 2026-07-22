<script setup lang="ts">
interface Props {
    image: string;
    alt?: string;
}
const { image, alt = '' } = defineProps<Props>();

interface Slots {
    eyebrow(): unknown;
    title(): unknown;
    description(): unknown;
    cta(): unknown;
}
defineSlots<Slots>();

// VARIABLE
const bgImageValue = `url(${image})`;
</script>

<template>
    <section class="relative">
        <div class="relative bg-center bg-cover" :style="{ backgroundImage: bgImageValue }">
            <div class="absolute inset-0 bg-radial from-white/90 via-white/55 to-transparent" aria-hidden="true" />
            <span class="sr-only">{{ alt }}</span>

            <div class="relative flex flex-col items-center justify-center px-5 py-8 md:py-12 max-w-4xl mx-auto text-center">
                <p class="font-bold font-stretch-condensed text-primary text-base md:text-lg mb-2">
                    <slot name="eyebrow" mdc-unwrap="p">พร้อมเริ่มได้เลย</slot>
                </p>

                <h2 class="font-bold font-stretch-condensed text-gray-900 text-2xl md:text-4xl lg:text-5xl leading-tight">
                    <slot name="title" mdc-unwrap="p" />
                </h2>

                <p v-if="$slots.description" class="mt-4 max-w-2xl mx-auto text-primary text-base md:text-lg font-light">
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div class="mt-6 md:mt-8 flex justify-center">
                    <slot name="cta">
                        <LineLink>
                            <UButton size="xl" class="px-5 py-2" trailing-icon="lucide:arrow-right">ปรึกษาฟรี</UButton>
                        </LineLink>
                    </slot>
                </div>
            </div>
        </div>

        <div class="h-2 md:h-3 bg-primary" />
    </section>
</template>