<script setup lang="ts">
/**
 * แบนเนอร์อธิบายเทคนิคการพิมพ์ (เช่น Sublimation)
 * - แถบบนสีเลือดหมู (primary): ซ้าย = หัวข้อ + คำอธิบาย, ขวา = หัวข้อย่อย + bullet จุดเด่น
 * - ด้านล่าง = รูปภาพเต็มความกว้าง (full-bleed ทะลุ padding ของ Container ได้)
 */
interface Props {
    /** รูปภาพใต้แถบข้อความ */
    image: string;
    alt?: string;
    /** object-position ของรูป เช่น "center", "50% 60%" */
    imagePosition?: string;
    /** ดันให้เต็มขอบจอ โดยหักลบ padding ของ `::container` (px-5 lg:px-[4.6rem]) */
    fullBleed?: boolean;
    /** ระดับหัวข้อ เพื่อ SEO */
    titleAsTag?: 'h2' | 'h3' | 'h4';
}

const {
    image,
    alt = '',
    imagePosition = 'center',
    fullBleed = true,
    titleAsTag = 'h2',
} = defineProps<Props>();

interface Slots {
    /** หัวข้อหลัก เช่น "เทคนิคการพิมพ์ (Sublimation)" */
    title(): unknown;
    /** ย่อหน้าอธิบายเทคนิค */
    description(): unknown;
    /** หัวข้อฝั่งขวา เช่น "จุดเด่นของงานพิมพ์ Sublimation" */
    'features-title'?: () => unknown;
    /** รายการจุดเด่น (เขียนเป็น bullet list ใน markdown) */
    features?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="print-technique-banner" :class="fullBleed ? '-mx-5 lg:-mx-[4.6rem]' : ''">
        <!-- ===== แถบข้อความสี primary ===== -->
        <div class="bg-primary px-5 py-8 text-white sm:px-8 lg:px-[4.6rem] lg:py-10">
            <div class="grid gap-6 lg:grid-cols-5 lg:gap-12">
                <!-- ซ้าย: หัวข้อ + คำอธิบาย -->
                <div class="lg:col-span-3">
                    <component
                        :is="titleAsTag"
                        class="!m-0 text-2xl font-bold leading-tight text-white lg:text-3xl"
                    >
                        <slot name="title" mdc-unwrap="p" />
                    </component>

                    <div class="mt-3 text-sm font-light leading-relaxed text-white/90 lg:text-base">
                        <slot name="description" mdc-unwrap="p" />
                    </div>
                </div>

                <!-- ขวา: จุดเด่น -->
                <div v-if="$slots['features-title'] || $slots.features" class="lg:col-span-2 lg:pt-1">
                    <p v-if="$slots['features-title']" class="!m-0 text-base font-bold text-white lg:text-lg">
                        <slot name="features-title" mdc-unwrap="p" />
                    </p>

                    <div
                        v-if="$slots.features"
                        class="feature-list mt-3 text-sm font-light leading-relaxed text-white/90 lg:text-[0.95rem]"
                    >
                        <slot name="features" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== รูปภาพเต็มความกว้าง ===== -->
        <img
            :src="image"
            :alt="alt"
            loading="lazy"
            class="block h-[42vw] max-h-[420px] min-h-[180px] w-full object-cover"
            :style="{ objectPosition: imagePosition }"
        />
    </section>
</template>

<style scoped>
.feature-list :deep(ul) {
    margin: 0;
    padding-left: 1.1rem;
    list-style: disc;
}
.feature-list :deep(li) {
    margin: 0 0 0.4rem;
    color: inherit;
}
.feature-list :deep(li:last-child) {
    margin-bottom: 0;
}
.feature-list :deep(li::marker) {
    color: rgb(255 255 255 / 0.8);
}
.feature-list :deep(p) {
    margin: 0;
}
</style>