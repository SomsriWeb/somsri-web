<script setup lang="ts">
// PROPS
interface Props {
    /**
     * ใช้ภาษาไทยเป็นค่า default
     */
    lang?: 'th' | 'en';
}
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

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
const { data: pins } = await useAsyncData('data-pin', () => {
    return queryCollection('pin').order('order', 'ASC').all();
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
            <swiper-container ref="containerRef" class="grid auto-rows-fr mb-5 ">
                <swiper-slide v-for="pin in pins" :key="pin.name">
                    <HomePortfolioCard :name="lang === 'th' ? pin.name : pin['name-en']" :url="pin.url" :image="pin.image" :alt="lang === 'th' ? pin.alt : pin['alt-en']" />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <div class="flex justify-end gap-5">
            <UButton color="neutral" variant="outline" icon="lucide:chevron-left" class="rounded-full !min-w-fit" @click="swiper.prev()" />
            <UButton color="neutral" variant="outline" icon="lucide:chevron-right" class="rounded-full !min-w-fit" @click="swiper.next()" />
        </div>
    </div>
</template>
