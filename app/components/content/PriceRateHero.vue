<script setup lang="ts">
interface Slots {
    title(): unknown;
    description(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div class="md:max-w-xs md:shrink-0">
            <h2 class="text-2xl leading-snug font-bold text-primary md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>

            <LineLink>
                <UButton trailing-icon="i-lucide-arrow-right" class="mt-5 inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white" size="md">
                    สอบถามราคา
                </UButton>
            </LineLink>
        </div>

        <div class="text-sm leading-relaxed text-stone-600 md:max-w-xl md:pt-2 md:text-base">
            <slot name="description" mdc-unwrap="p" />
        </div>
    </div>
</template>