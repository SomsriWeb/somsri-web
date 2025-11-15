<script setup lang="ts">
// PROPS
interface Props {
    spacing?: number;
}
const props = withDefaults(defineProps<Props>(), {
    spacing: 1,
});
const { spacing } = toRefs(props);

// SLOTS
interface Slots {
    /**
     * หัวข้อ (ใส่ Component อะไรก็ได้)
     */
    title(): unknown;

    /**
     * รายละเอียด (ใส่ Component อะไรก็ได้)
     */
    description(): unknown;
}
defineSlots<Slots>();

// COMPUTED
const spacingClass = computed<string>(() => `space-y-${spacing.value}`);
</script>
<template>
    <div :class="[spacingClass]">
        <slot name="title" />
        <slot name="description" />
    </div>
</template>
