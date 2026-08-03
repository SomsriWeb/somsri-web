<script setup lang="ts">
interface Slots {
    eyebrow(): unknown;
    title(): unknown;

    'item-1-image'(): unknown;
    /** รูปแยกสำหรับมือถือ (ถ้าไม่ใส่จะ fallback ไปใช้ item-1-image) */
    'item-1-image-mobile'?: () => unknown;
    'item-1-title'(): unknown;
    'item-1-description'(): unknown;

    'item-2-image'(): unknown;
    'item-2-image-mobile'?: () => unknown;
    'item-2-title'(): unknown;
    'item-2-description'(): unknown;

    'item-3-image'(): unknown;
    'item-3-image-mobile'?: () => unknown;
    'item-3-title'(): unknown;
    'item-3-description'(): unknown;

    'item-4-image'(): unknown;
    'item-4-image-mobile'?: () => unknown;
    'item-4-title'(): unknown;
    'item-4-description'(): unknown;

    'item-5-image'(): unknown;
    'item-5-image-mobile'?: () => unknown;
    'item-5-title'(): unknown;
    'item-5-description'(): unknown;

    'item-6-image'(): unknown;
    'item-6-image-mobile'?: () => unknown;
    'item-6-title'(): unknown;
    'item-6-description'(): unknown;
}
defineSlots<Slots>();

interface Props {
    /**
     * สีตัวหนังสือ (เฉพาะ desktop) ต่อการ์ด 1-6 ใบ: 'light' = ตัวหนังสือขาว (สำหรับพื้นหลังเข้ม),
     * 'dark' = ตัวหนังสือเข้ม (สำหรับพื้นหลังอ่อน) ไม่ใส่ prop นี้ = ใช้ค่า default เดิม
     * (หน้า bag: ขาว 4 ใบแรก, เข้ม 2 ใบหลัง) เพื่อไม่กระทบหน้าที่ใช้ component นี้อยู่แล้ว
     *
     * ใน content markdown ให้ bind ด้วย `:` เสมอ เช่น
     * ::use-case-grid{:tones='["dark","dark","dark","dark","dark","dark"]'}
     * (ถ้าลืมใส่ `:` MDC จะส่งมาเป็น string ธรรมดา component จะ parse ให้เองเป็น fallback)
     */
    tones?: Array<'light' | 'dark'> | string;
}
const props = defineProps<Props>();

const tonePresets = {
    light: { text: 'text-white', sub: 'text-white/90', shadow: 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]' },
    dark: { text: 'text-stone-900', sub: 'text-stone-700', shadow: 'drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]' },
};

// ค่า default เดิม (ตามหน้า bag: 4 ใบแรกพื้นเข้ม, 2 ใบหลังพื้นอ่อน)
const defaultTones: Array<'light' | 'dark'> = ['light', 'light', 'light', 'light', 'dark', 'dark'];

// รองรับกรณี MDC ส่ง tones มาเป็น string (ลืมใส่ `:` นำหน้า) เผื่อ parse ไม่ได้ค่อย fallback เป็น default
function resolveTones(input: Props['tones']): Array<'light' | 'dark'> {
    if (Array.isArray(input)) return input;
    if (typeof input === 'string') {
        try {
            const parsed = JSON.parse(input);
            if (Array.isArray(parsed)) return parsed;
        } catch {
            const parts = input.split(',').map((s) => s.trim()) as Array<'light' | 'dark'>;
            if (parts.every((p) => p === 'light' || p === 'dark')) return parts;
        }
    }
    return defaultTones;
}

const tones = computed(() => resolveTones(props.tones).map((t) => tonePresets[t] ?? tonePresets.light));
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
        </div>

        <!-- ===== Mobile: รูป+หัวข้อ(บน) และ description(ล่าง) อยู่ในกรอบเดียวกัน คั่นด้วยเส้น ===== -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:hidden">
            <div v-for="n in 6" :key="n" class="overflow-hidden rounded-2xl border border-stone-200">
                <div class="relative aspect-square w-full">
                    <div class="absolute inset-0">
                        <slot v-if="$slots[`item-${n}-image-mobile`]" :name="`item-${n}-image-mobile`" />
                        <slot v-else :name="`item-${n}-image`" />
                    </div>
                    <!-- แถบสีทึบ (ไม่ไล่สี) คลุมเฉพาะโซนหัวข้อ -->
                    <div class="absolute inset-x-0 bottom-0 bg-black/80 px-3 py-3">
                        <h3 class="text-base leading-snug font-bold text-white">
                            <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                        </h3>
                    </div>
                </div>

                <div v-if="$slots[`item-${n}-description`]" class="border-t border-stone-200 px-3 py-2.5 text-xs text-stone-600">
                    <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                </div>
            </div>
        </div>

        <!-- ===== Desktop: การ์ดเดี่ยวเต็ม รูป+ข้อความลอยทับในกรอบเดียวกัน ===== -->
        <div class="mt-12 hidden grid-cols-2 gap-5 md:grid">
            <div v-for="n in 6" :key="n" class="relative flex h-[7.25rem] items-center overflow-hidden rounded-2xl">
                <div class="absolute inset-0">
                    <slot :name="`item-${n}-image`" />
                </div>

                <div class="relative z-10 max-w-[70%] px-5">
                    <h3 class="text-lg leading-snug font-bold" :class="[tones[n - 1].text, tones[n - 1].shadow]">
                        <slot :name="`item-${n}-title`" mdc-unwrap="p" />
                    </h3>
                    <div v-if="$slots[`item-${n}-description`]" class="mt-1 text-sm" :class="[tones[n - 1].sub, tones[n - 1].shadow]">
                        <slot :name="`item-${n}-description`" mdc-unwrap="p" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>