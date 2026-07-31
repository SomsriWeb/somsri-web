<script setup lang="ts">
interface Slots {
    /** ป้ายเล็กสี primary เหนือหัวข้อใหญ่ เช่น "ทรงกระเป๋าผ้า" */
    eyebrow(): unknown;
    /** หัวข้อใหญ่ H2 กลางหน้า */
    title(): unknown;
    /** คำอธิบายสั้นใต้หัวข้อ */
    description(): unknown;

    'item-1-image'(): unknown;
    /** ป้ายเล็กสี primary บนการ์ด เช่น "ใช้งานได้ทุกวัน" */
    'item-1-tag'(): unknown;
    /** ชื่อทรงกระเป๋า เช่น "กระเป๋าทรงก้นขยาย" */
    'item-1-title'(): unknown;
    /** สเปกสั้นๆ เช่น "13 x 21 นิ้ว • สายยาว 22 นิ้ว" */
    'item-1-spec'(): unknown;
    'item-1-description'(): unknown;

    'item-2-image'(): unknown;
    'item-2-tag'(): unknown;
    'item-2-title'(): unknown;
    'item-2-spec'(): unknown;
    'item-2-description'(): unknown;

    'item-3-image'(): unknown;
    'item-3-tag'(): unknown;
    'item-3-title'(): unknown;
    'item-3-spec'(): unknown;
    'item-3-description'(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <!-- หัวข้อกลาง -->
        <div class="mx-auto max-w-2xl text-center">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
            <div v-if="$slots.description" class="mt-2 text-sm text-stone-600 md:text-base">
                <slot name="description" mdc-unwrap="p" />
            </div>
        </div>

        <!-- การ์ด 3 ใบ -->
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-12">
            <div v-for="n in 3" :key="n" class="flex flex-row overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:flex-col">
                <div class="flex w-32 shrink-0 items-center justify-center p-3 sm:aspect-square sm:w-full sm:p-6">
                    <slot :name="`item-${n}-image`" />
                </div>

                <div class="border-l border-dashed border-stone-300 px-4 py-4 text-left sm:border-t sm:border-l-0 sm:px-5 sm:py-5">
                    <p v-if="$slots[`item-${n}-tag`]" class="mb-1 text-xs font-bold text-primary">
                        <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                    </p>

                    <h3 class="text-xl font-bold text-stone-900">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>

                    <p v-if="$slots[`item-${n}-spec`]" class="mt-1 text-sm text-stone-500">
                        <slot :name="`item-${n}-spec`" mdc-unwrap="p" />
                    </p>

                    <div v-if="$slots[`item-${n}-description`]" class="mt-3 text-sm text-stone-600">
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>