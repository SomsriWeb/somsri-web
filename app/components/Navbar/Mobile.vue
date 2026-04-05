<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

interface Props {
    items: NavigationMenuItem[];
}

defineProps<Props>();

const isOpen = defineModel<boolean>('open', { default: false });
</script>

<template>
    <USlideover
        v-model:open="isOpen"
        :ui="{
            content: 'bg-primary max-w-xs',
            body: 'p-0 sm:p-0',
        }"
    >
        <Icon name="lucide:menu" class="w-6 h-6 lg:hidden cursor-pointer" />

        <template #title>
            <NuxtLink to="/">
                <Logo class="max-w-6" />
            </NuxtLink>
        </template>

        <template #body>
            <div class="flex flex-col pl-3 max-w-100% overflow-y-auto bg-primary">
                <UNavigationMenu
                    :items="items"
                    orientation="vertical"
                    :ui="{
                        link: 'text-white before:bg-transparent lg:max-h-[40px]',
                    }"
                />
            </div>
        </template>
        <template #close>
            <UButton color="neutral" variant="outline" icon="i-lucide-x" class="rounded-full !w-7 !h-7 !p-0 !min-w-0 absolute top-4 end-4" @click="isOpen = false" />
        </template>
    </USlideover>
</template>
