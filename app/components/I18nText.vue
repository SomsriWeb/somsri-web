<script setup lang="ts">
interface Props {
    k: string;
    tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'span',
});

const { t } = useI18n({ useScope: 'global' });
</script>

<template>
    <component :is="props.tag">{{ t(props.k) }}</component>
</template>

