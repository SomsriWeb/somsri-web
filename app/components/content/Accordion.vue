<script setup lang="ts">
import { ref } from 'vue';

// PROPS
type AccordionItem = {
    question: string;
    answer: string;
};

interface Props {
    /**
     * ภาษาที่ต้องการแสดง
     * @default th
     */
    lang?: 'th' | 'en';

    /** รายการคำถาม/คำตอบ กำหนดจำนวนได้จาก Markdown */
    items?: AccordionItem[];
}
const props = withDefaults(defineProps<Props>(), {
    lang: 'th',
    items: undefined,
});

// SLOTS
interface Slots {
    /** หัวข้อส่วน accordion */
    title(): unknown;
    /** คำอธิบายใต้หัวข้อ */
    description(): unknown;
}
defineSlots<Slots>();

const defaultItems: AccordionItem[] = [
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

const accordionItems = computed<AccordionItem[]>(() => {
    const items = props.items?.filter((it) => it?.question && it?.answer) ?? [];
    return items.length > 0 ? items : defaultItems;
});

const isOpen = ref<boolean[]>([]);

watchEffect(() => {
    const len = accordionItems.value.length;
    // เปิดอันแรกไว้เป็นค่าเริ่มต้น
    isOpen.value = Array.from({ length: len }, (_, i) => i === 0);
});

function toggleAccordion(index: number) {
    isOpen.value[index] = !isOpen.value[index];
}
</script>

<template>
    <div class="px-4 lg:relative lg:-left-4 lg:min-w-[105%]">
        <h2 class="text-4xl font-semibold text-primary mb-2">
            <slot name="title" mdc-unwrap="p">คำถามที่ลูกค้าชอบถาม</slot>
        </h2>

        <p v-if="$slots.description" class="text-gray-600 mb-4">
            <slot name="description" mdc-unwrap="p" />
        </p>

        <div>
            <div
                v-for="(item, idx) in accordionItems"
                :key="idx"
                class="bg-white border-3 border-[#e5e5e5]"
            >
                <div
                    class="flex items-center p-3 text-lg font-semibold cursor-pointer rounded-lg select-none"
                    @click="toggleAccordion(idx)"
                >
                    <span
                        class="accordion__chevron mr-3 inline-flex h-6 w-6 items-center justify-center"
                        :class="isOpen[idx] ? 'is-open' : 'is-closed'"
                        aria-hidden="true"
                    >
                        <Icon name="lucide:chevron-down" class="h-5 w-5" />
                    </span>
                    <ProseH3>{{ item.question }}</ProseH3>
                </div>
                <div class="text-gray-600 p-4" v-show="isOpen[idx]"><ProseP>{{ item.answer }}</ProseP></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.border-3 {
    border-width: 3px;
}

.accordion__chevron {
    color: var(--ui-text, #111827);
}

.accordion__chevron.is-open {
    transform: rotate(180deg);
    color: var(--color-primary, #b91c1c);
}
</style>
