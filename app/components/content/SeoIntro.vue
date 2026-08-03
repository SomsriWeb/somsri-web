<script setup lang="ts">
interface Props {
    image: string;
    imageMobile?: string;
    alt?: string;
}
const { image, imageMobile, alt = '' } = defineProps<Props>();

interface Slots {
    /** ป้ายเล็กสี primary บนสุด เช่น "ความรู้เรื่องการผลิตกระเป๋าผ้า" */
    eyebrow(): unknown;
    /** หัวข้อใหญ่ H1 */
    title(): unknown;
    /** พารากราฟแรก */
    description(): unknown;
    /** หัวข้อรองตัวหนา (H3) เช่น "สมศรีมีเสื้อรับผลิตกระเป๋าผ้า Tote Bag" */
    subtitle(): unknown;
    /** พารากราฟที่สอง ใต้ subtitle */
    subdescription(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <!-- ===== Desktop: รูปเป็น bg เต็ม section ข้อความลอยทับ มี gradient ===== -->
        <div class="relative hidden md:block">
            <div class="absolute inset-0">
                <NuxtImg :src="image" :alt="alt" class="h-full w-full object-cover" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-45% to-transparent" />

            <div class="relative z-10 mx-auto max-w-[75rem] px-5 py-20">
                <div class="max-w-lg text-left">
                    <p v-if="$slots.eyebrow" class="mb-2 text-sm font-bold text-primary">
                        <slot name="eyebrow" mdc-unwrap="p" />
                    </p>
                    <h1 class="text-3xl leading-snug font-bold text-stone-900">
                        <slot name="title" mdc-unwrap="p" />
                    </h1>
                    <div v-if="$slots.description" class="mt-3 text-base text-stone-700">
                        <slot name="description" mdc-unwrap="p" />
                    </div>
                    <h3 v-if="$slots.subtitle" class="mt-6 text-xl font-bold text-stone-900">
                        <slot name="subtitle" mdc-unwrap="p" />
                    </h3>
                    <div v-if="$slots.subdescription" class="mt-2 text-base text-stone-700">
                        <slot name="subdescription" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== Mobile: ข้อความก่อน (พื้นขาวล้วน ไม่มีรูปทะลุ) รูป stack ต่อท้ายด้านล่างเต็มความกว้าง ===== -->
        <div class="flex flex-col px-5 py-10 md:hidden">
            <div class="text-left">
                <p v-if="$slots.eyebrow" class="mb-2 text-sm font-bold text-primary">
                    <slot name="eyebrow" mdc-unwrap="p" />
                </p>
                <h1 class="text-2xl leading-snug font-bold text-stone-900">
                    <slot name="title" mdc-unwrap="p" />
                </h1>
                <div v-if="$slots.description" class="mt-3 text-sm text-stone-700">
                    <slot name="description" mdc-unwrap="p" />
                </div>
                <h3 v-if="$slots.subtitle" class="mt-6 text-lg font-bold text-stone-900">
                    <slot name="subtitle" mdc-unwrap="p" />
                </h3>
                <div v-if="$slots.subdescription" class="mt-2 text-sm text-stone-700">
                    <slot name="subdescription" mdc-unwrap="p" />
                </div>
            </div>
        </div>

        <NuxtImg :src="imageMobile || image" :alt="alt" class="w-full object-cover md:hidden" />
    </section>
</template>