<script setup lang="ts">
interface RelatedLink {
    to: string;
    /** ป้ายเล็กเหนือหัวข้อ เช่น "บทความ" */
    category?: string;
    title: string;
}
interface Props {
    items: RelatedLink[];
}
const { items } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <NuxtLink
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    class="group block rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-primary"
                >
                    <small v-if="item.category" class="text-xs font-bold text-primary">{{ item.category }}</small>
                    <h3 class="mt-1 text-base font-bold text-stone-900 transition-colors group-hover:text-primary md:text-lg">{{ item.title }}</h3>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
