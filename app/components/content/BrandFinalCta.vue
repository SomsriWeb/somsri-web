<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    image: string;
    /** รูปพื้นหลังสำหรับมือถือ ถ้าไม่ใส่จะ fallback ไปใช้ image ตัวเดียวกับ desktop */
    imageMobile?: string;
    alt?: string;
}
const { image, imageMobile, alt = '' } = defineProps<Props>();

interface Slots {
    title(): unknown;
    /** ข้อความบรรทัดเล็กใต้หัวข้อ เช่น "ทีมสมศรีช่วยแนะนำเนื้อผ้าและแนวทางการผลิตให้เหมาะกับแบรนด์ได้ฟรี" */
    subtitle(): unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
</script>

<template>
    <section class="relative left-1/2 h-[20rem] w-screen -translate-x-1/2 overflow-hidden md:h-[22rem]">
        <!-- รูปเดียวเป็น bg เต็ม section: กำหนดความสูงตายตัวให้ section เพื่อให้ข้อความอยู่กึ่งกลางแนวตั้งได้แน่นอน -->
        <div class="absolute inset-0">
            <NuxtImg :src="image" :alt="alt" class="hidden h-full w-full object-cover md:block" />
            <NuxtImg :src="imageMobile || image" :alt="alt" class="h-full w-full object-cover md:hidden" />
        </div>

        <!-- แผ่นขาวโปร่งคลุมเบาๆ เพื่อให้ข้อความอ่านง่าย แต่ยังเห็นรูปชัด -->
        <div class="absolute inset-0 bg-white/55" />

        <div class="relative z-10 mx-auto flex h-full max-w-[75rem] items-center justify-center px-5">
            <div class="flex max-w-xl flex-col items-center text-center">
                <h2 class="text-2xl leading-snug font-bold text-primary md:text-3xl">
                    <slot name="title" mdc-unwrap="p" />
                </h2>

                <div v-if="$slots.subtitle" class="mt-2 text-sm text-stone-700 md:text-base">
                    <slot name="subtitle" mdc-unwrap="p" />
                </div>

                <UButton
                    :to="lineLink"
                    trailing-icon="i-lucide-arrow-right"
                    class="mt-6 inline-flex shrink-0 items-center bg-primary px-6 py-2.5 text-sm text-white"
                    size="md"
                >
                    ปรึกษาฟรี
                </UButton>
            </div>
        </div>
    </section>
</template>