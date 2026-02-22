<script setup lang="ts">
interface Slots {
    title(): unknown;
    default(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="w-full max-w-5xl mx-auto px-5 lg:px-[4.6rem] pb-2">
        <h2 class="text-primary text-left text-2xl md:text-3xl font-bold mb-6">
            <slot name="title" mdc-unwrap="p" />
        </h2>
        <div class="w-5/6 mx-auto">
            <slot />
        </div>
    </section>
</template>
