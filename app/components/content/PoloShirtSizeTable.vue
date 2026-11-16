<script setup lang="ts">
interface SizeRow {
    label: string;
    /** ค่าตามลำดับไซส์ ใส่ "–" ถ้าไม่มีไซส์นั้น */
    values: (string | number)[];
}
interface Props {
    headerLabel?: string;
    sizes: string[];
    rows: SizeRow[];
    caption?: string;
}
const { headerLabel = 'ไซส์ (นิ้ว)', sizes, rows, caption } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const cell = 'border border-stone-200 px-2.5 py-2.5 text-center';
</script>

<template>
    <section class="scroll-mt-20 bg-stone-100 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                <table class="w-full min-w-[40rem] border-collapse bg-white text-sm">
                    <caption v-if="caption" class="caption-bottom px-3.5 py-2.5 text-left text-xs text-slate-500">{{ caption }}</caption>
                    <thead>
                        <tr class="bg-primary text-white">
                            <th scope="col" :class="[cell, 'font-bold']">{{ headerLabel }}</th>
                            <th v-for="size in sizes" :key="size" scope="col" :class="[cell, 'font-bold']">{{ size }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.label">
                            <th scope="row" :class="[cell, 'bg-[#fcfafa] font-bold']">{{ row.label }}</th>
                            <td v-for="(value, i) in row.values" :key="i" :class="cell">{{ value }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
