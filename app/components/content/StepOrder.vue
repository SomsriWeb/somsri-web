<script setup lang="ts">
const { data: step } = await useAsyncData('step', () => queryCollection('stepOrder').order('order', 'ASC').all());

const { t, locale } = useI18n({ useScope: 'local' });
const nameOf = (item: { name: string; 'name-en'?: string }) => (locale.value === 'en' ? (item['name-en'] ?? item.name) : item.name);
</script>

<i18n lang="json">
{
    "th": { "title": "ขั้นตอนการสั่งซื้อ" },
    "en": { "title": "How to Order" }
}
</i18n>

<template>
    <section class="pb-16">
        <h2 class="text-primary text-1xl md:text-4xl font-bold text-center mb-5">{{ t('title') }}</h2>
        <div class="grid grid-rows-1 gap-3">
            <div v-for="(item, index) in step" :key="index" class="flex flex-col items-center">
                <ProseImg :src="item.image" :alt="nameOf(item)" class="max-w-md object-contain" />
            </div>
        </div>
    </section>
</template>
