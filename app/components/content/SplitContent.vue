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
    props.compact ? 'gap-4 md:gap-5' : 'gap-6 md:gap-8',
);

/** ฝั่งรูป: ชิดขอบที่หันหน้าไปทางข้อความ แทนการกึ่งกลางคอลัมน์ */
const imageCellClass = computed(() => {
    if (!props.compact) {
        return 'max-w-4/5 mx-auto';
    }
    return [
        'w-full flex',
        isRightToLeft.value ? 'md:justify-end' : 'md:justify-start',
    ];
});

const rootRef = ref<HTMLElement | null>(null);

useScrollRevealUp(rootRef, { start: 'top 60%' });
</script>

<template>
    <section
        ref="rootRef"
        :class="['grid min-w-0 grid-cols-1 md:grid-cols-2 items-start', sectionGapClass]"
    >
        <div
            :class="[props.textClass, isRightToLeft ? 'md:order-2' : 'md:order-1']"
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

        <div :class="[props.imageClass, isRightToLeft ? 'md:order-1' : 'md:order-2', imageCellClass]">
            <slot name="image" mdc-unwrap="p" />
        </div>
    </section>
</template>
