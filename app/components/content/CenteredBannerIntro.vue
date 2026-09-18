<script setup lang="ts">
interface Props {
    image: string;
    imageMobile?: string;
    alt?: string;
    mobileImagePosition?: string;
}

const { image, imageMobile, alt = '', mobileImagePosition = 'object-right' } = defineProps<Props>();

interface Slots {
    title(): unknown;
    subtitle?(): unknown;
    description?(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden mt-6 mb-4 lg:mt-10 lg:mb-6">
        <!-- ===== Desktop View ===== -->
        <div class="relative hidden min-h-[20rem] lg:min-h-[24rem] xl:min-h-[26rem] w-full md:flex items-center justify-center">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <NuxtImg
                    :src="image"
                    :alt="alt"
                    class="h-full w-full object-cover object-center"
                />
            </div>

            <!-- Subtle center gradient for enhanced text contrast if needed -->
            <div class="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />

            <!-- Centered Content -->
            <div class="relative z-10 max-w-2xl lg:max-w-3xl px-6 py-10 text-center flex flex-col items-center justify-center">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3">
                    <slot name="title" mdc-unwrap="p" />
                </h2>

                <div v-if="$slots.subtitle" class="text-base sm:text-lg lg:text-xl font-bold text-stone-900 leading-snug mb-3 max-w-xl">
                    <slot name="subtitle" mdc-unwrap="p" />
                </div>

                <div v-if="$slots.description" class="text-xs sm:text-sm lg:text-base font-light text-stone-700 leading-relaxed max-w-2xl">
                    <slot name="description" mdc-unwrap="p" />
                </div>
            </div>
        </div>

        <!-- ===== Mobile View ===== -->
        <div class="relative min-h-[22rem] w-full flex items-center justify-center md:hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <NuxtImg
                    :src="imageMobile || image"
                    :alt="alt"
                    class="h-full w-full object-cover"
                    :class="[mobileImagePosition]"
                />
            </div>

            <!-- Translucent Overlay for text readability on mobile (softer on right so person is clear) -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-45% to-white/40" />

            <!-- Centered Content -->
            <div class="relative z-10 px-5 py-8 text-center flex flex-col items-center justify-center">
                <h2 class="text-3xl font-bold text-primary mb-3">
                    <slot name="title" mdc-unwrap="p" />
                </h2>

                <div v-if="$slots.subtitle" class="text-sm font-bold text-stone-900 leading-snug mb-3">
                    <slot name="subtitle" mdc-unwrap="p" />
                </div>

                <div v-if="$slots.description" class="text-xs font-light text-stone-700 leading-relaxed">
                    <slot name="description" mdc-unwrap="p" />
                </div>
            </div>
        </div>
    </section>
</template>
