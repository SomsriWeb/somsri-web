<script setup lang="ts">
interface PriceColumn {
    name: string;
    sub?: string;
}
interface PriceRow {
    /** ข้อความช่วงจำนวนที่แสดงในตาราง เช่น "100–250" */
    qty: string;
    /** ราคาต่อตัวตามลำดับคอลัมน์ */
    prices: number[];
}
interface PriceNote {
    title: string;
    text: string;
}

interface Props {
    qtyLabel?: string;
    columns: PriceColumn[];
    rows: PriceRow[];
    /** แถวสุดท้ายสำหรับจำนวนเกินตาราง เช่น "700+" */
    overflowLabel?: string;
    overflowText?: string;
    notes?: PriceNote[];
}
const { qtyLabel = 'จำนวน (ตัว)', columns, rows, overflowLabel, overflowText, notes = [] } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const formatPrice = (n: number) => '฿' + n.toLocaleString('th-TH');
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                <table class="w-full min-w-[45rem] border-collapse">
                    <thead>
                        <tr class="bg-primary text-white">
                            <th scope="col" class="px-4 py-3 text-left text-sm font-bold md:text-base">{{ qtyLabel }}</th>
                            <th v-for="(col, i) in columns" :key="i" scope="col" class="px-4 py-3 text-center text-sm font-bold md:text-base">
                                {{ col.name }}
                                <small v-if="col.sub" class="block text-xs font-normal opacity-85">{{ col.sub }}</small>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.qty" class="border-b border-stone-200">
                            <th scope="row" class="px-4 py-3 text-left text-sm font-bold text-stone-900 md:text-base">{{ row.qty }}</th>
                            <td v-for="(price, i) in row.prices" :key="i" class="px-4 py-3 text-center text-base font-bold text-stone-900 md:text-lg">
                                {{ formatPrice(price) }}
                            </td>
                        </tr>
                        <tr v-if="overflowLabel">
                            <th scope="row" class="px-4 py-3 text-left text-sm font-bold text-stone-900 md:text-base">{{ overflowLabel }}</th>
                            <td :colspan="columns.length" class="px-4 py-3 text-center text-base font-bold text-stone-900 md:text-lg">
                                {{ overflowText }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="notes.length" class="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="(note, i) in notes" :key="i" class="rounded-xl border border-stone-200 bg-white px-3.5 py-3">
                    <b class="text-primary">{{ note.title }}</b>
                    {{ note.text }}
                </div>
            </div>
        </div>
    </section>
</template>
