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
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

// SLOTS
interface Slots {
    /**
     * ข้อความของหัวข้อ (แสดงผลเป็น H2)
     */
    title(): unknown;
}
defineSlots<Slots>();

// Reactive state for tracking hovered item
const hoveredIndex = ref<number | null>(null);

// Mapped data for the slider components (Applying DRY Principle)
const slides = [
    {
        image: '/faded-shirt/banner.png',
        title: 'Soft Wash',
        subtitle: 'เทคนิคฟอกแบบละเอียด',
        desc: 'ฟอกแบบควบคุมโทนอย่างละเอียดสีเนียนสม่ำเสมอ ไม่มีลายด่างชัด แทบดูไม่ออกว่าฟอก ให้ลุคมินิมอล สะอาด ดูดี',
    },
    {
        image: '/faded-shirt/maiyarap.png',
        title: 'Rough Wash',
        subtitle: 'เทคนิคฟอกแบบหยาบ',
        desc: 'สีจะซีดแบบ "ไม่เนียน" มีรอยด่าง รอยถู ให้ความรู้สึกผ่านการใช้งานมาแล้ว เหมาะกับแบรนด์สายฮาร์ด สายลุย ลุคดิบ เท่ แบบสาย วินเทจจริงจัง',
    },
    {
        image: '/faded-shirt/what-is-faded-shirt.jpg',
        title: 'Crackle Wash',
        subtitle: 'เทคนิคฟอกแบบหินแตก',
        desc: 'ลายเหมือน "พื้นดินแตกระแหง" สีจะแตกเป็นเส้นๆ ไม่สม่ำเสมอ เหมาะกับสายสตรีท เกิดจากจากฟอก + เคมี + การบิด/กดผ้าให้แตกตัว',
    },
    {
        image: '/faded-shirt/banner.png',
        title: 'Snow Wash',
        subtitle: 'เทคนิคฟอกแบบสโนว์',
        desc: 'ลายกระจายเป็น "จุดขาวๆ คล้ายหิมะ" ใช้การพ่นสารฟอกแบบสุ่มลงบนผ้า สีพื้นยังอยู่ แต่มีจุดด่างทั่วตัว ดูแฟชั่น มีลูกเล่น แต่ไม่แรงเกิน',
    },
    {
        image: '/faded-shirt/maiyarap.png',
        title: 'Garment Wash',
        subtitle: 'เทคนิคฟอกแบบเก่า',
        desc: 'สีซีดลงทั้งตัวแบบ "ธรรมชาติ" ไม่มีลายแตกชัด เน้นความนุ่มและสีเฟด ผ้านุ่ม ใส่สบาย ดูคลาสสิค',
    },
];

// Methods
const handleHover = (index: number) => {
    hoveredIndex.value = index;
};

const handleLeave = (index: number) => {
    hoveredIndex.value = null;
};
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-7xl flex flex-col lg:flex-row h-screen lg:h-[80vh] lg:max-h-[600px] shadow-2xl">
            <!-- Data Iteration via v-for -->
            <div
                v-for="(slide, index) in slides"
                :key="index"
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100 border-b lg:border-b-0 lg:border-r border-white/20 last:border-none"
                :style="{ backgroundImage: `url(${slide.image})` }"
                @mouseenter="handleHover(index)"
                @mouseleave="handleLeave(index)"
            >
                <div
                    class="topic absolute left-[20px] lg:left-[30px] origin-bottom-left transition-all duration-600 ease-in-out w-max z-20"
                    :class="[
                        hoveredIndex === index
                            ? 'bottom-[calc(100%-50px)] lg:bottom-[calc(100%-80px)] rotate-0 translate-y-0'
                            : 'bottom-1/2 lg:bottom-[30px] translate-y-1/2 lg:translate-y-0 rotate-0 lg:-rotate-90'
                    ]"
                >
                    <h2 class="m-0 p-0 uppercase text-[24px] lg:text-[32px] text-white text-shadow-custom-lg tracking-wide">{{ slide.title }}</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left absolute rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10 top-[60px] lg:top-[100px] left-[20px] lg:left-[30px] w-[90%] lg:w-[80%] max-w-none lg:max-w-[65%] p-[15px] lg:p-5"
                    :class="[hoveredIndex === index ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === index ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[18px] lg:text-[26px] text-white text-shadow-custom-md">{{ slide.subtitle }}</h4>
                    <p class="m-0 p-0 text-[13px] lg:text-[20px] leading-relaxed text-shadow-custom-md">{{ slide.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Text shadow utilities */
/* Replaced `.drop-shadow-*` with `.text-shadow-*` to avoid namespace conflicts with Tailwind CSS native filters */
.text-shadow-custom-lg {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.text-shadow-custom-md {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}
</style>
