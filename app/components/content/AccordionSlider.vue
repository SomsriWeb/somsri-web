<script setup lang="ts">
import { ref } from 'vue';

// VARIABLE
const { t } = useI18n({ useScope: 'local' });

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
        key: 'soft',
    },
    {
        image: '/wash/rough.png',
        title: 'Rough Wash',
        key: 'rough',
    },
    {
        image: '/wash/crackle.png',
        title: 'Crackle Wash',
        key: 'crackle',
    },
    {
        image: '/wash/snow.png',
        title: 'Snow Wash',
        key: 'snow',
    },
    {
        image: '/wash/garment.png',
        title: 'Garment Wash',
        key: 'garment',
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

<i18n lang="json">
{
    "th": {
        "soft": {
            "subtitle": "เทคนิคฟอกแบบละเอียด",
            "desc": "ฟอกแบบควบคุมโทนอย่างละเอียดสีเนียนสม่ำเสมอ ไม่มีลายด่างชัด แทบดูไม่ออกว่าฟอก ให้ลุคมินิมอล สะอาด ดูดี"
        },
        "rough": {
            "subtitle": "เทคนิคฟอกแบบหยาบ",
            "desc": "สีจะซีดแบบ \"ไม่เนียน\" มีรอยด่าง รอยถู ให้ความรู้สึกผ่านการใช้งานมาแล้ว เหมาะกับแบรนด์สายฮาร์ด สายลุย ลุคดิบ เท่ แบบสาย วินเทจจริงจัง"
        },
        "crackle": {
            "subtitle": "เทคนิคฟอกแบบหินแตก",
            "desc": "ลายเหมือน \"พื้นดินแตกระแหง\" สีจะแตกเป็นเส้นๆ ไม่สม่ำเสมอ เหมาะกับสายสตรีท เกิดจากจากฟอก + เคมี + การบิด/กดผ้าให้แตกตัว"
        },
        "snow": {
            "subtitle": "เทคนิคฟอกแบบสโนว์",
            "desc": "ลายกระจายเป็น \"จุดขาวๆ คล้ายหิมะ\" ใช้การพ่นสารฟอกแบบสุ่มลงบนผ้า สีพื้นยังอยู่ แต่มีจุดด่างทั่วตัว ดูแฟชั่น มีลูกเล่น แต่ไม่แรงเกิน"
        },
        "garment": {
            "subtitle": "เทคนิคฟอกแบบเก่า",
            "desc": "สีซีดลงทั้งตัวแบบ \"ธรรมชาติ\" ไม่มีลายแตกชัด เน้นความนุ่มและสีเฟด ผ้านุ่ม ใส่สบาย ดูคลาสสิค"
        }
    },
    "en": {
        "soft": {
            "subtitle": "Fine wash technique",
            "desc": "A carefully controlled wash for smooth, even color with no obvious blotches — you can barely tell it has been washed. Clean, minimal and polished."
        },
        "rough": {
            "subtitle": "Rough wash technique",
            "desc": "Deliberately uneven fading with patches and rub marks for a worn-in, lived-in feel. Perfect for rugged, raw, edgy brands that are serious about vintage style."
        },
        "crackle": {
            "subtitle": "Crackle wash technique",
            "desc": "A cracked-earth pattern: the color breaks into irregular lines. Great for streetwear. Created by combining washing, chemicals and twisting/pressing the fabric so it cracks."
        },
        "snow": {
            "subtitle": "Snow wash technique",
            "desc": "Scattered white, snowflake-like specks made by randomly spraying bleaching agent onto the fabric. The base color stays, with speckles all over — fashionable and playful without being too loud."
        },
        "garment": {
            "subtitle": "Classic garment wash technique",
            "desc": "The whole garment fades naturally with no distinct crackle pattern. Focused on softness and a faded tone — soft fabric, comfortable to wear and classic-looking."
        }
    }
}
</i18n>

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
                    <h4 class="m-0 mb-2.5 text-[18px] md:text-[24px] lg:text-[26px] text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{{ t(`${slide.key}.subtitle`) }}</h4>
                    <p class="m-0 p-0 text-[13px] md:text-[20px] leading-relaxed [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{{ t(`${slide.key}.desc`) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>