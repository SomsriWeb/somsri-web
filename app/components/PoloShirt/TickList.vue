<script setup lang="ts">
/** รายการแบบมีวงกลม ✓ (check) หรือ ! (warn) นำหน้า */
export type TickItem = string | { title?: string; text: string };

interface Props {
    items: TickItem[];
    variant?: 'check' | 'warn';
}
const { items, variant = 'check' } = defineProps<Props>();
</script>

<template>
    <ul class="mt-3 grid gap-2.5">
        <li v-for="(item, i) in items" :key="i" class="relative pl-7">
            <span
                class="absolute top-[0.2em] left-0 grid size-5 place-items-center rounded-full text-[0.6rem] font-bold text-white"
                :class="variant === 'warn' ? 'bg-[#76182f]' : 'bg-primary'"
                aria-hidden="true"
            >
                {{ variant === 'warn' ? '!' : '✓' }}
            </span>
            <template v-if="typeof item === 'string'">{{ item }}</template>
            <template v-else>
                <b v-if="item.title" class="text-stone-900">{{ item.title }}:</b>
                {{ item.text }}
            </template>
        </li>
    </ul>
</template>
