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
</script>

<template>
    <div>
        <div class="mb-5">
            <slot name="title" />
            <slot name="description" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            <HomePortfolioCard v-for="pin in pins" :key="pin.name" :name="lang === 'th' ? pin.name : pin['name-en']" :url="pin.url" :image="pin.image" :alt="lang === 'th' ? pin.alt : pin['alt-en']" />
        </div>
    </div>
</template>
