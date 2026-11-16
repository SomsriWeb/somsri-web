<script setup lang="ts">
/** แถบโลโก้ลูกค้าแบบเลื่อน ดึงจาก collection "collaborators" (content/data/collaborators) */
interface Props {
    /** ความเร็วของ marquee (วินาทีต่อรอบ) */
    duration?: number;
}
const { duration = 60 } = defineProps<Props>();

interface Slots {
    title?: () => unknown;
}
defineSlots<Slots>();

// เรียงตาม row แล้วตาม order ให้ลำดับเหมือนแถบโลโก้ของ SomsriProduceFor
const { data: brands } = await useAsyncData('polo-shirt-clients', () => queryCollection('collaborators').order('order', 'ASC').all());
const sortedBrands = computed(() => [...(brands.value ?? [])].sort((a, b) => (a.row ?? 0) - (b.row ?? 0) || a.order - b.order));
</script>

<template>
    <section class="bg-stone-100 py-8 md:py-11">
        <div class="px-6 lg:px-18">
            <p v-if="$slots.title" class="mb-5 text-center text-sm font-bold text-stone-900 md:text-base">
                <slot name="title" mdc-unwrap="p" />
            </p>

            <ClientOnly>
                <Vue3Marquee :duration="duration" pause-on-hover class="rounded-xl bg-white py-4">
                    <NuxtImg
                        v-for="brand in sortedBrands"
                        :key="brand.src"
                        :src="brand.src"
                        :alt="brand.alt"
                        loading="lazy"
                        class="mx-5 h-8 w-auto object-contain md:h-10"
                    />
                </Vue3Marquee>

                <!-- จองพื้นที่ไว้ระหว่างรอ marquee โหลดฝั่ง client กันหน้ากระตุก -->
                <template #fallback>
                    <div class="h-16 rounded-xl bg-white md:h-18" />
                </template>
            </ClientOnly>
        </div>
    </section>
</template>
