<script setup lang="ts">
interface Technique {
    image: string;
    /** รูปที่เปลี่ยนไปแสดงเมื่อเอาเมาส์ชี้การ์ด */
    hoverImage?: string;
    alt?: string;
    title: string;
    text: string;
    /** บรรทัดท้ายการ์ด เช่น "เหมาะ: โลโก้อก" */
    best?: string;
}
interface Props {
    items: Technique[];
}
const { items } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <article v-for="item in items" :key="item.title" class="group flex flex-col rounded-xl border border-stone-200 bg-white p-5">
                    <div class="relative mb-3.5 aspect-square overflow-hidden rounded-xl bg-primary/12">
                        <NuxtImg
                            :src="item.image"
                            :alt="item.alt || item.title"
                            loading="lazy"
                            format="webp"
                            class="absolute inset-0 h-full w-full object-cover"
                        />
                        <NuxtImg
                            v-if="item.hoverImage"
                            :src="item.hoverImage"
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            format="webp"
                            class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                    </div>
                    <h3 class="text-base font-bold text-stone-900 md:text-lg">{{ item.title }}</h3>
                    <p class="mt-1.5 text-sm text-slate-500">{{ item.text }}</p>
                    <div v-if="item.best" class="mt-auto pt-2.5 text-xs font-bold text-[#76182f]">{{ item.best }}</div>
                </article>
            </div>
        </div>
    </section>
</template>
