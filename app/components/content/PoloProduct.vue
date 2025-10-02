<script setup lang="ts">
const { data: polo } = await useAsyncData('poloProduct', () => queryCollection('poloProduct').order('order', 'ASC').all());
</script>

<template>
    <section class="space-y-5">
        <div class="flex flex-col items-center gap-5">
            <ProseImg v-for="(item, index) in polo" :key="index" :src="item.image" :alt="item.alt || item.name" class="w-full max-w-[25rem]" />
        </div>

        <div class="mt-10 flex flex-row flex-wrap justify-center items-center gap-4 px-5">
            <NuxtLink to="/fabric-specification">
                <UButton size="xl" color="primary" variant="solid" icon="i-lucide-file-search" class="min-w-[9rem] px-4"> ดูเพิ่มเติม </UButton>
            </NuxtLink>

            <NuxtLink to="/shop">
                <UButton size="xl" color="primary" variant="solid" icon="i-lucide-shirt" class="min-w-[12rem] px-4"> ออกแบบเสื้อโปโล </UButton>
            </NuxtLink>
        </div>
    </section>
</template>
