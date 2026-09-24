<script setup lang="ts">
import { ref } from 'vue';

// SLOTS
interface Slots {
    /** ป้ายเล็กสี primary เหนือหัวข้อ เช่น "คำถามที่พบบ่อย — รับผลิตกระเป๋าผ้า" */
    eyebrow(): unknown;
    /** หัวข้อใหญ่ H2 กลางหน้า */
    title(): unknown;

    'item-1-question'(): unknown;
    'item-1-answer'(): unknown;

    'item-2-question'?: () => unknown;
    'item-2-answer'?: () => unknown;

    'item-3-question'?: () => unknown;
    'item-3-answer'?: () => unknown;

    'item-4-question'?: () => unknown;
    'item-4-answer'?: () => unknown;

    'item-5-question'?: () => unknown;
    'item-5-answer'?: () => unknown;

    'item-6-question'?: () => unknown;
    'item-6-answer'?: () => unknown;

    'item-7-question'?: () => unknown;
    'item-7-answer'?: () => unknown;

    'item-8-question'?: () => unknown;
    'item-8-answer'?: () => unknown;

    'item-9-question'?: () => unknown;
    'item-9-answer'?: () => unknown;

    'item-10-question'?: () => unknown;
    'item-10-answer'?: () => unknown;
}
const slots = defineSlots<Slots>();

// รองรับสูงสุด 10 ข้อ แต่แสดงเฉพาะข้อที่มี question slot จริงตามที่ใส่มาใน Markdown
const activeIndexes = computed(() => Array.from({ length: 10 }, (_, i) => i + 1).filter((n) => !!slots[`item-${n}-question`]));

const isOpen = ref<Record<number, boolean>>({ 1: true });

function toggle(n: number) {
    isOpen.value[n] = !isOpen.value[n];
}
</script>

<template>
    <section class="mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <div class="mx-auto max-w-2xl text-center">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
            <div v-for="n in activeIndexes" :key="n" class="self-start overflow-hidden rounded-xl border border-stone-200 bg-white">
                <button
                    type="button"
                    class="flex w-full items-center justify-between gap-3 px-5 py-4 text-left select-none"
                    @click="toggle(n)"
                >
                    <span class="text-sm font-bold text-primary md:text-base">
                        <slot :name="`item-${n}-question`" mdc-unwrap="p" />
                    </span>
                    <Icon
                        name="lucide:chevron-down"
                        class="h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200"
                        :class="isOpen[n] ? 'rotate-180' : ''"
                    />
                </button>

                <div v-show="isOpen[n]" class="px-5 pb-4 text-sm text-stone-600 md:text-base">
                    <slot :name="`item-${n}-answer`" mdc-unwrap="p" />
                </div>
            </div>
        </div>
    </section>
</template>