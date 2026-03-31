<script setup lang="ts">
// PROPS
type SplitDirection = 'left-to-right' | 'right-to-left';

interface Props {
    textClass?: string;
    imageClass?: string;
    direction?: SplitDirection;
}
const props = withDefaults(defineProps<Props>(), {
    direction: 'left-to-right',
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
</script>

<template>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div :class="[props.textClass, isRightToLeft ? 'md:order-2' : 'md:order-1']" class="space-y-4">
            <ProseH2 class="text-primary">
                <slot name="Headertitle" mdc-unwrap="p" />
            </ProseH2>
            <ProseP class="leading-relaxed">
                <slot name="description" mdc-unwrap="p" />
            </ProseP>
            <slot name="textExtra" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
        </div>

        <div :class="[props.imageClass, isRightToLeft ? 'md:order-1' : 'md:order-2']" class="max-w-full ">
            <slot name="image" mdc-unwrap="p" />
        </div>
    </section>
</template>
