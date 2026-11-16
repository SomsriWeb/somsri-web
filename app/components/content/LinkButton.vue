<script setup lang="ts">
    // PROPS
    interface Props {
        to: string;
        buttonClass?: string;
    }
    const { to, buttonClass = '' } = defineProps<Props>();

    // หน้าอังกฤษ: ลิงก์ภายใน เช่น /polo → /en/polo (ถ้ามีฉบับอังกฤษ)
    const localizePath = await useLocalizedPath();
</script>
<template>
    <NuxtLink :to="localizePath(to)" class="block">
        <UButton :class="buttonClass">
            <slot mdc-unwrap="p" />
        </UButton>
    </NuxtLink>
</template>
