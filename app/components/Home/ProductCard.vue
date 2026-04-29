<script setup lang="ts">
// PROPS
interface Props {
    name: string;
    url: string;
    image: string;
    alt?: string;
}
defineProps<Props>();

</script>
<template>
    <div class="relative rounded-2xl overflow-hidden">
        <ProseImg :src="image" :alt="alt || name" class="aspect-square object-cover" />
        <div class="absolute inset-0 bg-black/15" />
        <div class="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex flex-col items-center gap-2">
            <h3 class="text-white text-base sm:text-lg md:text-2xl lg:text-4xl font-bold leading-tight line-clamp-2 text-center">
                {{ name }}
            </h3>
            <NuxtLink :to="url">
                <UButton
                    color="neutral"
                    variant="soft"
                    class="text-primary! text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                >
                    <slot name="cta-text">ดูเพิ่มเติม</slot>
                </UButton>
            </NuxtLink>
        </div>
    </div>
</template>
