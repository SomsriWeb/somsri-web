<script setup lang="ts">
interface SpecRow {
    label: string;
    value: string;
}
interface Props {
    /** ตารางสเปกบริการด้านขวา */
    spec?: SpecRow[];
    specLabel?: string;
}
const { spec = [], specLabel } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    /** ย่อหน้านิยาม มีเส้นสีด้านซ้าย (คำตัวหนาจะเป็นสี primary) */
    definition?: () => unknown;
    description?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="grid items-start gap-7 px-6 lg:px-18 lg:grid-cols-[1.2fr_1fr]">
            <div>
                <PoloShirtSectionHead class="!mb-0">
                    <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                    <template #title><slot name="title" mdc-unwrap="p" /></template>
                </PoloShirtSectionHead>
                <div
                    v-if="$slots.definition"
                    class="mt-4 border-l-4 border-primary pl-4 text-base text-stone-900 md:text-lg [&_strong]:text-primary"
                >
                    <slot name="definition" mdc-unwrap="p" />
                </div>
                <div v-if="$slots.description" class="mt-3 text-sm text-slate-500 md:text-base">
                    <slot name="description" mdc-unwrap="p" />
                </div>
            </div>

            <table
                v-if="spec.length"
                :aria-label="specLabel"
                class="w-full overflow-hidden rounded-xl border border-stone-200 bg-white text-sm md:text-base"
                style="border-collapse: separate; border-spacing: 0"
            >
                <tbody>
                    <tr v-for="(row, i) in spec" :key="i">
                        <th
                            class="w-2/5 bg-[#fcfafa] px-4 py-2.5 text-left align-top font-normal text-slate-500"
                            :class="i < spec.length - 1 ? 'border-b border-stone-200' : ''"
                        >
                            {{ row.label }}
                        </th>
                        <td class="px-4 py-2.5 align-top" :class="i < spec.length - 1 ? 'border-b border-stone-200' : ''">
                            {{ row.value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
