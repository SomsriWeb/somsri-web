<script setup lang="ts">
// PROPS
interface Props {
    lang?: 'th' | 'en';
}
withDefaults(defineProps<Props>(), {
    lang: 'th',
});

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

// VARIABLE
const { data: screens } = await useAsyncData('data-screens', () => {
    return queryCollection('screen').order('order', 'ASC').all();
});
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <!-- ใช้ grid แทน swiper -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <HomePortfolioCard
                v-for="screen in screens"
                :key="screen.name"
                :name="lang === 'th' ? screen.name : screen['name-en']"
                :url="screen.url"
                :image="screen.image"
                :alt="lang === 'th' ? screen.alt : screen['alt-en']"
            />
        </div>
    </div>
</template>
