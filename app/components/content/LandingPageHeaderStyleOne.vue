<script setup lang="ts">
import { LANGUAGE } from '~/lib/language';

// PROPS
interface Props {
    image: string;
    alt?: string;
}
const { image, alt = '' } = defineProps<Props>();

const LANG = inject<'th' | 'en' | Ref<'th' | 'en'>>(LANGUAGE, 'th');
const lang = computed<'th' | 'en'>(() => (typeof LANG === 'string' ? LANG : LANG.value));
const ctaLabel = computed(() => (lang.value === 'en' ? 'Free consultation' : 'ปรึกษาฟรี!'));
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-5">
        <ProseImg :src="image" :alt="alt" class="col-span-2" />

        <div class="col-span-3 flex flex-col justify-center items-center p-5">
            <ProseH1 class="text-[5rem]! text-center">
                <slot name="title" mdc-unwrap="p" />
            </ProseH1>

            <ProseP class="text-xl text-center text-primary!">
                <slot name="description" mdc-unwrap="p" />
            </ProseP>

            <div class="mt-5">
                <slot v-if="$slots.default" />
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
