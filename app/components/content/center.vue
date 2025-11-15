<script setup lang="ts">
// PROPS
interface Props {
    orientation?: 'horizontal' | 'vertical';
}
const { orientation = 'horizontal' } = defineProps<Props>();

// COMPUTED
const isVertical = computed<boolean>(() => orientation === 'vertical');
</script>
<template>
    <div class="flex justify-center items-center w-full gap-5 flex-wrap" :class="{ 'flex-col': isVertical }">
        <slot />
    </div>
</template>
