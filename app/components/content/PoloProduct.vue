<script setup lang="ts">
const { data: polo } = await useAsyncData('poloProduct', () => queryCollection('poloProduct').order('order', 'ASC').all());

/** แบ่งเป็นแถวละ 2 รูป — แถวสุดท้ายที่เหลือ 1 รูปให้อยู่กลาง */
const rows = computed(() => {
    const list = polo.value ?? [];
    const chunks: (typeof list)[] = [];
    for (let i = 0; i < list.length; i += 2) {
        chunks.push(list.slice(i, i + 2));
    }
    return chunks;
});
</script>

<template>
    <section class="space-y-5">
        <!-- แถว 2 รูป: grid คอลัมน์เท่ากัน | แถว 1 รูป: flex กลาง ความกว้างเท่า 1 ช่องของ grid -->
        <div class="mx-auto w-full max-w-4xl space-y-5">
            <template v-for="(row, rowIdx) in rows" :key="rowIdx">
                <div
                    v-if="row.length === 2"
                    class="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch md:gap-5"
                >
                    <div
                        v-for="(item, idx) in row"
                        :key="idx"
                        class="polo-product__cell relative flex aspect-4/3 min-h-0 w-full items-center justify-center overflow-hidden"
                    >
                        <ProseImg :src="item.image" :alt="item.alt || item.name" />
                    </div>
                </div>
                <div v-else class="flex w-full justify-center">
                    <div
                        v-for="(item, idx) in row"
                        :key="idx"
                        class="polo-product__cell relative flex aspect-4/3 min-h-0 w-full max-w-md items-center justify-center overflow-hidden md:max-w-none md:w-[calc((100%-1.25rem)/2)]"
                    >
                        <ProseImg :src="item.image" :alt="item.alt || item.name" />
                    </div>
                </div>
            </template>
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

<style scoped>
.polo-product__cell :deep(img) {
    display: block;
    /* ให้ทุกภาพมี “กรอบ” เท่ากันเสมอ (ตามขนาด cell) แล้วค่อย contain ข้างใน */
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain;
    object-position: center;
}
</style>
