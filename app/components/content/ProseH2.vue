<script setup lang="ts">
// PROPS
interface Props {
    size?: 'sm' | 'lg' | 'xl' | '2xl';
}

// PROPS
const props = withDefaults(defineProps<Props>(), {
    size: 'lg',
});

const { size } = toRefs(props);

// COMPUTED
const sizeClass = computed(() => {
    switch (size.value) {
        case 'sm':
            return 'text-lg md:text-2xl';
        case 'lg':
            return 'text-xl md:text-3xl';
        case 'xl':
            return 'text-2xl md:text-4xl';
        case '2xl':
            return 'text-3xl md:text-5xl';
        default:
            return 'text-[2rem] md:text-[2.5rem]';
    }
});
</script>
<template>
    <h2 class="text-primary leading-none font-bold" :class="sizeClass">
        <slot mdc-unwrap="p" />
    </h2>
</template>
