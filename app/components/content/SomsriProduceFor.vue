<script setup lang="ts">
import ProseH2 from './ProseH2.vue';

// SLOTS
interface Slots {
    /**
     * หัวข้อ (ใส่เป็น H1 - P)
     * @default ## สมศรีผลิตให้กับใครบ้าง
     */
    title(): unknown;

    /**
     * รายละเอียด (ใส่เป็น H1 - P)
     * @default หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง
     */
    description(): unknown;
}
defineSlots<Slots>();

const { data: brandsRow1 } = await useAsyncData('collaborators-row1', () =>
    queryCollection('collaborators').where('row', '=', 1).order('order', 'ASC').all()
);

const { data: brandsRow2 } = await useAsyncData('collaborators-row2', () =>
    queryCollection('collaborators').where('row', '=', 2).order('order', 'ASC').all()
);

</script>
<template>
    <div class="grid grid-cols-1 gap-5">
        <TitleWithDescription>
            <template #title>
                <slot name="title"><ProseH2>สมศรีผลิตให้กับใครบ้าง </ProseH2></slot>
            </template>
            <!-- <template #description>
                <slot name="description"><ProseP>หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ</ProseP> </slot>
            </template> -->
        </TitleWithDescription>

        <ClientOnly>
            <Vue3Marquee :duration="60" class="rounded-xl min-h-full">
                <ProseImg
                    v-for="brand in brandsRow1"
                    :key="brand.src"
                    class="h-6 w-auto object-contain mx-1"
                    :src="brand.src"
                    :alt="brand.alt"
                />
            </Vue3Marquee>
            <Vue3Marquee :duration="60" :direction="'reverse'" class="rounded-xl min-h-full">
                <ProseImg
                    v-for="brand in brandsRow2"
                    :key="brand.src"
                    class="h-6 w-auto object-contain mx-1"
                    :src="brand.src"
                    :alt="brand.alt"
                />
            </Vue3Marquee>
        </ClientOnly>
    </div>
</template>