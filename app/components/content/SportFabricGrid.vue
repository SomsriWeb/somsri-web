<script setup lang="ts">
interface Slots {
    eyebrow(): unknown;
    title(): unknown;
    description(): unknown;

    'item-1-image'(): unknown;
    'item-1-tag'(): unknown;
    'item-1-title'(): unknown;
    'item-1-description'(): unknown;
    /** รายการ tag ย่อย เขียนเป็น bullet list markdown เช่น "- เสื้อโรงเรียน" */
    'item-1-pills'?: () => unknown;

    'item-2-image'(): unknown;
    'item-2-tag'(): unknown;
    'item-2-title'(): unknown;
    'item-2-description'(): unknown;
    'item-2-pills'?: () => unknown;

    'item-3-image'(): unknown;
    'item-3-tag'(): unknown;
    'item-3-title'(): unknown;
    'item-3-description'(): unknown;
    'item-3-pills'?: () => unknown;

    'item-4-image'(): unknown;
    'item-4-tag'(): unknown;
    'item-4-title'(): unknown;
    'item-4-description'(): unknown;
    'item-4-pills'?: () => unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <div class="mx-auto max-w-2xl text-center title-block">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
            <div v-if="$slots.description" class="mt-3 text-sm text-stone-600 md:text-base">
                <slot name="description" mdc-unwrap="p" />
            </div>
        </div>

        <!-- ===== grid รูป: ไม่มี gap, ไม่มี border/rounded ครอบ รูปชิดขอบซ้าย-ขวาของ container ===== -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:mt-14">
            <div
                v-for="n in 4"
                :key="n"
                class="flex flex-col mb-8 sm:mb-0"
                :class="n <= 2 ? 'sm:!mb-10' : ''"
            >
                <!-- รูป: บนมือถือมี gradient + ชื่อ fabric ซ้อนทับบนรูป -->
                <div class="relative aspect-[16/10] w-full overflow-hidden">
                    <slot :name="`item-${n}-image`" />

                    <div
                        class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-black/60 sm:hidden"
                    />
                    <h3 class="absolute inset-x-0 bottom-0 p-4 text-2xl font-bold text-white sm:hidden">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>
                </div>

                <div
                    class="px-4 pt-4 pb-2 sm:px-8 sm:pt-5 sm:pb-10"
                    :class="n % 2 === 0 ? 'divider-left' : ''"
                >
                    <p class="mb-1 text-sm font-bold text-primary">
                        <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                    </p>
                    <!-- ชื่อ fabric: ซ้ำเฉพาะ desktop เพราะมือถือแสดงซ้อนบนรูปแล้ว -->
                    <h3 class="hidden text-2xl font-bold text-stone-900 sm:block">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>
                    <div class="mt-2 text-sm text-stone-600 md:text-base">
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>

                    <div v-if="$slots[`item-${n}-pills`]" class="pills mt-4">
                        <slot :name="`item-${n}-pills`" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* บังคับให้แต่ละบรรทัดของ title ขึ้นบรรทัดใหม่จริง (markdown hard break \ ท้ายบรรทัด) แทนที่จะปล่อยให้ browser wrap เอง */
.title-block :deep(br) {
    display: block;
    content: '';
}

/* เส้นประคั่นระหว่าง text ของคอลัมน์ซ้าย-ขวาในแถวเดียวกัน เฉพาะ desktop (sm ขึ้นไป) */
@media (min-width: 640px) {
    .divider-left {
        border-left: 2px dashed color-mix(in srgb, var(--color-primary) 70%, transparent);
    }
}

/* แปลง bullet list markdown ให้กลายเป็นแถว pill สีชมพูอ่อน */
.pills :deep(ul) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}
.pills :deep(li) {
    border-radius: 9999px;
    background-color: color-mix(in srgb, var(--color-primary) 12%, white);
    color: var(--color-primary);
    font-size: 0.75rem;
    line-height: 1;
    padding: 0.4rem 0.75rem;
}
</style>