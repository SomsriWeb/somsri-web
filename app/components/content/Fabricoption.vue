<script setup lang="ts">
interface Props {
    image: string;
    alt?: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    imagePosition?: 'left' | 'right';
}

const { image, alt = '', titleAsTag = 'h3', imagePosition = 'right' } = defineProps<Props>();
</script>

<template>
    <div class="w-full mb-5 lg:mb-8">

        <div class="relative flex lg:hidden w-full min-h-[220px] overflow-hidden border border-stone-100 ">
            <div class="absolute inset-0">
                <img :src="image" :alt="alt" class="w-full h-full object-cover" />
            </div>
            
            <div 
                class="relative z-10 w-[60%] flex flex-col justify-center px-3 py-3 bg-white/65"
                :class="imagePosition === 'left' ? 'ml-auto' : 'mr-auto'"
            >
                <component :is="titleAsTag" v-if="$slots.title" class="text-primary font-bold text-sm leading-tight mb-1.5">
                    <slot name="title" mdc-unwrap="p" />
                </component>
                
                <div v-if="$slots.description" class="text-black text-[11px] leading-snug fabric-list">
                    <slot name="description" mdc-unwrap="p" />
                </div>
                
                <div v-if="$slots.default" class="mt-1 text-black text-[11px] leading-snug">
                    <slot />
                </div>
            </div>
        </div>

        <div 
            class="relative hidden lg:flex w-full min-h-[300px] overflow-hidden border border-stone-200/40 "
            :class="imagePosition === 'left' ? 'lg:flex-row-reverse' : ''"
        >
            <div class="absolute inset-0">
                <img :src="image" :alt="alt" class="w-full h-full object-cover" />
            </div>

            <div class="relative z-10 w-[42%] flex flex-col justify-center px-12 xl:px-16 py-12 bg-white/50">
                <component :is="titleAsTag" v-if="$slots.title" class="text-primary font-bold text-2xl xl:text-3xl leading-snug mb-4">
                    <slot name="title" mdc-unwrap="p" />
                </component>
                <div v-if="$slots.description" class="text-black text-base leading-relaxed lg:text-lg fabric-list">
                    <slot name="description" mdc-unwrap="p" />
                </div>
                <div v-if="$slots.default" class="mt-4 text-black text-base leading-relaxed lg:text-lg">
                    <slot />
                </div>
            </div>

            <div class="relative z-10 w-[58%] pointer-events-none" />
        </div>

    </div>
</template>

<style scoped>
.fabric-list :deep(ul) {
    list-style: none !important;
    list-style-type: none !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.fabric-list :deep(li) {
    list-style: none !important;
    list-style-type: none !important;
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    padding-left: 0 !important;
    line-height: 1.35;
    color: #44403c !important;
}

.fabric-list :deep(li)::marker {
    content: '';
    display: none;
}

.fabric-list :deep(li)::before {
    content: '\2713';
    flex-shrink: 0;
    color: #b91c1c;
    font-weight: 700;
    font-size: 0.9em;
    line-height: 1.35;
}
</style>