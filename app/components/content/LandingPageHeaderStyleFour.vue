<script setup lang="ts">
// PROPS
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
}
const { image, titleAsTag = 'h1', alt = '' } = defineProps<Props>();

const { t } = useI18n();
</script>

<template>
    <div class="relative overflow-hidden bg-primary lg:grid lg:grid-cols-2 lg:gap-5 lg:h-screen">
        <!-- มือถือ: รูปเต็มพื้นหลัง + scrim ให้อ่านข้อความขาว -->
        <div class="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true">
            <ProseImg :src="image" alt="" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative z-10 flex min-h-[min(72vh,28rem)] flex-col justify-between p-5 text-primary lg:text-white sm:min-h-[min(65vh,26rem)] md:min-h-0 md:p-12 lg:min-h-0 lg:pr-5 xl:pr-12"
        >
            <div class="flex flex-col justify-center">
                <component :is="titleAsTag" class="text-center text-7xl leading-none font-bold md:text-left">
                    <slot name="title" mdc-unwrap="p" />
                </component>
                <p
                    v-if="$slots['secondary-title']"
                    class="text-center text-2xl leading-none font-bold font-stretch-condensed md:text-left"
                >
                    <slot name="secondary-title" mdc-unwrap="p" />
                </p>
                <p v-if="$slots.description" class="mt-1 text-center text-2xl leading-none font-light md:text-left" mdc-unwrap="p">
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mt-3">
                    <slot />
                </div>
            </div>
            <div class="mt-6 flex justify-center md:mt-3 md:justify-start">
                <slot name="cta">
                    <LineLink>
                        <UButton
                            color="neutral"
                        >
                            <Icon name="lucide:message-circle" size="1rem" class="shrink-0 text-primary" />
                            {{ t('cta.freeConsultation') }}
                        </UButton>
                    </LineLink>
                </slot>
            </div>
        </div>

        <div class="relative hidden min-h-0 h-full lg:block">
            <ProseImg :src="image" :alt="alt" class="h-full min-h-[40vh] w-full object-cover lg:min-h-0" />
        </div>
    </div>
</template>
