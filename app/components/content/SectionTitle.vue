<script setup lang="ts">
interface Props {
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: string;
    align?: 'left' | 'center' | 'right';
    my?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const { titleAsTag = 'h2', align = 'left', my = 'none' } = defineProps<Props>();

const spacingClasses: Record<NonNullable<Props['my']>, string> = {
    none: 'my-0',
    sm: 'my-2 lg:my-3',
    md: 'my-4 lg:my-6',
    lg: 'my-6 lg:my-8',
    xl: 'my-8 lg:my-12'
};
</script>

<template>
    <component
        :is="titleAsTag"
        class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary"
        :class="[
            spacingClasses[my],
            {
                'text-left': align === 'left',
                'text-center': align === 'center',
                'text-right': align === 'right'
            }
        ]"
    >
        <slot mdc-unwrap="p" />
    </component>
</template>