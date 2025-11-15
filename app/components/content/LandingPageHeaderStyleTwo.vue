<script setup lang="ts">
// PROPS
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
}
const { image, titleAsTag = 'h1', alt = '' } = defineProps<Props>();
</script>

<template>
    <div>
        <header>
            <ProseImg :src="image" :alt="alt" class="w-screen! h-screen! object-cover" />
            <div class="absolute inset-0 bg-black/30" />
            <div class="p-5 sm:p-0 absolute bottom-5 lg:bottom-10 xl:bottom-20 left-2 sm:left-5 lg:left-[4.6rem] text-white sm:max-w-60 md:max-w-60 lg:max-w-[20rem] xl:max-w-120">
                <component :is="titleAsTag" class="text-3xl md:text-4xl lg:text-5xl font-bold leading-none"><slot name="title" mdc-unwrap="p" /></component>
                <p v-if="$slots['secondary-title']" class="font-bold text-lg lg:text-2xl">
                    <slot name="secondary-title" mdc-unwrap="p" />
                </p>
                <p v-if="$slots.description" class="font-light mt-2" name="description" mdc-unwrap="p">
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mt-5">
                    <slot />
                </div>

                <div class="mt-5">
                    <slot name="cta">
                        <LineLink>
                            <UButton>ปรึกษาฟรี</UButton>
                        </LineLink>
                    </slot>
                </div>
            </div>
        </header>
    </div>
</template>
