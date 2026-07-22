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
    <div
        class="relative overflow-hidden bg-linear-to-b from-white via-white to-stone-200 lg:grid lg:h-64 lg:grid-cols-[55%_45%] lg:bg-linear-to-r lg:from-white lg:via-white lg:to-stone-300"
    >
        <div
            class="relative z-10 flex flex-col items-center gap-6 px-5 pt-8 pb-6 text-primary lg:items-stretch lg:justify-center lg:gap-5 lg:px-10 lg:py-0 xl:pl-16 xl:pr-8"
        >
            <div class="flex w-full max-w-md flex-col items-center text-center lg:max-w-120 lg:items-start lg:text-left xl:max-w-136">
                <p
                    v-if="$slots['secondary-title']"
                    class="text-stone-700 text-lg leading-none font-bold font-stretch-condensed lg:text-lg"
                >
                    <slot name="secondary-title" mdc-unwrap="p" />
                </p>
                <component
                    :is="titleAsTag"
                    class="mt-2 text-4xl leading-none font-bold lg:mt-0 lg:text-[2.5rem] xl:text-5xl"
                >
                    <slot name="title" mdc-unwrap="p" />
                </component>
                <p
                    v-if="$slots.description"
                    class="text-stone-700 mt-3 max-w-sm text-lg leading-snug font-light lg:mt-1 lg:max-w-lg lg:text-base"
                    mdc-unwrap="p"
                >
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mt-3">
                    <slot />
                </div>
            </div>

            <div class="flex justify-center lg:justify-start">
                <slot name="cta">
                    <LineLink>
                        <UButton
                            size="xl"
                            color="primary"
                            variant="solid"
                            class="gap-3 rounded-sm px-5 text-base font-semibold text-white shadow-none"
                        >
                            ปรึกษาฟรี
                            <Icon name="lucide:arrow-right" size="1rem" class="shrink-0 text-white" />
                        </UButton>
                    </LineLink>
                </slot>
            </div>
        </div>

        <!-- มือถือ: รูปติดล่างขวาเสมอ -->
        <div class="relative flex items-end justify-end overflow-hidden lg:hidden">
            <ProseImg
                :src="image"
                :alt="alt"
                class="ml-auto max-h-72 w-auto max-w-full origin-bottom-right object-contain object-bottom-right"
            />
        </div>

        <!-- desktop: รูปฝั่งขวา -->
        <div class="relative hidden h-full min-h-0 items-end justify-end overflow-hidden lg:flex">
            <ProseImg
                :src="image"
                :alt="alt"
                class="h-full w-full scale-115 object-contain object-bottom-right origin-bottom-right"
            />
        </div>
    </div>
</template>
