<script setup lang="ts">
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
}

const {
    image,
    titleAsTag = 'h2',
    alt = '',
} = defineProps<Props>();
</script>

<template>
    <div class="px-0 md:px-0">
        <div
            class="relative w-full flex items-center justify-center text-center px-3 sm:px-6 md:px-12 py-4 sm:py-6 md:py-10 overflow-hidden rounded-xl aspect-[12/5] md:aspect-auto md:min-h-[16.25rem]"
        >
            <NuxtPicture
                :src="image"
                :alt="alt"
                class="absolute inset-0 w-full h-full pointer-events-none"
                :img-attrs="{
                    class: 'w-full h-full object-cover object-center'
                }"
            />

            <div class="relative z-10 flex flex-col items-center gap-1 sm:gap-2 md:gap-3 max-w-md">
                <component
                    :is="titleAsTag"
                    v-if="$slots.title"
                    class="text-base sm:text-xl md:text-3xl font-bold text-primary leading-tight md:leading-snug"
                >
                    <slot name="title" mdc-unwrap="p" />
                </component>

                <p v-if="$slots.description" class="hidden sm:block text-sm md:text-base text-primary font-light">
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mt-1 md:mt-3">
                    <slot />
                </div>

                <div class="mt-1 sm:mt-2 md:mt-3">
                    <slot name="cta" />
                </div>
            </div>
        </div>
    </div>
</template>