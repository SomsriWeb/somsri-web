<script setup lang="ts">
// TYPES
interface SocialItem {
    label: string;
    label2?: string;
    image?: string;
    icon?: string;
    order: number;
}

// VARIABLE
const { data } = await useAsyncData('social', () => 
    queryCollection('social' as any).order('order' as any, 'ASC').all() as Promise<SocialItem[]>
);
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
            v-for="item in data"
            :key="item.label"
            class="grid grid-cols-[auto_1fr] items-center gap-3"
        >
            <div class="w-12 h-12 flex items-center justify-center">
                <Icon
                    v-if="item.icon"
                    :name="item.icon"
                    class="w-full h-full text-primary"
                />
                <ProseImg
                    v-else-if="item.image"
                    :src="item.image"
                    :alt="item.label"
                    class="max-w-full max-h-full object-contain"
                />
            </div>
            <div class="grid grid-cols-1">
                <p class="font-bold text-primary text-sm md:text-base leading-tight">
                    {{ item.label }}
                </p>
                <p v-if="item.label2" class="font-bold text-primary text-sm md:text-base leading-tight">
                    {{ item.label2 }}
                </p>
            </div>
        </div>
    </div>
</template>

