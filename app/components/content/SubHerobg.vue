<script setup lang="ts">
interface Props {
    image: string;
    /** รูปพื้นหลังสำหรับมือถือ (ข้อความจะลอยทับด้านบนรูปนี้) ถ้าไม่ใส่จะ fallback ไปใช้ image ตัวเดียวกับ desktop */
    imageMobile?: string;
    alt?: string;
    /** ด้านที่วางรูป บน desktop, default = right */
    imagePosition?: 'left' | 'right';
}
const { image, imageMobile, alt = '', imagePosition = 'right' } = defineProps<Props>();

interface Slots {
    /** ป้ายเล็กสี primary เหนือหัวข้อ เช่น "ทำไมต้องกระเป๋าผ้า" */
    eyebrow(): unknown;
    title(): unknown;
    description(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="relative left-1/2 w-screen -translate-x-1/2 bg-white">
        <!-- ===== Desktop: รูปเป็น bg เต็มความกว้าง/สูงของ section ข้อความลอยทับบนพื้นที่ว่างของรูป ===== -->
        <div class="relative hidden h-[20rem] w-full overflow-hidden md:block">
            <NuxtImg
                :src="image"
                :alt="alt"
                class="absolute inset-0 h-full w-full object-cover"
                :class="imagePosition === 'left' ? 'object-left' : 'object-right'"
            />

            <div
                class="absolute inset-y-0 flex w-[45%] items-center"
                :class="imagePosition === 'left' ? 'right-0 pr-16 pl-6' : 'left-0 pl-16 pr-6'"
            >
                <div class="max-w-lg text-left">
                    <p v-if="$slots.eyebrow" class="mb-2 text-base font-bold text-primary">
                        <slot name="eyebrow" mdc-unwrap="p" />
                    </p>
                    <h2 class="text-3xl leading-snug font-bold text-stone-900">
                        <slot name="title" mdc-unwrap="p" />
                    </h2>
                    <div v-if="$slots.description" class="mt-3 text-lg font-light text-stone-700">
                        <slot name="description" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== Mobile: รูปเป็น bg เต็ม section ข้อความลอยทับด้านบน ไล่เฉดขาวจากด้านบนกลืนลงไปหารูป ===== -->
        <div class="relative h-[34rem] w-full overflow-hidden md:hidden">
            <div class="absolute inset-0">
                <NuxtImg :src="imageMobile || image" :alt="alt" class="h-full w-full object-cover object-bottom" />
            </div>

            <!-- ขาวจางๆ ให้เห็นรูปโปร่งแสงลอดออกมาโซนข้อความ แล้วค่อยไล่เต็มรูปด้านล่าง -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/55 via-50% to-transparent to-85%" />

            <div class="relative z-10 px-5 pt-10 pb-20 text-left">
                <p v-if="$slots.eyebrow" class="mb-2 text-sm font-bold text-primary">
                    <slot name="eyebrow" mdc-unwrap="p" />
                </p>
                <h2 class="text-2xl leading-snug font-bold text-stone-900">
                    <slot name="title" mdc-unwrap="p" />
                </h2>
                <div v-if="$slots.description" class="mt-3 font-light text-stone-700">
                    <slot name="description" mdc-unwrap="p" />
                </div>
            </div>
        </div>
    </section>
</template>