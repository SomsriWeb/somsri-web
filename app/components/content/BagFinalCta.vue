<script setup lang="ts">
interface Props {
    image: string;
    alt?: string;
}
const { image, alt = '' } = defineProps<Props>();

interface Slots {
    title(): unknown;
    /** ข้อความบรรทัดเล็กใต้หัวข้อ เช่น "ปรึกษาฟรี ออกแบบฟรี ขั้นต่ำ 150 ใบ" */
    subtitle(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-10 md:py-14">
        <!-- รูปเดียวเป็น bg เต็ม section -->
        <div class="absolute inset-0">
            <NuxtImg :src="image" :alt="alt" class="h-full w-full object-cover" />
        </div>

        <!-- แผ่นขาวโปร่งคลุมเบาๆ เพื่อให้ข้อความกลางจออ่านง่าย แต่ยังเห็นรูปชัด -->
        <div class="absolute inset-0 bg-white/55" />

        <div class="relative z-10 mx-auto max-w-xl px-5 text-center">
            <h2 class="text-2xl leading-snug font-bold text-primary md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>

            <div v-if="$slots.subtitle" class="mt-2 text-sm text-stone-600 md:text-base">
                <slot name="subtitle" mdc-unwrap="p" />
            </div>

            <div class="mt-6 flex justify-center">
                <slot />
            </div>
        </div>
    </section>
</template>