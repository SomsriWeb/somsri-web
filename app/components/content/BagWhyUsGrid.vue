<script setup lang="ts">
interface Props {
    /** จำนวนการ์ดที่แสดง (รองรับ 1–6 และค่าเริ่มต้นยังเป็น 6) */
    items?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
    items: 6,
});

const itemCount = computed(() => {
    const count = Number(props.items);
    return Number.isFinite(count) ? Math.min(6, Math.max(1, Math.floor(count))) : 6;
});

const desktopGridClass = computed(() => (itemCount.value === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'));
const gridWidthClass = computed(() => (itemCount.value === 4 ? 'max-w-[60rem]' : 'max-w-none'));
const imageAspectClass = computed(() => (itemCount.value === 4 ? 'aspect-[3/2]' : 'aspect-[4/3]'));

interface Slots {
    [key: string]: any;
    eyebrow(): unknown;
    title(): unknown;
    description?: () => unknown;

    'item-1-image'(): unknown;
    'item-1-tag'?: () => unknown;
    'item-1-title'(): unknown;
    'item-1-description'(): unknown;

    'item-2-image'(): unknown;
    'item-2-tag'?: () => unknown;
    'item-2-title'(): unknown;
    'item-2-description'(): unknown;

    'item-3-image'(): unknown;
    'item-3-tag'?: () => unknown;
    'item-3-title'(): unknown;
    'item-3-description'(): unknown;

    'item-4-image'(): unknown;
    'item-4-tag'?: () => unknown;
    'item-4-title'(): unknown;
    'item-4-description'(): unknown;

    'item-5-image'(): unknown;
    'item-5-tag'?: () => unknown;
    'item-5-title'(): unknown;
    'item-5-description'(): unknown;

    'item-6-image'(): unknown;
    'item-6-tag'?: () => unknown;
    'item-6-title'(): unknown;
    'item-6-description'(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="mx-auto max-w-[75rem] px-5 py-4 md:py-8">
        <div class="mx-auto max-w-2xl text-center">
            <p v-if="$slots.eyebrow" class="mb-1 text-sm font-bold text-primary">
                <slot name="eyebrow" mdc-unwrap="p" />
            </p>
            <h2 class="text-2xl leading-snug font-bold text-stone-900 md:text-3xl">
                <slot name="title" mdc-unwrap="p" />
            </h2>
            <div v-if="$slots.description" class="mt-2 text-xs text-stone-500 md:text-sm">
                <slot name="description" mdc-unwrap="p" />
            </div>
        </div>

        <!-- ===== Mobile Layout (< md) สำหรับกรณี 4 รายการ: การ์ดแนวนอนสลับซ้ายขวาตาม Figma ===== -->
        <div v-if="itemCount === 4" class="mt-8 flex flex-col gap-4 md:hidden">
            <div
                v-for="n in itemCount"
                :key="`mobile-${n}`"
                class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs"
            >
                <div class="px-3 pt-3.5 pb-2 text-center">
                    <h3 class="text-xs font-bold text-stone-900 sm:text-sm">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>
                </div>

                <div class="grid grid-cols-2 items-stretch">
                    <!-- ลำดับคี่: รูปซ้าย ข้อความขวา -->
                    <template v-if="n % 2 !== 0">
                        <div class="relative h-full min-h-[130px] w-full overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_p]:h-full">
                            <slot :name="`item-${n}-image`" />
                        </div>
                        <div class="flex flex-col justify-center p-3 sm:p-4">
                            <p
                                v-if="$slots[`item-${n}-tag`]"
                                class="mb-1 text-[0.65rem] font-bold tracking-wide text-primary uppercase"
                            >
                                <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                            </p>
                            <div
                                v-if="$slots[`item-${n}-description`]"
                                class="text-xs leading-relaxed text-stone-600"
                            >
                                <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                            </div>
                        </div>
                    </template>

                    <!-- ลำดับคู่: ข้อความซ้าย รูปขวา -->
                    <template v-else>
                        <div class="flex flex-col justify-center p-3 sm:p-4">
                            <p
                                v-if="$slots[`item-${n}-tag`]"
                                class="mb-1 text-[0.65rem] font-bold tracking-wide text-primary uppercase"
                            >
                                <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                            </p>
                            <div
                                v-if="$slots[`item-${n}-description`]"
                                class="text-xs leading-relaxed text-stone-600"
                            >
                                <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                            </div>
                        </div>
                        <div class="relative h-full min-h-[130px] w-full overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_p]:h-full">
                            <slot :name="`item-${n}-image`" />
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- ===== Mobile Layout (< md) สำหรับกรณีไม่ใช่ 4 รายการ (เช่น 6 รายการ ทำไมต้องสมศรี): คงเดิม 2 คอลัมน์ ===== -->
        <div v-else class="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:hidden">
            <div
                v-for="n in itemCount"
                :key="`mobile-grid-${n}`"
                class="overflow-hidden rounded-2xl border border-stone-200"
            >
                <div class="w-full" :class="imageAspectClass">
                    <slot :name="`item-${n}-image`" />
                </div>

                <div class="px-3 py-3">
                    <p
                        v-if="$slots[`item-${n}-tag`]"
                        class="mb-1 text-[0.65rem] font-bold tracking-wide text-primary uppercase"
                    >
                        <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                    </p>
                    <h3 class="text-sm font-bold text-stone-900">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>

                    <div
                        v-if="$slots[`item-${n}-description`]"
                        class="mt-1 text-xs text-stone-600"
                    >
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== Desktop Layout (md ขึ้นไป): คงดีไซน์เดิม 100% ===== -->
        <div
            class="mx-auto mt-12 hidden md:grid md:gap-x-6 md:gap-y-8"
            :class="[desktopGridClass, gridWidthClass]"
        >
            <div
                v-for="n in itemCount"
                :key="`desktop-${n}`"
                class="overflow-hidden rounded-2xl border border-stone-200"
            >
                <div class="w-full" :class="imageAspectClass">
                    <slot :name="`item-${n}-image`" />
                </div>

                <div class="px-4 py-4">
                    <p
                        v-if="$slots[`item-${n}-tag`]"
                        class="mb-1 text-[0.65rem] font-bold tracking-wide text-primary uppercase md:text-xs"
                    >
                        <slot :name="`item-${n}-tag`" mdc-unwrap="p" />
                    </p>
                    <h3 class="text-sm font-bold text-stone-900 md:text-lg">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>

                    <div
                        v-if="$slots[`item-${n}-description`]"
                        class="mt-1 text-xs text-stone-600 md:text-sm"
                    >
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
