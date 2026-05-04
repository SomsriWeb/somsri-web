<script setup lang="ts">
import { thead } from '#build/ui/prose';

// VARIABLE
const { data } = useAsyncData('new-hat-styles', () => queryCollection('hatStyles').order('order', 'ASC').all());
</script>
<template>
    <div>
        <slot name="title">
            <ProseH2>ชนิดหมวกและตารางราคา</ProseH2>
        </slot>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="item in data" :key="item.label">
                <ProseImg :src="item.image" class="mb-1" />
                <p class="text-center text-primary text-xl">{{ item.label }}</p>
                <table class="w-full text-sm border-collapse item">
                    <thead>
                        <tr>
                            <th class="py-2 text-left font-semibold">จำนวน</th>
                            <th class="py-2 text-center font-medium">100</th>
                            <th class="py-2 text-center font-medium">300</th>
                            <th class="py-2 text-center font-medium">500</th>
                            <th class="py-2 text-center font-bold text-primary">1,000+</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-3 text-left font-semibold">ราคา</td>
                            <td class="py-3 text-center font-medium">{{item.priceperunit [0]}}</td>
                            <td class="py-3 text-center font-medium">{{item.priceperunit [1]}}</td>
                            <td class="py-3 text-center font-medium">{{item.priceperunit [2]}}</td>
                            <td class="py-3 text-center font-bold text-primary">{{item.priceperunit [3]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
