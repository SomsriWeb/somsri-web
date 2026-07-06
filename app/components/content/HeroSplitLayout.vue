<script setup lang="ts">
// PROPS
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
    screenHeight?: boolean;
    imageAnchor?: 'left' | 'right' | 'center' | string;
}
const { image, titleAsTag = 'h1', alt = '', screenHeight = true, imageAnchor = 'center' } = defineProps<Props>();
</script>

<template>
    <div class="w-full bg-white overflow-hidden">
        <div
            class="flex flex-col lg:flex-row lg:items-stretch"
            :class="{ 'lg:min-h-screen': screenHeight }"
        >
            <div class="flex flex-col justify-center items-center lg:items-start px-6 py-12 lg:px-16 lg:py-16 lg:w-1/2 xl:px-24">
                
                <p v-if="$slots['secondary-title']" class="font-bold text-lg lg:text-2xl text-primary mb-2 text-center lg:text-left">
                    <slot name="secondary-title" mdc-unwrap="p" />
                </p>

                <component
                    :is="titleAsTag"
                    class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-center lg:text-left"
                >
                    <span class="text-primary">
                        <slot name="title" mdc-unwrap="p" />
                    </span>
                    <template v-if="$slots['title-secondary']">
                        <br />
                        <span class="text-stone-700">
                            <slot name="title-secondary" mdc-unwrap="p" />
                        </span>
                    </template>
                </component>

                <p
                    v-if="$slots.description"
                    class="font-light text-stone-600 leading-relaxed mb-8 text-center lg:text-left"
                >
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mb-6 w-full flex flex-col items-center lg:items-start">
                    <slot />
                </div>

                <div>
                    <slot name="cta">
                        <LineLink>
                            <UButton>ปรึกษาฟรี</UButton>
                        </LineLink>
                    </slot>
                </div>
            </div>

            <div class="lg:w-1/2 aspect-[4/3] lg:aspect-auto">
                <img
                    :src="image"
                    :alt="alt"
                    class="w-full h-full object-cover"
                    :style="{ objectPosition: imageAnchor === 'left' ? 'left center' : imageAnchor === 'right' ? 'right center' : 'center center' }"
                />
            </div>
        </div>
    </div>
</template>
