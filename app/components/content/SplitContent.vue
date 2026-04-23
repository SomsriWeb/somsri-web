<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';

// PROPS
type SplitDirection = 'left-to-right' | 'right-to-left';

interface Props {
    textClass?: string;
    imageClass?: string;
    direction?: SplitDirection;
    /** ลดช่องว่างระหว่างคอลัมน์ และจัดรูปชิดขอบฝั่งที่ติดกับข้อความ */
    compact?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    direction: 'left-to-right',
    compact: false,
});

// SLOTS
interface Slots {
    /**
     * หัวข้อหลักฝั่งข้อความ
     */
    Headertitle(): unknown;

    /**
     * คำอธิบายฝั่งข้อความ
     */
    description(): unknown;

    /**
     * เนื้อหาฝั่งภาพ เช่น ProseImg
     */
    image(): unknown;

    /**
     * เนื้อหาเพิ่มเติมฝั่งข้อความ (เช่น ย่อหน้า/ปุ่ม/รายการ)
     */
    textExtra(): unknown;
}
defineSlots<Slots>();

// COMPUTED
const isRightToLeft = computed(() => props.direction === 'right-to-left');

const sectionGapClass = computed(() =>
    // Using flex on md+, so keep gap consistent across modes
    props.compact ? 'gap-3 md:gap-3' : 'gap-6 md:gap-8',
);

const sectionLayoutClass = computed(() => [
    // Mobile: stacked
    'flex flex-col',
    // Desktop: side-by-side, respect direction
    isRightToLeft.value ? 'md:flex-row' : 'md:flex-row-reverse',
]);

const textCellClass = computed(() => [
    // Let text take ~2/3 on md+ and be flexible
    'min-w-0 md:flex-[2_1_0%]',
]);

/** ฝั่งรูป: ชิดขอบที่หันหน้าไปทางข้อความ แทนการกึ่งกลางคอลัมน์ */
const imageCellClass = computed(() => {
    if (!props.compact) {
        // ~1/3 on md+, centered on mobile
        return 'mx-auto md:mx-0 md:flex-[1_1_0%]';
    }
    return [
        // ~1/3 on md+, and align image toward the text side
        'md:flex-[1_1_0%] flex',
        isRightToLeft.value ? 'md:justify-start' : 'md:justify-end',
    ];
});

const rootRef = ref<HTMLElement | null>(null);

useScrollRevealUp(rootRef, { start: 'top 60%' });
</script>

<template>
    <section
        ref="rootRef"
        :class="['min-w-0 items-start', sectionLayoutClass, sectionGapClass]"
    >
        <div
            :class="[props.textClass, textCellClass]"
            class="min-w-0 space-y-4 [&_ul]:my-0 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:my-0 [&_ol]:list-inside [&_ol]:list-decimal [&_ol]:space-y-2 [&_li]:leading-relaxed"
        >
            <ProseH2 class="text-primary">
                <slot name="Headertitle" mdc-unwrap="p" />
            </ProseH2>
            <div class="leading-relaxed [&_p]:font-light">
                <slot name="description" mdc-unwrap="p" />
            </div>
            <slot name="textExtra" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
        </div>

        <div :class="[props.imageClass, imageCellClass]">
            <slot name="image" mdc-unwrap="p" />
        </div>
    </section>
</template>
