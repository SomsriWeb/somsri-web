<script setup lang="ts">
interface Slots {
    /**
     * ข้อความภายในปุ่ม เเสดงเป็น P
     */
    ctatext(): unknown;
}

defineSlots<Slots>();

// VARIABLE
const { locale } = useI18n();
const localizePath = await useLocalizedPath();
const { data: products } = await useAsyncData('products', () => queryCollection('product').order('order', 'ASC').all());
</script>

<template>
    <section>
        <ProseH2 class="text-5xl mb-5">{{ $t('product.ourProducts') }}</ProseH2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <NuxtLink v-for="(item, index) in products" :key="index" :to="localizePath(item.url)">
                <Card class="shadow hover:scale-105 transition duration-300">
                    <ProseImg :src="item.image" :alt="locale === 'th' ? item.alt : (item['alt-en'] ?? item['name-en'])" class="aspect-square object-cover rounded-lg" />
                    <ProseH3 class="text-xl sm:text-2xl md:text-4xl text-center">{{ locale === 'th' ? item.name : item['name-en'] }}</ProseH3>
                    <!-- ทั้งการ์ดเป็นลิงก์อยู่แล้ว ปุ่มจึงเป็น span เพื่อไม่ให้ลิงก์ซ้อนกัน -->
                    <UButton as="span" class="w-full"><slot name="ctatext" mdc-unwrap="h1 h2 h3 h4 h5 h6 p">{{ $t('common.details') }}</slot></UButton>
                </Card>
            </NuxtLink>
        </div>
    </section>
</template>
