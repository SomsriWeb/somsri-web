<script setup lang="ts">
// PROPS
interface Props {
    spacing?: number;
    rowOnDesktop?: boolean;
    titleColClass?: string;
    descriptionColClass?: string;
    listFix?: boolean;
    singleLineList?: boolean;
    centerOnDesktop?: boolean;
    centerMaxWidthClass?: string;
    titleLg?: boolean;
    /** ระยะห่างระหว่าง title กับ description (หน่วย rem) ใช้ได้เมื่อ listFix=true */
    titleGap?: number;
    /** true = ปรับสีข้อความ description เป็น stone-700 */
    descriptionMuted?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    spacing: 1,
    rowOnDesktop: false,
    titleColClass: 'md:col-span-4 lg:col-span-3',
    descriptionColClass: 'md:col-span-8 lg:col-span-9',
    listFix: false,
    singleLineList: false,
    centerOnDesktop: false,
    centerMaxWidthClass: 'lg:max-w-2xl',
    titleLg: false,
    titleGap: 0.5,
    descriptionMuted: false,
});
const {
    spacing, rowOnDesktop, titleColClass, descriptionColClass,
    listFix, singleLineList, centerOnDesktop, centerMaxWidthClass, titleLg,
    titleGap, descriptionMuted,
} = toRefs(props);

// SLOTS
interface Slots {
    title(): unknown;
    description(): unknown;
}
defineSlots<Slots>();

// COMPUTED
const spacingClass = computed<string>(() => `space-y-${spacing.value}`);
const gridClass = computed<string>(
    () => 'grid grid-cols-1 md:grid-cols-12 items-start gap-x-6 lg:gap-x-8 gap-y-2'
);
const useRowLayout = computed(() => rowOnDesktop.value && !centerOnDesktop.value);
const wrapperClass = computed(() => ({
    'title-description-list-fix': listFix.value,
    'single-line': listFix.value && singleLineList.value,
    'title-lg': titleLg.value,
    'description-muted': listFix.value && descriptionMuted.value,
}));
const centerClass = computed(() =>
    centerOnDesktop.value ? [centerMaxWidthClass.value, 'lg:mx-auto'] : []
);
// ใช้ inline style สำหรับ gap แทน Tailwind class เพื่อเลี่ยงปัญหา JIT ไม่ scan dynamic class
const gapStyle = computed(() =>
    listFix.value ? { '--title-gap': `${titleGap.value}rem` } : undefined
);
</script>

<template>
    <div v-if="!useRowLayout" :class="[spacingClass, wrapperClass, centerClass]" :style="gapStyle">
        <slot name="title" />
        <slot name="description" />
    </div>

    <div v-else :class="[gridClass, wrapperClass]" :style="gapStyle">
        <div :class="titleColClass">
            <slot name="title" />
        </div>
        <div :class="descriptionColClass">
            <slot name="description" />
        </div>
    </div>
</template>

<style scoped>
.title-description-list-fix :deep(ul) {
    list-style: none !important;
    padding: 0 !important;
    margin: 0;
}

.title-description-list-fix :deep(li) {
    list-style: none !important;
    padding-left: 1.1rem !important;
    text-indent: -1.1rem !important;
    margin: 0;
}

.title-description-list-fix :deep(li)::before {
    content: "•";
    display: inline-block;
    width: 1.1rem;
    text-indent: 0;
    color: var(--ui-border-accented, currentColor);
}

.title-description-list-fix.single-line :deep(li) {
    white-space: nowrap;
    text-indent: 0 !important;
    font-size: clamp(0.6rem, 2.6vw, 0.875rem);
}

.title-description-list-fix.single-line :deep(li)::before {
    margin-left: -1.1rem;
}

.title-description-list-fix > :deep(*:nth-child(2)) {
    margin-top: var(--title-gap, 0.5rem) !important;
}

.description-muted :deep(li) {
    color: #44403c !important;
}

.title-lg :deep(h2) {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
}

.description-muted :deep(li) {
    color: #44403c !important;
}

.description-muted :deep(li)::before {
    color: #44403c !important;
}
@media (min-width: 48rem) {
    .title-lg :deep(h2) {
        font-size: 1.875rem !important;
        line-height: 2.25rem !important;
    }
}
@media (min-width: 64rem) {
    .title-lg :deep(h2) {
        font-size: 2.25rem !important;
        line-height: 2.5rem !important;
    }
}
</style>