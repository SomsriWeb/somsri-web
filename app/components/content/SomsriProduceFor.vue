<script setup lang="ts">
import ProseH2 from './ProseH2.vue';

interface Props {
    /** จำนวนแถวของ marquee: ค่าเริ่มต้น 2 แถวเพื่อคงหน้าตาของหน้าเดิม */
    rows?: number | string;
    /** ความเร็วของ marquee เดิม */
    duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
    rows: 2,
    duration: 60,
});

const isSingleRow = computed(() => Number(props.rows) === 1);

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

const { data: brandsRow1 } = await useAsyncData('collaborators-row1', () => queryCollection('collaborators').where('row', '=', 1).order('order', 'ASC').all());

const { data: brandsRow2 } = await useAsyncData('collaborators-row2', () => queryCollection('collaborators').where('row', '=', 2).order('order', 'ASC').all());

const allBrands = computed(() => [...(brandsRow1.value ?? []), ...(brandsRow2.value ?? [])]);
</script>
<template>
    <div class="grid grid-cols-1 gap-5">
        <TitleWithDescription :class="{ 'text-center': isSingleRow }">
            <template #title>
                <slot name="title"><ProseH2>สมศรีผลิตให้กับใครบ้าง </ProseH2></slot>
            </template>
            <!-- <template #description>
                <slot name="description"><ProseP>หลากหลายแบรนด์ไว้วางใจให้สมศรีมีเสื้อผลิตสินค้าต่าง ๆ ไม่ว่าจะเป็นเสื้อยืด เสื้อโปโล เสื้อกีฬา และสินค้าอื่น ๆ</ProseP> </slot>
            </template> -->
        </TitleWithDescription>

        <ClientOnly>
            <Vue3Marquee v-if="isSingleRow" :duration="duration" class="rounded-xl min-h-full">
                <ProseImg v-for="brand in allBrands" :key="brand.src" class="h-6 w-auto object-contain mx-1" :src="brand.src" :alt="brand.alt" />
            </Vue3Marquee>

            <template v-else>
                <Vue3Marquee :duration="duration" class="rounded-xl min-h-full">
                    <ProseImg v-for="brand in brandsRow1" :key="brand.src" class="h-6 w-auto object-contain mx-1" :src="brand.src" :alt="brand.alt" />
                </Vue3Marquee>
                <Vue3Marquee :duration="duration" :direction="'reverse'" class="rounded-xl min-h-full">
                    <ProseImg v-for="brand in brandsRow2" :key="brand.src" class="h-6 w-auto object-contain mx-1" :src="brand.src" :alt="brand.alt" />
                </Vue3Marquee>
            </template>
        </ClientOnly>
    </div>
</template>
