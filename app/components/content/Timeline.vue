<script setup lang="ts">
import { onMounted } from 'vue';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image: string;
    isVisible?: boolean;
}

const timelineData = ref<TimelineItem[]>([
    {
        year: '2017',
        title: 'ก่อตั้งกิจการ',
        description: 'ก่อตั้งกิจการจากการเห็นช่องว่างจากการใช้software ในการช่วยซัพพอร์ทลูกค้าในการทำธุรกิจให้ง่ายขึ้น',
        image: '/Timeline/Founded.jpg',
    },
    {
        year: '2019',
        title: 'ออกแบบเสื้อออนไลน์ทะลุ 5หมื่นครั้งต่อปี',
        description: 'ผู้เข้าใช้โปรแกรมออกแบบเสื้อออนไลน์ทะลุ 5หมื่นครั้งต่อปี',
        image: '/Timeline/2019.jpg',
    },
    {
        year: '2020',
        title: 'พัฒนา ERP ที่ชื่อว่า TEXCEL',
        description: 'บริษัทได้ปล่อย ERP ที่ชื่อว่า TEXCEL ใช้สำหรับบริหารจัดการภายใน ที่พัฒนาโดยทีมงานในองค์กร และเดินหน้าลงทุนด้านการซอร์ฟแวร์อย่างต่อเนื่อง',
        image: '/Timeline/2020.png',
    },
    {
        year: '2021',
        title: 'จับมือกับโรงงานผ้าเบอร์ต้น ๆ ของประเทศไทย',
        description: 'จับมือกับโรงงานผ้าเบอร์ต้น ๆ ของประเทศไทย เพื่อนำผ้าเข้าสู่กระบวนการ Recycle ให้องค์กรเติบโตไปสู่ความยั่งยืนเพื่อโลกต่อไป',
        image: '/Timeline/cloth.jpg',
    },
    {
        year: '2022',
        title: 'เข้าร่วมโครงการพี่ช่วยน้อง กับบริษัท ซาบีน่าจำกัด (มหาชน)',
        description: 'เข้าร่วมโครงการพี่ช่วยน้อง กับบริษัท ซาบีน่าจำกัด (มหาชน) เพื่อนำระบบ lean มาใช้ในองค์กร ลดต้นทุนได้ราคาที่ลูกค้าได้รับจึงคุ้มค่ากว่าโรงงานอื่น',
        image: '/Timeline/2022.jpg',
    },
    {
        year: '2023',
        title: 'ได้รับรางวัลเหรียญทอง Peer recognition organization',
        description: 'ได้รับรางวัลเหรียญทอง Peer recognition organization องค์กรที่มีส่วนร่วมในการทำงานยอดเยี่ยม',
        image: '/Timeline/2023.jpg',
    },
    {
        year: '2026',
        title: 'เติบโตเป็น eCommerce company',
        description: 'เติบโตเป็น eCommerce company ลูกค้าทุกคนสามารถสั่งเสื้อผ้าผ่านหน้าเว็บไซต์ โดยทุกความต้องการของลูกค้าสามารถระบุได้บนเว็บไซต์',
        image: '/Timeline/2026.jpg',
    },
]);

// Refs สำหรับ animation
const itemRefs = ref<(HTMLElement | null)[]>([]);

// ฟังก์ชันสำหรับ Intersection Observer
const setupIntersectionObserver = (): void => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const index = parseInt(entry.target.getAttribute('data-item-index') || '0');
                const item = timelineData.value[index];
                if (!item) return;
                
                if (entry.isIntersecting) {
                    // เมื่อ element เข้ามาใน viewport
                    item.isVisible = true;
                } else {
                    // เมื่อ element ออกจาก viewport
                    const rect = entry.boundingClientRect;
                    const viewportHeight = window.innerHeight;

                    if (rect.top > viewportHeight) {
                        item.isVisible = false;
                    }
                }
            });
        },
        {
            threshold: 0.8, // Trigger เมื่อเห็น 20% ของ element
        },
    );

    // Observe ทุก item
    itemRefs.value.forEach((el, index) => {
        if (el) {
            el.setAttribute('data-item-index', index.toString());
            observer.observe(el);
        }
    });
};

onMounted(() => {
    // รอให้ DOM render เสร็จก่อน
    setTimeout(() => {
        setupIntersectionObserver();
    }, 100);
});
</script>

