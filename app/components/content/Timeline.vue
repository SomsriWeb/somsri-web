<script setup lang="ts">
import { onMounted, watch } from 'vue';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image: string;
    isVisible?: boolean;
}

// PROPS
interface Props {
    items?: TimelineItem[] | string;
}

const props = defineProps<Props>();

const config = useRuntimeConfig();
const siteUrl = (config.public as any)?.site?.url || 'https://somsritshirt.com';

// Parse items from props
const parsedItems = computed<TimelineItem[]>(() => {
    if (typeof props.items === 'string') {
        try {
            const parsed = JSON.parse(props.items);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return Array.isArray(props.items) ? props.items : [];
});

const timelineData = ref<TimelineItem[]>([]);

// Initialize timelineData from parsedItems
watch(() => parsedItems.value, (newItems) => {
    timelineData.value = newItems.map(item => ({
        ...item,
        isVisible: false
    }));
}, { immediate: true });

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
                    item.isVisible = true;
                } else {
                    const rect = entry.boundingClientRect;
                    const viewportHeight = window.innerHeight;
                    if (rect.top > viewportHeight) {
                        item.isVisible = false;
                    }
                }
            });
        },
        {
            threshold: 0.8,
        },
    );

    itemRefs.value.forEach((el, index) => {
        if (el) {
            el.setAttribute('data-item-index', index.toString());
            observer.observe(el);
        }
    });
};

onMounted(() => {
    setTimeout(() => {
        setupIntersectionObserver();
    }, 100);
});
</script>

