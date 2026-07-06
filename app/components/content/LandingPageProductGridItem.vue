<script setup lang="ts">
import { useAttrs } from 'vue'

interface Props {
    image: string;
    alt?: string;
}
defineProps<Props>();

const attrs = useAttrs();

const link = attrs.to || attrs.href || '';
</script>

<template>
    <component :is="link ? 'a' : 'div'" :href="link" class="relative block overflow-hidden bg-[#F0EBE3] group cursor-pointer">
        
        <img :src="image" :alt="alt" class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
        
        <div v-if="$slots.default" class="absolute inset-x-0 bottom-12 flex justify-center">
            <div class="border-2 border-primary text-primary rounded-2xl px-4 py-1.5 font-extrabold text-sm md:text-base md:px-8 md:py-2 tracking-wide bg-transparent transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm group-hover:shadow-md">
                <slot />
            </div>
        </div>

    </component>
</template>