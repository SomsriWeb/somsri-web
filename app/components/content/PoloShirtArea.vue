<script setup lang="ts">
interface Props {
    /** ป้ายพื้นที่ให้บริการ */
    tags?: string[];
    address?: string;
    phone?: string;
    /** เช่น "tel:024300678" */
    phoneHref?: string;
    /** URL สำหรับ iframe Google Maps (output=embed) */
    mapSrc?: string;
    mapTitle?: string;
}
const { tags = [], address, phone, phoneHref, mapSrc, mapTitle = 'แผนที่' } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="scroll-mt-20 bg-primary/12 py-10 md:py-16 lg:scroll-mt-24">
        <div class="grid items-start gap-7 px-6 lg:px-18 lg:grid-cols-2">
            <div>
                <PoloShirtSectionHead on-tint class="!mb-0">
                    <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                    <template #title><slot name="title" mdc-unwrap="p" /></template>
                    <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
                </PoloShirtSectionHead>

                <div v-if="tags.length" class="mt-4 flex flex-wrap gap-2">
                    <span v-for="tag in tags" :key="tag" class="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm text-stone-900">
                        {{ tag }}
                    </span>
                </div>

                <div class="mt-5 grid gap-2 text-sm md:text-base">
                    <div v-if="address" class="flex gap-2.5">
                        <UIcon name="lucide:map-pin" class="mt-[0.2em] size-5 shrink-0 text-primary" />
                        <span>{{ address }}</span>
                    </div>
                    <div v-if="phone" class="flex gap-2.5">
                        <UIcon name="lucide:phone" class="mt-[0.2em] size-5 shrink-0 text-primary" />
                        <a v-if="phoneHref" :href="phoneHref" class="text-primary">{{ phone }}</a>
                        <span v-else>{{ phone }}</span>
                    </div>
                </div>
            </div>

            <iframe
                v-if="mapSrc"
                :src="mapSrc"
                :title="mapTitle"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="aspect-[4/3] w-full rounded-xl border-0 bg-stone-100"
            />
        </div>
    </section>
</template>
