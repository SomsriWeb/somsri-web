<script setup lang="ts">
interface Props {
    image: string;
    /** รูปสำหรับมือถือ ถ้าไม่ใส่จะ fallback ไปใช้ image ตัวเดียวกับ desktop */
    imageMobile?: string;
    alt?: string;
}
const { image, imageMobile, alt = '' } = defineProps<Props>();

interface Slots {
    /** ป้ายเล็กด้านบนสุด สีแดง เช่น "รับผลิตกระเป๋าผ้า — Tote Bag สั่งทำ" */
    eyebrow(): unknown;
    /** หัวข้อใหญ่ H1 บรรทัดแรก (สีดำ) */
    title(): unknown;
    /** หัวข้อใหญ่ H1 บรรทัดสอง (สีแดง/primary) ต่อท้าย title ทันที */
    titleAccent(): unknown;
    /** พารากราฟอธิบายรายละเอียดสินค้า */
    description(): unknown;
    /** บรรทัด "เหมาะกับ" คำว่า เหมาะกับ จะถูกทำตัวหนา + สี primary ให้อัตโนมัติ ส่วน slot คือข้อความที่ตามมา */
    suitFor(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="relative left-1/2 w-screen -translate-x-1/2 bg-stone-100">
        <!-- ===== Desktop: รูปเป็น bg เต็มความสูง ชนขอบขวาจอ ===== -->
        <div class="relative hidden min-h-[26rem] w-full md:flex">
            <div class="absolute inset-y-0 right-0 w-[48%]">
                <NuxtImg :src="image" :alt="alt" class="h-full w-full object-cover object-right" />
            </div>

            <!-- gradient ให้ข้อความอ่านง่ายฝั่งซ้าย (พื้นเดิมเป็นเทาอ่อนอยู่แล้ว ไล่ผสมกับรูป) -->
            <div class="absolute inset-y-0 right-0 w-[48%] bg-gradient-to-r from-stone-100 via-stone-100/40 via-20% to-transparent" />

            <div class="relative z-10 flex w-full items-center py-16" style="padding-left: clamp(2.5rem, 6vw, 7rem)">
                <div class="flex max-w-xl flex-col text-left">
                    <p v-if="$slots.eyebrow" class="mb-2 text-base font-bold text-primary">
                        <slot name="eyebrow" mdc-unwrap="p" />
                    </p>

                    <h1 class="text-5xl leading-tight font-bold text-stone-900">
                        <slot name="title" mdc-unwrap="p" />
                        <span v-if="$slots.titleAccent" class="text-primary">
                            <slot name="titleAccent" mdc-unwrap="p" />
                        </span>
                    </h1>

                    <div v-if="$slots.description" class="mt-4 text-lg font-light text-stone-700">
                        <slot name="description" mdc-unwrap="p" />
                    </div>

                    <div v-if="$slots.suitFor" class="mt-2 text-base text-stone-700">
                        <span class="font-bold">เหมาะกับ </span>
                        <slot name="suitFor" mdc-unwrap="p" />
                    </div>

                    <div v-if="$slots.default" class="mt-6">
                        <slot />
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== Mobile: ข้อความก่อน รูปปกติ stack ต่อท้าย ===== -->
        <div class="flex flex-col gap-6 pt-10 md:hidden">
            <div class="flex flex-col text-left px-5">
                <p v-if="$slots.eyebrow" class="mb-2 text-sm font-bold text-primary">
                    <slot name="eyebrow" mdc-unwrap="p" />
                </p>

                <h1 class="text-3xl leading-tight font-bold text-stone-900">
                    <slot name="title" mdc-unwrap="p" />
                    <span v-if="$slots.titleAccent" class="text-primary">
                        <slot name="titleAccent" mdc-unwrap="p" />
                    </span>
                </h1>

                <div v-if="$slots.description" class="mt-4 font-light text-stone-700">
                    <slot name="description" mdc-unwrap="p" />
                </div>

                <div v-if="$slots.suitFor" class="mt-2 text-sm text-stone-700">
                    <span class="font-bold">เหมาะกับ </span>
                    <slot name="suitFor" mdc-unwrap="p" />
                </div>

                <div v-if="$slots.default" class="mt-6">
                    <slot />
                </div>
            </div>

            <NuxtImg :src="imageMobile || image" :alt="alt" class="w-full" />
        </div>
    </section>
</template>