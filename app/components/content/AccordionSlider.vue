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

// Image props - using existing faded-shirt images
const image1 = ref('/faded-shirt/banner.png');
const image2 = ref('/faded-shirt/maiyarap.png');
const image3 = ref('/faded-shirt/what-is-faded-shirt.jpg');
const image4 = ref('/faded-shirt/banner.png');
const image5 = ref('/faded-shirt/maiyarap.png');

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
        <div class="w-full max-w-7xl h-[80vh] max-h-[600px] flex flex-row shadow-2xl md:flex-row lg:flex-row">
            <!-- Box 1 -->
            <div
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100"
                :style="{ backgroundImage: `url(${image1})` }"
                @mouseenter="handleHover(0)"
                @mouseleave="handleLeave(0)"
            >
                <div
                    class="topic absolute left-[30px] bottom-[30px] transform origin-left-bottom transition-all duration-600 ease-in-out w-max z-20"
                    :class="[hoveredIndex === 0 ? 'rotate-0 bottom-[calc(100%-80px)]' : '-rotate-90']"
                >
                    <h2 class="m-0 p-0 uppercase text-[32px] text-white drop-shadow-lg tracking-wide">Soft Wash</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left w-[80%] max-w-[65%] absolute top-[100px] left-[30px] p-5 rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10"
                    :class="[hoveredIndex === 0 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === 0 ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[26px] text-white drop-shadow-md">เทคนิคฟอกแบบละเอียด</h4>
                    <p class="m-0 p-0 text-[20px] leading-relaxed drop-shadow-md">ฟอกแบบควบคุมโทนอย่างละเอียดสีเนียนสม่ำเสมอ ไม่มีลายด่างชัด แทบดูไม่ออกว่าฟอก ให้ลุคมินิมอล สะอาด ดูดี</p>
                </div>
            </div>

            <!-- Box 2 -->
            <div
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100"
                :style="{ backgroundImage: `url(${image2})` }"
                @mouseenter="handleHover(1)"
                @mouseleave="handleLeave(1)"
            >
                <div
                    class="topic absolute left-[30px] bottom-[30px] transform origin-left-bottom transition-all duration-600 ease-in-out w-max z-20"
                    :class="[hoveredIndex === 1 ? 'rotate-0 bottom-[calc(100%-80px)]' : '-rotate-90']"
                >
                    <h2 class="m-0 p-0 uppercase text-[32px] text-white drop-shadow-lg tracking-wide">Rough Wash</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left w-[80%] max-w-[65%] absolute top-[100px] left-[30px] p-5 rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10"
                    :class="[hoveredIndex === 1 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === 1 ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[26px] text-white drop-shadow-md">เทคนิคฟอกแบบหยาบ</h4>
                    <p class="m-0 p-0 text-[20px] leading-relaxed drop-shadow-md">
                        สีจะซีดแบบ "ไม่เนียน" มีรอยด่าง รอยถู ให้ความรู้สึกผ่านการใช้งานมาแล้ว เหมาะกับแบรนด์สายฮาร์ด สายลุย ลุคดิบ เท่ แบบสาย วินเทจจริงจัง
                    </p>
                </div>
            </div>

            <!-- Box 3 -->
            <div
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100"
                :style="{ backgroundImage: `url(${image3})` }"
                @mouseenter="handleHover(2)"
                @mouseleave="handleLeave(2)"
            >
                <div
                    class="topic absolute left-[30px] bottom-[30px] transform origin-left-bottom transition-all duration-600 ease-in-out w-max z-20"
                    :class="[hoveredIndex === 2 ? 'rotate-0 bottom-[calc(100%-80px)]' : '-rotate-90']"
                >
                    <h2 class="m-0 p-0 uppercase text-[32px] text-white drop-shadow-lg tracking-wide">Crackle Wash</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left w-[80%] max-w-[65%] absolute top-[100px] left-[30px] p-5 rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10"
                    :class="[hoveredIndex === 2 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === 2 ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[26px] text-white drop-shadow-md">เทคนิคฟอกแบบหินแตก</h4>
                    <p class="m-0 p-0 text-[20px] leading-relaxed drop-shadow-md">
                        ลายเหมือน "พื้นดินแตกระแหง" สีจะแตกเป็นเส้นๆ ไม่สม่ำเสมอ เหมาะกับสายสตรีท เกิดจากจากฟอก + เคมี + การบิด/กดผ้าให้แตกตัว
                    </p>
                </div>
            </div>

            <!-- Box 4 -->
            <div
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100"
                :style="{ backgroundImage: `url(${image4})` }"
                @mouseenter="handleHover(3)"
                @mouseleave="handleLeave(3)"
            >
                <div
                    class="topic absolute left-[30px] bottom-[30px] transform origin-left-bottom transition-all duration-600 ease-in-out w-max z-20"
                    :class="[hoveredIndex === 3 ? 'rotate-0 bottom-[calc(100%-80px)]' : '-rotate-90']"
                >
                    <h2 class="m-0 p-0 uppercase text-[32px] text-white drop-shadow-lg tracking-wide">Snow Wash</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left w-[80%] max-w-[65%] absolute top-[100px] left-[30px] p-5 rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10"
                    :class="[hoveredIndex === 3 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === 3 ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[26px] text-white drop-shadow-md">เทคนิคฟอกแบบสโนว์</h4>
                    <p class="m-0 p-0 text-[20px] leading-relaxed drop-shadow-md">
                        ลายกระจายเป็น "จุดขาวๆ คล้ายหิมะ" ใช้การพ่นสารฟอกแบบสุ่มลงบนผ้า สีพื้นยังอยู่ แต่มีจุดด่างทั่วตัว ดูแฟชั่น มีลูกเล่น แต่ไม่แรงเกิน
                    </p>
                </div>
            </div>

            <!-- Box 5 -->
            <div
                class="img-box flex-grow bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out filter grayscale opacity-80 relative overflow-hidden cursor-pointer hover:flex-grow-[6] hover:grayscale-0 hover:opacity-100"
                :style="{ backgroundImage: `url(${image5})` }"
                @mouseenter="handleHover(4)"
                @mouseleave="handleLeave(4)"
            >
                <div
                    class="topic absolute left-[30px] bottom-[30px] transform origin-left-bottom transition-all duration-600 ease-in-out w-max z-20"
                    :class="[hoveredIndex === 4 ? 'rotate-0 bottom-[calc(100%-80px)]' : '-rotate-90']"
                >
                    <h2 class="m-0 p-0 uppercase text-[32px] text-white drop-shadow-lg tracking-wide">Garment Wash</h2>
                </div>
                <div
                    class="content text-white bg-black/60 backdrop-blur-sm opacity-0 text-left w-[80%] max-w-[65%] absolute top-[100px] left-[30px] p-5 rounded-lg transition-all duration-500 ease-in-out pointer-events-none z-10"
                    :class="[hoveredIndex === 4 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10']"
                    :style="{ transitionDelay: hoveredIndex === 4 ? '0.4s' : '0s' }"
                >
                    <h4 class="m-0 mb-2.5 text-[26px] text-white drop-shadow-md">เทคนิคฟอกแบบเก่า</h4>
                    <p class="m-0 p-0 text-[20px] leading-relaxed drop-shadow-md">สีซีดลงทั้งตัวแบบ "ธรรมชาติ" ไม่มีลายแตกชัด เน้นความนุ่มและสีเฟด ผ้านุ่ม ใส่สบาย ดูคลาสสิค</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Responsive styles for mobile and tablet */
@media (max-width: 992px) {
    .img-box {
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .img-box:last-child {
        border-bottom: none;
    }

    .topic {
        left: 1.25rem;
        bottom: 50%;
        transform: translateY(-50%) rotate(0deg);
    }

    .img-box:hover .topic {
        bottom: calc(100% - 3.125rem);
        transform: translateY(0) rotate(0deg);
    }

    .topic h2 {
        font-size: 1.5rem;
    }

    .content {
        top: 4rem;
        left: 1.25rem;
        width: 90%;
        max-width: none;
        padding: 1rem;
    }

    .content h4 {
        font-size: 1.125rem;
    }

    .content p {
        font-size: 0.875rem;
    }
}

/* Custom cubic-bezier easing for smooth transitions */
.img-box {
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.img-box:last-child {
    border-right: none;
}

/* Text shadow utilities */
.drop-shadow-lg {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.drop-shadow-md {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}
</style>
