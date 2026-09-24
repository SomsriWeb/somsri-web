<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    image: string;
    alt?: string;
}
const { image, alt = '' } = defineProps<Props>();

interface Slots {
    title(): unknown;
    /** ข้อความบรรทัดเล็กใต้หัวข้อ เช่น "ปรึกษาฟรี ออกแบบฟรี ส่งตัวอย่างผ้าฟรีเมื่อสั่ง 100 ตัวขึ้นไป" */
    subtitle(): unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
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

            <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
                <!-- ปุ่มติดต่อ (solid) -->
                <UButton
                    :to="lineLink"
                    trailing-icon="i-lucide-arrow-right"
                    class="inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white"
                    size="md"
                >
                    ปรึกษาฟรี
                </UButton>

                <UButton
                    to="#fabric"
                    variant="outline"
                    class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
                    size="md"
                >
                    ดูตัวอย่างผ้า
                </UButton>
            </div>
        </div>
    </section>
</template>