<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

// PROPS
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
    screenHeight?: boolean;
    imageAnchor?: 'left' | 'right' | 'center' | string;
}
const { image, titleAsTag = 'h1', alt = '', screenHeight = true, imageAnchor = 'center' } = defineProps<Props>();

// VARIABLE
const minImageHeight = 'min-h-[20rem]';
const objectPosition = `object-${imageAnchor}`;

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));
const ctaLabel = computed(() => (lang.value === 'en' ? 'Free consultation' : 'ปรึกษาฟรี'));
</script>

<template>
    <div class="relative">
        <div class="relative" :class="{ [minImageHeight]: true }">
            <ProseImg :src="image" :alt="alt" class="w-screen! object-cover" :class="{ 'h-screen!': screenHeight, [minImageHeight]: true, [objectPosition]: true }" />
            <div class="absolute inset-0 bg-black/15" />
        </div>
        <div class="absolute p-5 sm:p-0 h-full flex flex-col justify-center top-0 right-2 sm:right-5 text-white sm:max-w-60 md:max-w-60 lg:max-w-[20rem] xl:max-w-84">
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
                        <UButton>{{ ctaLabel }}</UButton>
                    </LineLink>
                </slot>
            </div>
        </div>
    </div>
</template>
