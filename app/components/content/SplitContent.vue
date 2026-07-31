<script setup lang="ts">
import { useScrollRevealUp } from '~/composables/useScrollRevealUp';
import ProseH1 from './ProseH1.vue';
import ProseH2 from './ProseH2.vue';
import ProseH3 from './ProseH3.vue';
import ProseH4 from './ProseH4.vue';
import ProseP from './ProseP.vue';

// TYPE
type SplitDirection = 'left-to-right' | 'right-to-left';
type MobileImagePosition = 'top' | 'bottom';
type StackUntil = 'sm' | 'md';

// PROPS
interface Props {
    textClass?: string;
    imageClass?: string;
    headerClass?: string;
    descriptionClass?: string;
    textExtraClass?: string;
    direction?: SplitDirection;
    mobileImagePosition?: MobileImagePosition;
    stackUntil?: StackUntil;
    /** ลดช่องว่างระหว่างคอลัมน์ และจัดรูปชิดขอบฝั่งที่ติดกับข้อความ */
    compact?: boolean;
    headerTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}
const props = withDefaults(defineProps<Props>(), {
    direction: 'left-to-right',
    mobileImagePosition: 'bottom',
    stackUntil: 'md',
    compact: false,
    headerTag: 'h3',
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

// VARIABLE
const headerTagComponent = {
    h1: ProseH1,
    h2: ProseH2,
    h3: ProseH3,
    h4: ProseH4,
    p: ProseP,
};

// COMPUTED
const isRightToLeft = computed(() => props.direction === 'right-to-left');
const desktopPrefix = computed(() => (props.stackUntil === 'md' ? 'lg' : 'md'));

const sectionGapClass = computed(() =>
    // Using flex on md+, so keep gap consistent across modes
    props.compact ? `gap-3 ${desktopPrefix.value}:gap-3` : `gap-6 ${desktopPrefix.value}:gap-8`,
);

const sectionLayoutClass = computed(() => [
    // Mobile: stacked
    'flex flex-col',
    // Desktop: side-by-side, respect direction
    isRightToLeft.value ? `${desktopPrefix.value}:flex-row` : `${desktopPrefix.value}:flex-row-reverse`,
]);

const textCellClass = computed(() => [
    // Let text take ~2/3 on md+ and be flexible
    `min-w-0 ${desktopPrefix.value}:flex-[2_1_0%]`,
    props.mobileImagePosition === 'top' ? `order-2 ${desktopPrefix.value}:order-none` : `order-1 ${desktopPrefix.value}:order-none`,
]);

/** ฝั่งรูป: ชิดขอบที่หันหน้าไปทางข้อความ แทนการกึ่งกลางคอลัมน์ */
const imageCellClass = computed(() => {
    if (!props.compact) {
        // ~1/3 on md+, centered on mobile
        return [
            `mx-auto ${desktopPrefix.value}:mx-0 ${desktopPrefix.value}:flex-[1_1_0%]`,
            props.mobileImagePosition === 'top' ? `order-1 ${desktopPrefix.value}:order-none` : `order-2 ${desktopPrefix.value}:order-none`,
        ];
    }
    return [
        // ~1/3 on md+, and align image toward the text side
        `${desktopPrefix.value}:flex-[1_1_0%] flex`,
        props.mobileImagePosition === 'top' ? `order-1 ${desktopPrefix.value}:order-none` : `order-2 ${desktopPrefix.value}:order-none`,
        isRightToLeft.value ? `${desktopPrefix.value}:justify-start` : `${desktopPrefix.value}:justify-end`,
    ];
});

const rootRef = ref<HTMLElement | null>(null);

useScrollRevealUp(rootRef, { start: 'top 60%' });
</script>

<template>
    <section ref="rootRef" :class="['min-w-0 items-start', sectionLayoutClass, sectionGapClass]">
        <div
            :class="[props.textClass, textCellClass]"
            class="min-w-0 space-y-4 [&_ul]:my-0 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:my-0 [&_ol]:list-inside [&_ol]:list-decimal [&_ol]:space-y-2 [&_li]:leading-relaxed"
        >
            <component :is="headerTagComponent[props.headerTag] || ProseH3" v-if="$slots.Headertitle" :class="['text-primary', props.headerClass]">
                <slot name="Headertitle" mdc-unwrap="p" />
            </component>

            <div :class="['leading-relaxed [&_p]:font-light', props.descriptionClass]">
                <slot name="description" mdc-unwrap="p" />
            </div>
            <div v-if="$slots.textExtra" :class="props.textExtraClass">
                <slot name="textExtra" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
            </div>
        </div>

        <div :class="[props.imageClass, imageCellClass]">
            <slot name="image" mdc-unwrap="p" />
        </div>
    </section>
</template>