<template>
    <div class="min-h-screen font-sans">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="relative">
                <!-- Timeline Items -->
                <div
                    v-for="(item, index) in timelineData"
                    :key="index"
                    :ref="
                        (el) => {
                            if (el) itemRefs[index] = el as HTMLElement;
                        }
                    "
                    class="flex items-center justify-center w-full mb-14 relative timeline-item"
                    :class="{ 'is-visible': item.isVisible }"
                >
                    <!-- เส้นเชื่อมระหว่าง dot นี้กับ dot ถัดไป (ย้ายออกมาจาก element เพื่อไม่ให้ถูก overflow-hidden ครอบ) -->
                    <div
                        v-if="index < timelineData.length - 1"
                        class="absolute left-1/2 top-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0 timeline-line"
                        style="height: calc(100% + 6rem)"
                        :class="{ 'timeline-line-visible': item.isVisible }"
                    ></div>

                    <!-- ฝั่งซ้าย (Left Side) -->
                    <div class="w-5/12 flex justify-end px-4 relative">
                        <!-- เลขคู่: ฝั่งซ้ายคือ "ข้อมูล (Content)" มีพื้นหลัง -->
                        <div v-if="index % 2 === 0" class="bg-white p-6 rounded-xl shadow-lg border border-slate-100 timeline-content-left" :class="{ 'is-visible': item.isVisible }">
                            <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
                            <p class="text-stone-500 leading-relaxed">{{ item.description }}</p>
                        </div>

                        <!-- เลขคี่: ฝั่งซ้ายคือ "รูปภาพ (Image)" ไม่มีพื้นหลัง -->
                        <div v-else class="overflow-hidden rounded-xl timeline-image-left" :class="{ 'is-visible': item.isVisible }">
                            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    <!-- ตรงกลาง (Center Checkpoint) -->
                    <div class="relative flex flex-col items-center justify-center w-24 z-10">
                        <!-- กล่อง Date Checkpoint (สี่เหลี่ยม) -->
                        <div
                            class="w-20 h-20 flex flex-col items-center justify-center bg-primary text-white font-bold rounded-lg shadow-xl border-4 border-slate-100 transition-all duration-700 delay-100 z-20 timeline-checkpoint"
                            :class="item.isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                        >
                            <span class="text-xs font-light opacity-80">YEAR</span>
                            <span class="text-lg">{{ item.year }}</span>
                        </div>
                    </div>

                    <!-- ฝั่งขวา (Right Side) -->
                    <div class="w-5/12 flex justify-start px-4 relative">
                        <!-- เลขคู่: ฝั่งขวาคือ "รูปภาพ (Image)" -->
                        <div v-if="index % 2 === 0" class="overflow-hidden rounded-xl timeline-image-right" :class="{ 'is-visible': item.isVisible }">
                            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500" />
                        </div>

                        <!-- เลขคี่: ฝั่งขวาคือ "ข้อมูล (Content)" มีพื้นหลัง -->
                        <div v-else class="bg-white p-6 rounded-xl shadow-lg border border-slate-100 timeline-content-right" :class="{ 'is-visible': item.isVisible }">
                            <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
                            <p class="text-stone-500 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Animation สำหรับ Checkpoint */
.timeline-checkpoint {
    transition:
        opacity 0.7s ease-out,
        transform 0.7s ease-out;
}

/* Animation สำหรับเส้นเชื่อม - ลากจาก dot บนมาหา dot ข้างล่าง และย้อนกลับจากล่างขึ้นบน */
.timeline-line {
    opacity: 1;
    transform: translateX(-50%) scaleY(0);
    transform-origin: bottom center;
    transition: transform 1.5s ease-out;
}

.timeline-line.timeline-line-visible {
    opacity: 1;
    transform: translateX(-50%) scaleY(1);
    transform-origin: top center;
    transition: transform 1.5s ease-out;
}

/* Animation สำหรับ Content ฝั่งซ้าย (เลขคู่) - สไลด์ออกจาก dot ไปทางซ้าย */
.timeline-content-left {
    opacity: 0;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-content-left.is-visible {
    opacity: 1;
    transform: translateX(-40px);
}

/* Animation สำหรับ Image ฝั่งซ้าย (เลขคี่) - สไลด์ออกจาก dot ไปทางซ้าย */
.timeline-image-left {
    opacity: 0;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-image-left.is-visible {
    opacity: 1;
    transform: translateX(-40px);
}

/* Animation สำหรับ Image ฝั่งขวา (เลขคู่) - สไลด์ออกจาก dot ไปทางขวา */
.timeline-image-right {
    opacity: 0;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-image-right.is-visible {
    opacity: 1;
    transform: translateX(40px);
}

/* Animation สำหรับ Content ฝั่งขวา (เลขคี่) - สไลด์ออกจาก dot ไปทางขวา */
.timeline-content-right {
    opacity: 0;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-content-right.is-visible {
    opacity: 1;
    transform: translateX(40px);
}
</style>
