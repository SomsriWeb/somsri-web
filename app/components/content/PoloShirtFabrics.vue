<script setup lang="ts">
interface FabricSpec {
    label: string;
    value: string;
}
interface Fabric {
    image: string;
    alt?: string;
    /** ป้ายราคาเหนือชื่อผ้า */
    price?: string;
    name: string;
    specs?: FabricSpec[];
}
interface ComparisonRow {
    label: string;
    /** คะแนนตามลำดับคอลัมน์ ใส่ null = ไม่รองรับ (แสดง –) */
    scores: (number | null)[];
}
interface Comparison {
    label: string;
    columns: string[];
    rows: ComparisonRow[];
    /** คะแนนเต็ม */
    max?: number;
}

interface Props {
    fabrics: Fabric[];
    comparison?: Comparison;
}
const { fabrics, comparison } = defineProps<Props>();

interface Slots {
    eyebrow?: () => unknown;
    title(): unknown;
    description?: () => unknown;
}
defineSlots<Slots>();

const maxScore = computed(() => comparison?.max ?? 3);
</script>

<template>
    <section class="scroll-mt-20 py-10 md:py-16 lg:scroll-mt-24">
        <div class="px-6 lg:px-18">
            <PoloShirtSectionHead>
                <template v-if="$slots.eyebrow" #eyebrow><slot name="eyebrow" mdc-unwrap="p" /></template>
                <template #title><slot name="title" mdc-unwrap="p" /></template>
                <template v-if="$slots.description" #description><slot name="description" mdc-unwrap="p" /></template>
            </PoloShirtSectionHead>

            <div class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                <article
                    v-for="fabric in fabrics"
                    :key="fabric.name"
                    class="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3.5 md:p-5"
                >
                    <NuxtImg
                        :src="fabric.image"
                        :alt="fabric.alt || fabric.name"
                        loading="lazy"
                        format="webp"
                        class="aspect-[4/3] w-full rounded-xl bg-primary/12 object-cover"
                    />
                    <span v-if="fabric.price" class="text-xs font-bold tracking-wide text-primary">{{ fabric.price }}</span>
                    <h3 class="-mt-2 text-base font-bold text-stone-900 md:text-lg">{{ fabric.name }}</h3>
                    <dl v-if="fabric.specs?.length" class="text-sm">
                        <template v-for="spec in fabric.specs" :key="spec.label">
                            <dt class="mt-1.5 text-xs text-slate-500">{{ spec.label }}</dt>
                            <dd class="text-stone-900">{{ spec.value }}</dd>
                        </template>
                    </dl>
                </article>
            </div>

            <div v-if="comparison" class="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
                <table class="w-full min-w-[40rem] border-collapse">
                    <thead>
                        <tr class="bg-primary text-white">
                            <th scope="col" class="px-4 py-3 text-left text-sm font-bold md:text-base">{{ comparison.label }}</th>
                            <th v-for="col in comparison.columns" :key="col" scope="col" class="px-4 py-3 text-center text-sm font-bold md:text-base">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, ri) in comparison.rows" :key="row.label" :class="ri < comparison.rows.length - 1 ? 'border-b border-stone-200' : ''">
                            <th scope="row" class="px-4 py-3 text-left text-sm font-bold text-stone-900 md:text-base">{{ row.label }}</th>
                            <td v-for="(score, ci) in row.scores" :key="ci" class="px-4 py-3 text-center text-sm tracking-[0.15em]">
                                <template v-if="score == null">–</template>
                                <span v-else role="img" :aria-label="`${score} จาก ${maxScore}`">
                                    <span class="text-primary">{{ '●'.repeat(score) }}</span>
                                    <span class="text-[#e7cbd2]">{{ '●'.repeat(Math.max(0, maxScore - score)) }}</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
