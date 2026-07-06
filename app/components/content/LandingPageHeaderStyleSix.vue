<script setup lang="ts">
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
    screenHeight?: boolean;
    imageAnchor?: 'left' | 'right' | 'center' | 'top' | 'bottom' | string;
}
const { 
    image, 
    titleAsTag = 'h1', 
    alt = '', 
    screenHeight = true, 
    imageAnchor = 'center center' 
} = defineProps<Props>();
</script>

<template>
    <div
        class="relative flex flex-col items-center justify-center text-center px-4 w-full overflow-hidden"
        :class="screenHeight ? 'h-dvh' : 'py-20 min-h-[30rem]'"
    >
        <!-- BG image เต็มจอพอดี เหมือน video ในไฟล์ index -->
        <img
            :src="image"
            :alt="alt"
            class="absolute inset-0 h-full w-full object-cover"
            :style="{ objectPosition: imageAnchor }"
        />

        <div class="absolute inset-0 bg-[#D6D6D6]/70 z-0" />

        <div class="relative z-10 flex flex-col items-center justify-center gap-4 max-w-3xl w-full mx-auto h-full">
            <p v-if="$slots['secondary-title']" class="font-bold text-lg lg:text-2xl text-primary">
                <slot name="secondary-title" mdc-unwrap="p" />
            </p>

            <component :is="titleAsTag" class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span class="text-primary block"><slot name="title" mdc-unwrap="p" /></span>
                <span class="text-stone-700 block mt-0"><slot name="title-secondary" mdc-unwrap="p" /></span>
            </component>

            <p v-if="$slots.description" class="font-light mt-2 text-stone-700 text-base md:text-lg">
                <slot name="description" mdc-unwrap="p" />
            </p>
            <div v-if="$slots.default" class="mt-5 w-full flex justify-center">
                <slot />
            </div>
            <div class="mt-6">
                <slot name="cta">
                    <LineLink>
                        <UButton size="xl" class="px-8 py-3">ติดต่อเราตอนนี้ <UIcon name="i-heroicons-arrow-right" class="ml-2"/></UButton>
                    </LineLink>
                </slot>
            </div>
        </div>
    </div>
</template>