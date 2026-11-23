<script setup lang="ts">
interface PriceRow {
    fabric: string;
    note?: string;
    prices: number[];
}

interface Props {
    title: string;
    description?: string;
    columns: string[];
    rows: PriceRow[];
    note?: string;
}

defineProps<Props>();
</script>

<template>
    <section class="scroll-mt-24 px-5 py-10 lg:px-18 lg:py-14">
        <div class="mx-auto max-w-6xl">
            <header class="mb-6">
                <ProseH2>{{ title }}</ProseH2>

                <p
                    v-if="description"
                    class="mt-3 text-base text-stone-600"
                >
                    {{ description }}
                </p>
            </header>

            <p class="mb-2 text-sm text-stone-500 md:hidden">
                เลื่อนตารางซ้าย–ขวาเพื่อดูราคาทั้งหมด
            </p>

            <div
                role="region"
                :aria-label="title"
                tabindex="0"
                class="overflow-x-auto rounded-xl border border-stone-200 focus-visible:outline-2 focus-visible:outline-primary"
            >
                <table class="w-full min-w-[36rem] border-collapse text-sm md:text-base">
                    <caption class="sr-only">
                        ราคาต่อตัวตามเนื้อผ้าและจำนวน หน่วยบาท
                    </caption>

                    <thead>
                        <tr class="bg-primary text-white">
                            <th
                                scope="col"
                                class="sticky left-0 z-20 min-w-40 bg-primary px-4 py-3 text-left"
                            >
                                เนื้อผ้า
                            </th>

                            <th
                                v-for="column in columns"
                                :key="column"
                                scope="col"
                                class="px-4 py-3 text-center whitespace-nowrap"
                            >
                                {{ column }} ตัว
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="row in rows"
                            :key="row.fabric"
                            class="border-t border-stone-200"
                        >
                            <th
                                scope="row"
                                class="sticky left-0 z-10 bg-white px-4 py-3 text-left"
                            >
                                <span class="block font-semibold text-stone-900">
                                    {{ row.fabric }}
                                </span>

                                <span
                                    v-if="row.note"
                                    class="mt-1 block text-xs font-normal text-stone-500"
                                >
                                    {{ row.note }}
                                </span>
                            </th>

                            <td
                                v-for="(price, index) in row.prices"
                                :key="index"
                                class="bg-white px-4 py-3 text-center font-semibold text-stone-900"
                            >
                                {{ price.toLocaleString('th-TH') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p
                v-if="note"
                class="mt-3 text-sm leading-relaxed text-stone-500"
            >
                {{ note }}
            </p>
        </div>
    </section>
</template>