<template>
    <section class="min-h-screen font-sans" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" class="sr-only">Timeline - ประวัติความเป็นมาของสมศรีมีเสื้อ</h2>
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="relative" role="list" aria-label="Timeline">
                <!-- Timeline Items -->
                <template v-if="timelineData.length > 0">
                    <div
                        v-for="(item, index) in timelineData"
                        :key="`${item.year}-${index}`"
                    :ref="
                        (el) => {
                            if (el) itemRefs[index] = el as HTMLElement;
                        }
                    "
                    class="flex flex-col md:flex-row items-center justify-center w-full mb-14 relative timeline-item"
                    :class="{ 'is-visible': item.isVisible }"
                    role="listitem"
                >
                    <!-- เส้นเชื่อมระหว่าง dot นี้กับ dot ถัดไป (ซ่อนบนหน้าจอขนาดเล็ก) -->
                    <div
                        v-if="index < timelineData.length - 1"
                        class="hidden md:block absolute left-1/2 top-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0 timeline-line"
                        style="height: calc(100% + 6rem)"
                        :class="{ 'timeline-line-visible': item.isVisible }"
                    ></div>

                    <!-- Mobile Layout: ปี > รูปภาพ > ข้อความ -->
                    <div class="w-full md:hidden flex flex-col items-center gap-4">
                        <!-- ปี (Checkpoint) -->
                        <div class="relative flex flex-col items-center justify-center z-10">
                            <div
                                class="w-20 h-20 flex flex-col items-center justify-center bg-primary text-white font-bold rounded-lg shadow-xl border-4 border-slate-100 transition-all duration-700 delay-100 z-20 timeline-checkpoint"
                                :class="item.isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                            >
                                <span class="text-xs font-light opacity-80">YEAR</span>
                                <span class="text-lg">{{ item.year }}</span>
                            </div>
                        </div>

                        <!-- รูปภาพ -->
                        <div class="w-full overflow-hidden rounded-xl" :class="{ 'is-visible': item.isVisible }">
                            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500" />
                        </div>

                        <!-- ข้อความ -->
                        <div class="w-full bg-white p-6 rounded-xl shadow-lg border border-slate-100" :class="{ 'is-visible': item.isVisible }">
                            <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
                            <p class="text-stone-500 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>

                    <!-- Desktop Layout: ซ้าย-กลาง-ขวา -->
                    <!-- ฝั่งซ้าย (Left Side) -->
                    <div class="hidden md:flex w-5/12 justify-end px-4 relative">
                        <!-- เลขคู่: ฝั่งซ้ายคือ "ข้อมูล (Content)" มีพื้นหลัง -->
                        <div v-if="index % 2 === 0" class="bg-white p-6 rounded-xl shadow-lg border border-slate-100 timeline-content-left" :class="{ 'is-visible': item.isVisible }">
                            <h3 class="text-xl font-bold text-primary mb-2">{{ item.year }} - {{ item.title }}</h3>
                            <p class="text-stone-500 leading-relaxed">{{ item.description }}</p>
                        </div>

                        <!-- เลขคี่: ฝั่งซ้ายคือ "รูปภาพ (Image)" ไม่มีพื้นหลัง -->
                        <div v-else class="overflow-hidden rounded-xl timeline-image-left" :class="{ 'is-visible': item.isVisible }">
                            <img
                                :src="item.image"
                                :alt="`ภาพประกอบเหตุการณ์ ${item.year}: ${item.title}`"
                                :title="item.title"
                                class="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>

                    <!-- ตรงกลาง (Center Checkpoint) -->
                    <div class="hidden md:flex relative flex-col items-center justify-center w-24 z-10">
                        <div
                            class="w-20 h-20 flex flex-col items-center justify-center bg-primary text-white font-bold rounded-lg shadow-xl border-4 border-slate-100 transition-all duration-700 delay-100 z-20 timeline-checkpoint"
                            :class="item.isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                        >
                            <span class="text-xs font-light opacity-80">YEAR</span>
                            <span class="text-lg">{{ item.year }}</span>
                        </div>
                    </div>

                    <!-- ฝั่งขวา (Right Side) -->
                    <div class="hidden md:flex w-5/12 justify-start px-4 relative">
                        <!-- เลขคู่: ฝั่งขวาคือ "รูปภาพ (Image)" -->
                        <div v-if="index % 2 === 0" class="overflow-hidden rounded-xl timeline-image-right" :class="{ 'is-visible': item.isVisible }">
                            <img
                                :src="item.image"
                                :alt="`ภาพประกอบเหตุการณ์ ${item.year}: ${item.title}`"
                                :title="item.title"
                                class="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <!-- เลขคี่: ฝั่งขวาคือ "ข้อมูล (Content)" มีพื้นหลัง -->
                        <div v-else class="bg-white p-6 rounded-xl shadow-lg border border-slate-100 timeline-content-right" :class="{ 'is-visible': item.isVisible }">
                            <h3 class="text-xl font-bold text-primary mb-2">{{ item.year }} - {{ item.title }}</h3>
                            <p class="text-stone-500 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
                </template>
                <div v-else class="text-center text-gray-500 py-10">
                    ไม่มีข้อมูล Timeline
                </div>
            </div>
        </div>
    </section>
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
    opacity: 0 !important;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-content-left.is-visible {
    opacity: 1 !important;
    transform: translateX(-40px);
}

/* Animation สำหรับ Image ฝั่งซ้าย (เลขคี่) - สไลด์ออกจาก dot ไปทางซ้าย */
.timeline-image-left {
    opacity: 0 !important;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-image-left.is-visible {
    opacity: 1 !important;
    transform: translateX(-40px);
}

/* Animation สำหรับ Image ฝั่งขวา (เลขคู่) - สไลด์ออกจาก dot ไปทางขวา */
.timeline-image-right {
    opacity: 0 !important;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-image-right.is-visible {
    opacity: 1 !important;
    transform: translateX(40px);
}

/* Animation สำหรับ Content ฝั่งขวา (เลขคี่) - สไลด์ออกจาก dot ไปทางขวา */
.timeline-content-right {
    opacity: 0 !important;
    transform: translateX(0);
    transition:
        opacity 1s ease-out 0.3s,
        transform 1s ease-out 0.3s;
}

.timeline-content-right.is-visible {
    opacity: 1 !important;
    transform: translateX(40px);
}

/* Animation สำหรับ Mobile Layout - Fade in แบบเดียวกับ year */
.timeline-mobile-image {
    transition:
        opacity 0.7s ease-out,
        transform 0.7s ease-out;
}

.timeline-mobile-content {
    transition:
        opacity 0.7s ease-out,
        transform 0.7s ease-out;
}
</style>
