<script setup lang="ts">
import type { FabricComparisonRow } from './FabricComparisonTable.types';
import { DEFAULT_FABRIC_HEADERS, DEFAULT_FABRIC_ROWS } from './fabricComparisonTable.defaults';

interface Props {
    /** หัวคอลัมน์แรก (คุณสมบัติ) */
    firstColumnLabel?: string;
    /** หัวคอลัมน์ผ้าแต่ละชนิด */
    fabricHeaders?: string[];
    /** แถวข้อมูล — `ratings.length` ต้องเท่ากับจำนวนหัวคอลัมน์ผ้า */
    rows?: FabricComparisonRow[];
}

const props = defineProps<Props>();

const firstColumnLabel = computed(() => props.firstColumnLabel ?? 'หัวข้อสรรพคุณ');
const fabricHeaders = computed(() => props.fabricHeaders ?? [...DEFAULT_FABRIC_HEADERS]);
const rows = computed(() => props.rows ?? DEFAULT_FABRIC_ROWS.map((r) => ({ ...r, ratings: [...r.ratings] })));

const cellBorder = 'border border-stone-400 px-2 py-2';
</script>

<template>
    <div class="fabric-comparison-table overflow-x-auto my-4">
        <table class="w-full min-w-xl border-collapse border border-stone-400 text-sm">
            <thead>
                <tr class="bg-stone-100">
                    <th :class="[cellBorder, 'text-left font-bold']">{{ firstColumnLabel }}</th>
                    <th
                        v-for="(h, i) in fabricHeaders"
                        :key="i"
                        :class="[cellBorder, 'text-center font-bold']"
                    >
                        {{ h }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, ri) in rows" :key="ri">
                    <td :class="[cellBorder, 'font-bold']">{{ row.label }}</td>
                    <td
                        v-for="(cell, ci) in row.ratings"
                        :key="ci"
                        :class="[cellBorder, 'text-center']"
                    >
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
