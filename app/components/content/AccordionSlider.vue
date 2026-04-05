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

const activeIndex = ref<number | null>(null);

const slides = [
    {
        image: '/wash/soft.png',
        title: 'Soft Wash',
        subtitle: 'เทคนิคฟอกแบบละเอียด',
        desc: 'ฟอกแบบควบคุมโทนอย่างละเอียดสีเนียนสม่ำเสมอ ไม่มีลายด่างชัด แทบดูไม่ออกว่าฟอก ให้ลุคมินิมอล สะอาด ดูดี',
    },
    {
        image: '/wash/rough.png',
        title: 'Rough Wash',
        subtitle: 'เทคนิคฟอกแบบหยาบ',
        desc: 'สีจะซีดแบบ "ไม่เนียน" มีรอยด่าง รอยถู ให้ความรู้สึกผ่านการใช้งานมาแล้ว เหมาะกับแบรนด์สายฮาร์ด สายลุย ลุคดิบ เท่ แบบสาย วินเทจจริงจัง',
    },
    {
        image: '/wash/crackle.png',
        title: 'Crackle Wash',
        subtitle: 'เทคนิคฟอกแบบหินแตก',
        desc: 'ลายเหมือน "พื้นดินแตกระแหง" สีจะแตกเป็นเส้นๆ ไม่สม่ำเสมอ เหมาะกับสายสตรีท เกิดจากจากฟอก + เคมี + การบิด/กดผ้าให้แตกตัว',
    },
    {
        image: '/wash/snow.png',
        title: 'Snow Wash',
        subtitle: 'เทคนิคฟอกแบบสโนว์',
        desc: 'ลายกระจายเป็น "จุดขาวๆ คล้ายหิมะ" ใช้การพ่นสารฟอกแบบสุ่มลงบนผ้า สีพื้นยังอยู่ แต่มีจุดด่างทั่วตัว ดูแฟชั่น มีลูกเล่น แต่ไม่แรงเกิน',
    },
    {
        image: '/wash/garment.png',
        title: 'Garment Wash',
        subtitle: 'เทคนิคฟอกแบบเก่า',
        desc: 'สีซีดลงทั้งตัวแบบ "ธรรมชาติ" ไม่มีลายแตกชัด เน้นความนุ่มและสีเฟด ผ้านุ่ม ใส่สบาย ดูคลาสสิค',
    },
];

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

const handleMouseEnter = (index: number) => {
    if (isDesktop()) {
        activeIndex.value = index;
    }
};

const handleMouseLeave = () => {
    if (isDesktop()) {
        activeIndex.value = null;
    }
};

const handleClick = (index: number) => {
    if (!isDesktop()) {
        activeIndex.value = activeIndex.value === index ? null : index;
    }
};
</script>

<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="w-full max-w-7xl flex flex-col lg:flex-row h-screen lg:h-[80vh] lg:max-h-[600px] shadow-2xl">
            <!-- Data Iteration via v-for -->
            <div
                v-for="(slide, index) in slides"
                :key="index"
                class="bg-cover bg-center bg-no-repeat transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-r border-white/20 last:border-none"
                :class="[activeIndex === index ? 'flex-grow-[6] grayscale-0 opacity-100' : 'flex-grow grayscale opacity-80']"
                :style="{ backgroundImage: `url(${slide.image})` }"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
                @click="handleClick(index)"
            >
                <!-- Topic (หัวข้อ) -->
                <div
                    class="absolute left-[20px] lg:left-[80px] origin-bottom-left transition-all duration-600 ease-in-out w-max z-20"
                    :class="[
                        activeIndex === index
                            ? 'bottom-[calc(100%-50px)] lg:bottom-[calc(100%-100px)] rotate-0 translate-y-0'
                            : 'bottom-1/2 lg:bottom-[30px] translate-y-1/2 lg:translate-y-0 rotate-0 lg:-rotate-90',
                    ]"
                >
                    <h2 class="m-0 p-0 uppercase text-[24px] lg:text-[62px] text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)] tracking-wide">{{ slide.title }}</h2>
                </div>

                <!-- Content (เนื้อหา) -->
                <div
                    class="text-white bg-black/60 backdrop-blur-sm opacity-0 text-left absolute rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10 top-[60px] lg:top-[100px] left-[20px] lg:left-[30px] w-[90%] lg:w-[80%] max-w-none lg:max-w-[65%] p-[15px] lg:p-5"
                    :class="[activeIndex === index ? 'translate-y-0 opacity-100 pointer-events-auto delay-[400ms]' : 'translate-y-10 delay-0']"
                >
                    <h4 class="m-0 mb-2.5 text-[18px] md:text-[24px] lg:text-[26px] text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{{ slide.subtitle }}</h4>
                    <p class="m-0 p-0 text-[13px] md:text-[20px] leading-relaxed [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{{ slide.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>