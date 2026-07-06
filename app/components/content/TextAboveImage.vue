<script setup lang="ts">
// PROPS
interface Props {
    image: string;
    alt?: string;
}
const { image, alt = '' } = defineProps<Props>();
</script>

<template>
    <div class="w-full bg-white">
        <!-- Top: Centered text content -->
        <div class="text-center px-6 py-4 lg:py-16 max-w-3xl mx-auto">
            <component
                v-if="$slots.title"
                is="h2"
                class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4"
            >
                <slot name="title" mdc-unwrap="p" />
            </component>

            <p v-if="$slots.description" class="text-stone-600 font-light leading-relaxed">
                <slot name="description" mdc-unwrap="p" />
            </p>

            <div v-if="$slots.default" class="mt-6">
                <slot />
            </div>
        </div>

        <!-- Bottom: Full-width image -->
        <div class="w-full">
            <img
                :src="image"
                :alt="alt"
                class="w-full object-cover"
            />
        </div>
    </div>
</template>