<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';

const { t, locale } = useI18n({ useScope: 'local' });

const imgs = [
    {
        key: 'img1',
        src: '/home/portfolio/1.jpg',
    },
    {
        key: 'img2',
        src: '/home/portfolio/2.jpg',
    },
    {
        key: 'img3',
        src: '/home/portfolio/3.jpg',
    },
    {
        key: 'img4',
        src: '/home/portfolio/4.jpg',
    },
    {
        key: 'img5',
        src: '/home/portfolio/5.jpg',
    },
    {
        key: 'img6',
        src: '/home/portfolio/6.jpg',
    },
    {
        key: 'img7',
        src: '/home/portfolio/7.jpg',
    },
];

// SLOTS
interface Slots {
    /**
     * หัวข้อ
     */
    title(): unknown;

    /**
     * รายละเอียด
     */
    description(): unknown;
}
defineSlots<Slots>();

const { data: portfolioCards } = await useAsyncData('data-portfolio-cards', () => {
    return queryCollection('portfolioCard').order('order', 'ASC').all();
});

const headerRef = ref<HTMLElement | null>(null);
const marqueeWrapRef = ref<HTMLElement | null>(null);

useScrollRevealUp(headerRef, {
    childSelector: ':scope > *',
    start: 'top 85%',
    duration: 0.7,
    stagger: 0.12,
    y: 32,
});

useScrollRevealUp(marqueeWrapRef, {
    childSelector: null,
    start: 'top 82%',
    duration: 0.85,
    y: 36,
});

function cardAlt(card: { alt: string; 'alt-en'?: string }) {
    return locale.value === 'en' ? (card['alt-en'] ?? '') : card.alt;
}
</script>

<i18n lang="json">
{
    "th": {
        "img1": "โรงงานผลิตเสื้อพร้อมสกรีน",
        "img2": "ไม่มีไอเดียไม่เป็นไร เราออกแบบให้ได้",
        "img3": "เสื้อทีม เสื้อรุ่น งานปัก งานสกรีน",
        "img4": "รับผลิตเสื้อ และเรายังมีเทคนิคการสกรีนที่หลากหลาย",
        "img5": "ออกแบบและสั่งทำเสื้อของตัวเอง",
        "img6": "เทคนิคสกรีนเสื้อแบบยางที่นิยมกันอย่างแพร่หลาย",
        "img7": "ตัวอย่างงานสกรีนเสื้อ"
    },
    "en": {
        "img1": "Apparel factory with in-house screen printing",
        "img2": "No ideas yet? No problem — we'll design it for you",
        "img3": "Team shirts, class shirts, embroidery and screen printing",
        "img4": "Custom shirt production with a wide range of screen printing techniques",
        "img5": "Design and order your own custom shirts",
        "img6": "The popular plastisol (rubber) screen printing technique",
        "img7": "Screen-printed shirt samples"
    }
}
</i18n>

<template>
    <div>
        <div ref="headerRef" class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <ClientOnly>
            <div ref="marqueeWrapRef">
                <Vue3Marquee class="rounded-xl" :duration="40">
                    <ProseImg v-for="img in imgs" :key="img.src" :src="img.src" :alt="t(img.key)" class="h-full max-h-68 object-cover" sizes="sm:400px md:500px" />
                </Vue3Marquee>
            </div>
        </ClientOnly>
        <!-- ใช้ grid แทน swiper -->
        <div
            v-if="portfolioCards?.length"
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 mt-2"
        >
            <HomePortfolioCard
                v-for="card in portfolioCards"
                :key="card.image"
                :name="cardAlt(card)"
                url="#"
                :image="card.image"
                :alt="cardAlt(card)"
            />
        </div>
    </div>
</template>
