<script setup lang="ts">
interface Props {
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const { titleAsTag = 'h1' } = defineProps<Props>();

const { t } = useI18n({ useScope: 'local' });

interface Slots {
    eyebrow(): unknown;
    title(): unknown;
    description(): unknown;
    note(): unknown;
}
defineSlots<Slots>();
</script>

<i18n lang="json">
{
    "th": { "eyebrow": "วิธีสั่งเสื้อ" },
    "en": { "eyebrow": "How to Order" }
}
</i18n>

<template>
    <div class="text-center max-w-2xl mx-auto px-5 pt-12 mt-5">
        <p class="font-bold font-stretch-condensed text-primary mb-2">
            <slot name="eyebrow" mdc-unwrap="p">{{ t('eyebrow') }}</slot>
        </p>

        <component :is="titleAsTag" class="font-bold font-stretch-condensed text-gray-900 text-3xl md:text-5xl leading-[1.15]">
            <slot name="title" mdc-unwrap="p" />
        </component>

        <p v-if="$slots.description" class="mt-6 text-primary text-base md:text-lg font-light">
            <slot name="description" mdc-unwrap="p" />
        </p>

        <p v-if="$slots.note" class="mt-1.5 text-primary/60 text-sm">
            <slot name="note" mdc-unwrap="p" />
        </p>
    </div>
</template>