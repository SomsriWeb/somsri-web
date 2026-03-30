<script setup lang="ts">
import { ref } from 'vue';

// PROPS
interface Props {
    /**
     * ภาษาที่ต้องการแสดง
     * @default th
     */
    lang?: 'th' | 'en';
}
const { lang = 'th' } = defineProps<Props>();

// SLOTS
interface Slots {
    /**
     * Component ที่จะเอามาแสดง
     */
    default(): unknown;
}
defineSlots<Slots>();

const accordionItems = [
    {
        question: 'ซักแล้วลายจะหลุดไหม',
        answer: 'ไม่หลุด ไม่แตก ไม่ลอก เพราะใช้การพิมพ์แบบ Sublimation สีจะซึมเข้าไปในเนื้อผ้า ทำให้ลายติดทน ซักได้ยาวๆ สีไม่ซีดง่าย',
    },
    {
        question: 'ทำขั้นต่ำกี่ตัว?',
        answer: 'เริ่มต้นขั้นต่ำ 100 ตัวเท่านั้น',
    },
    {
        question: 'ใช้เวลาผลิตกี่วัน?',
        answer: 'รับประกันได้รับสินค้าภายใน 90 วัน',
    },
    {
        question: 'เสื้อจะหดหรือย้วยไหม?',
        answer: 'ไม่หด ไม่ย้วยง่าย เพราะเป็นผ้าโพลีเอสเตอร์ อยู่ทรงดี ซักแล้วไม่เสียรูป',
    },
];

const isOpen = ref([true, false, false, false]);

function toggleAccordion(index: number) {
    isOpen.value[index] = !isOpen.value[index];
}
</script>

<template>
    <div class="max-w-2xl mx-auto px-4">
        <h2 class="text-xl font-semibold text-[#a52241] mb-2">คำถามที่ลูกค้าชอบถาม</h2>

        <div class="space-y-4">
            <div class="rounded-lg bg-white shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)] border border-[#e5e5e5]">
                <div class="flex items-center p-3 text-lg font-semibold cursor-pointer border-3 border-[#e5e5e5] rounded-lg select-none" @click="toggleAccordion(0)">
                    <span class="mr-3 text-2xl font-bold text-[#a52241]">{{ isOpen[0] ? '−' : '+' }}</span>
                    ซักแล้วลายจะหลุดไหม
                </div>
                <div class="text-gray-600 p-4" v-show="isOpen[0]">ไม่หลุด ไม่แตก ไม่ลอก เพราะใช้การพิมพ์แบบ Sublimation สีจะซึมเข้าไปในเนื้อผ้า ทำให้ลายติดทน ซักได้ยาวๆ สีไม่ซีดง่าย</div>
            </div>

            <div class="rounded-lg bg-white shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)] border border-[#e5e5e5]">
                <div class="flex items-center p-3 text-lg font-semibold cursor-pointer border-3 border-[#e5e5e5] rounded-lg select-none" @click="toggleAccordion(1)">
                    <span class="mr-3 text-2xl font-bold text-[#a52241]">{{ isOpen[1] ? '−' : '+' }}</span>
                    ทำขั้นต่ำกี่ตัว?
                </div>
                <div class="text-gray-600 p-4" v-show="isOpen[1]">เริ่มต้นขั้นต่ำ 100 ตัวเท่านั้น</div>
            </div>

            <div class="rounded-lg bg-white shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)] border border-[#e5e5e5]">
                <div class="flex items-center p-3 text-lg font-semibold cursor-pointer border-3 border-[#e5e5e5] rounded-lg select-none" @click="toggleAccordion(2)">
                    <span class="mr-3 text-2xl font-bold text-[#a52241]">{{ isOpen[2] ? '−' : '+' }}</span>
                    ใช้เวลาผลิตกี่วัน?
                </div>
                <div class="text-gray-600 p-4" v-show="isOpen[2]">รับประกันได้รับสินค้าภายใน 90 วัน</div>
            </div>

            <div class="rounded-lg bg-white shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)] border border-[#e5e5e5]">
                <div class="flex items-center p-3 text-lg font-semibold cursor-pointer border-3 border-[#e5e5e5] rounded-lg select-none" @click="toggleAccordion(3)">
                    <span class="mr-3 text-2xl font-bold text-[#a52241]">{{ isOpen[3] ? '−' : '+' }}</span>
                    เสื้อจะหดหรือย้วยไหม?
                </div>
                <div class="text-gray-600 p-4" v-show="isOpen[3]">ไม่หด ไม่ย้วยง่าย เพราะเป็นผ้าโพลีเอสเตอร์ อยู่ทรงดี ซักแล้วไม่เสียรูป</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.border-3 {
    border-width: 3px;
}
</style>
