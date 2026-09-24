<script setup lang="ts">
import type { FabricRatingRow } from './FabricRatingTable.types';
import { DEFAULT_RATING_HEADERS, DEFAULT_RATING_ROWS } from './fabricRatingTable.defaults';

interface Props {
    /** หัวข้อด้านบนตาราง เช่น "ตารางเปรียบเทียบเนื้อผ้าแนะนำเสื้อเจอร์ซี่ย์ (Jersey)" */
    title?: string;
    /** หัวคอลัมน์ซ้ายบนสุด (การ์ดซ้าย) */
    firstColumnLabel?: string;
    /** หัวคอลัมน์ผ้าแต่ละชนิด */
    fabricHeaders?: string[];
    /** แถวข้อมูล — `ratings.length` ต้องเท่ากับจำนวนหัวคอลัมน์ผ้า ค่าคะแนนเป็นตัวเลข 1-5 */
    rows?: FabricRatingRow[];
}

const props = defineProps<Props>();

const firstColumnLabel = computed(() => props.firstColumnLabel ?? 'หัวข้อสรรพคุณ');
const fabricHeaders = computed(() => props.fabricHeaders ?? [...DEFAULT_RATING_HEADERS]);
const rows = computed(() => props.rows ?? DEFAULT_RATING_ROWS.map((r) => ({ ...r, ratings: [...r.ratings] })));

// ===== Outer grid: ควบคุม track ของแถวทั้งหมด — การ์ดซ้าย/ขวาเป็น subgrid ที่ inherit track นี้
// ทำให้แถวสูงเท่ากันเป๊ะเสมอ ไม่ว่าเนื้อหาแต่ละฝั่งจะกี่บรรทัดก็ตาม (ไม่ต้องเดา min-height เอง) =====
const outerGridStyle = computed(() => ({
    gridTemplateColumns: '210px 1.25rem 1fr',
    gridTemplateRows: `64px repeat(${rows.value.length}, minmax(6rem, auto))`,
}));

const dataCardColumnStyle = computed(() => ({
    gridTemplateColumns: `repeat(${fabricHeaders.value.length}, minmax(0, 1fr))`,
}));

function rowLine(ri: number) {
    // ri = index ของแถวข้อมูล (0-based) -> แถวที่ 2 เป็นต้นไปใน grid (แถว 1 คือ header)
    return { gridRow: ri + 2 };
}
</script>

<template>
    <div class="fabric-rating-table my-6">
        <h2 v-if="title" class="mb-6 text-center text-xl font-bold text-primary md:text-2xl">
            {{ title }}
        </h2>

        <div class="overflow-x-auto">
            <div class="grid min-w-[46rem]" :style="outerGridStyle">
            <!-- ===== การ์ดซ้าย: หัวข้อสรรพคุณ (subgrid ให้แถว inherit ความสูงจาก outer grid) ===== -->
            <div
                class="grid overflow-hidden rounded-2xl bg-white shadow-md"
                style="grid-column: 1; grid-row: 1 / -1; grid-template-rows: subgrid; grid-template-columns: 1fr"
            >
                <div
                    style="grid-row: 1"
                    class="flex items-center justify-center bg-primary px-4 text-center text-base font-bold text-white"
                >
                    {{ firstColumnLabel }}
                </div>
                <div
                    v-for="(row, ri) in rows"
                    :key="ri"
                    :style="rowLine(ri)"
                    class="flex flex-col items-center justify-center gap-0.5 px-4 py-3 text-center"
                    :class="ri < rows.length - 1 ? 'border-b border-stone-200' : ''"
                >
                    <span class="text-base font-bold text-stone-900">{{ row.label }}</span>
                    <span v-if="row.labelEn" class="text-sm text-stone-500">({{ row.labelEn }})</span>
                </div>
            </div>

            <!-- ===== การ์ดขวา: ตารางคะแนน (subgrid ใช้แถวเดียวกับ outer grid) ===== -->
            <div
                class="grid overflow-hidden rounded-2xl bg-white shadow-md"
                style="grid-column: 3; grid-row: 1 / -1; grid-template-rows: subgrid; grid-template-columns: 1fr"
            >
                <div style="grid-row: 1" class="grid bg-primary" :style="dataCardColumnStyle">
                    <div
                        v-for="(h, i) in fabricHeaders"
                        :key="i"
                        class="flex items-center justify-center px-2 text-center text-base font-bold text-white"
                    >
                        {{ h }}
                    </div>
                </div>

                <div
                    v-for="(row, ri) in rows"
                    :key="ri"
                    :style="rowLine(ri)"
                    class="grid"
                    :class="ri < rows.length - 1 ? 'border-b border-stone-200' : ''"
                >
                    <div class="grid h-full" :style="dataCardColumnStyle">
                        <div
                            v-for="(cell, ci) in row.ratings"
                            :key="ci"
                            class="flex items-center justify-center gap-1.5 text-xl font-bold text-primary md:text-2xl"
                        >
                            {{ cell }}
                            <Icon name="lucide:star" class="shrink-0" size="1.1rem" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>