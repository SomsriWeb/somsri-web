<script setup lang="ts">
    // PROPS
    interface Props {
        to: string;
        buttonClass?: string;
    }
    const { to, buttonClass = '' } = defineProps<Props>();
</script>
<template>
    <NuxtLink :to="to" class="block">
        <UButton :class="buttonClass">
            <slot mdc-unwrap="p" />
        </UButton>
    </NuxtLink>
</template>
