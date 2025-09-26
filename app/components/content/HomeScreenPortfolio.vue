<script setup lang="ts">
// PROPS
interface Props {
    lang?: 'th' | 'en';
}
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

//stot
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
// VARIABLE
const { data: screens } = await useAsyncData('data-screens', () => {
    return queryCollection('screen').order('order', 'ASC').all();
});
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
        },
    },
});
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <ClientOnly>
            <swiper-container ref="containerRef" class="grid auto-rows-fr mb-5">
                <swiper-slide v-for="screen in screens" :key="screen.name">
                    <HomePortfolioCard :name="lang === 'th' ? screen.name : screen['name-en']" :url="screen.url" :image="screen.image" :alt="lang === 'th' ? screen.alt : screen['alt-en']" />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <div class="flex justify-end gap-5">
            <UButton color="neutral" variant="outline" icon="lucide:chevron-left" class="rounded-full !min-w-fit" @click="swiper.prev()" />
            <UButton color="neutral" variant="outline" icon="lucide:chevron-right" class="rounded-full !min-w-fit" @click="swiper.next()" />
        </div>
    </div>
</template>
