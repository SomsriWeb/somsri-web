<script setup lang="ts">
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
    overlayPosition?: 'left' | 'right';
    overlayColor?: string;
    textColor?: string;
    descriptionColor?: string;
    showDivider?: boolean;
    imagePosition?: string;
    contentLayout?: 'stack' | 'row';
    titleSecondaryColor?: string;
    desktopLayout?: 'split' | 'overlay';
    overlayWidth?: '30%' | '35%' | '40%' | '45%' | '50%' | '60%';
    isLargeTitle?: boolean; 
    isMobileRedesign?: boolean;
}

const {
    image,
    titleAsTag = 'h2',
    alt = '',
    overlayPosition = 'left',
    overlayColor = 'bg-white/50',
    textColor = 'text-primary',
    descriptionColor = 'text-stone-600',
    showDivider = true,
    imagePosition = 'top',
    contentLayout = 'stack',
    titleSecondaryColor = 'text-primary',
    desktopLayout = 'split',
    overlayWidth = '40%',
    isLargeTitle = false,
    isMobileRedesign = false,
} = defineProps<Props>();
</script>

<template>
    <div class="relative w-full">

        <div
            class="flex flex-col w-full"
            :class="desktopLayout === 'overlay' ? '' : 'lg:hidden'"
        >
            <div class="relative w-full">
                <img
                    :src="image"
                    :alt="alt"
                    class="w-full h-[85vw] min-h-[340px] max-h-[480px] object-cover lg:h-[42vw] lg:min-h-[380px] lg:max-h-[600px]"
                    :class="[
                        isLargeTitle ? 'h-[100vw] sm:h-[85vw] min-h-[440px]' : '',
                        isMobileRedesign ? '!h-[140vw] !min-h-[500px] !max-h-[650px] lg:!h-[42vw] lg:!min-h-[380px] lg:!max-h-[600px]' : ''
                    ]"
                    :style="{ objectPosition: imagePosition }"
                />            

                <div
                    class="absolute bottom-0 left-0 right-0 overflow-y-auto lg:px-12 lg:pb-8 lg:pt-6"
                    :class="[
                        overlayColor, 
                        'text-left',
                        overlayPosition === 'right' ? 'lg:text-right' : 'lg:text-left',
                        isLargeTitle ? 'px-6 py-8 sm:px-10 sm:py-10' : 'px-5 pb-4 pt-[1%]',
                        isMobileRedesign ? '!text-left !px-6 !pb-4 !pt-3 lg:!px-12 lg:!pb-8' : ''
                    ]"
                >
                    <div
                        :class="[
                            contentLayout === 'row' ? 'flex flex-col lg:flex-row items-start gap-4 lg:gap-10' : 'flex flex-col',
                            isMobileRedesign ? 'lg:!items-center' : ''
                        ]"
                    >
                        <div :class="[contentLayout === 'row' ? 'flex-shrink-0 lg:max-w-[30%]' : '', isMobileRedesign ? 'lg:!self-center' : '']">
                            <component
                                :is="titleAsTag"
                                v-if="$slots.title"
                                class="font-bold leading-none !m-0 lg:text-4xl xl:text-5xl"
                                :class="[
                                    textColor, 
                                    isLargeTitle ? 'font-extrabold text-3xl sm:text-4xl tracking-tight' : 'text-lg',
                                    isMobileRedesign ? '!text-3xl sm:!text-4xl' : '' 
                                ]"
                            >
                                <slot name="title" mdc-unwrap="p" />
                            </component>

                            <p
                                v-if="$slots['title-secondary']"
                                class="font-bold leading-none !m-0 lg:text-5xl xl:text-6xl"
                                :class="[
                                    titleSecondaryColor, 
                                    isLargeTitle ? 'font-extrabold text-5xl sm:text-6xl tracking-tight mt-1 sm:mt-2' : 'text-xl',
                                    isMobileRedesign ? '!text-[5rem] sm:!text-[6rem] !leading-[0.85] !-mt-2 lg:!mt-2 lg:!text-7xl' : ''
                                ]"
                            >
                                <slot name="title-secondary" mdc-unwrap="p" />
                            </p>

                            <div
                                v-if="showDivider"
                                class="w-10 h-[2px] bg-primary mt-1 mb-1 lg:w-14 lg:mt-4 lg:mb-6"
                                :class="[
                                    overlayPosition === 'right' ? 'lg:ml-auto' : '',
                                    isLargeTitle ? 'mt-3 mb-3' : '',
                                    isMobileRedesign ? '!hidden lg:!block' : '' 
                                ]"
                            />
                        </div>

                        <div
                            v-if="$slots.description"
                            class="font-light text-sm leading-snug lg:text-base w-full"
                            :class="[
                                contentLayout === 'row' ? 'mt-2 lg:mt-0' : 'mt-0', 
                                descriptionColor,
                                isMobileRedesign ? '' : 'inherit-desc-color',
                                isMobileRedesign ? 'lg:!self-center' : '',
                                isLargeTitle 
                                    ? 'font-medium sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:list-inside [&_ul]:!ml-0 [&_ul]:!text-left [&_li]:!text-left [&_ul]:space-y-2 lg:[&_ul]:space-y-3 lg:[&_ul]:list-outside lg:[&_ul]:ml-5 [&_ul]:mt-2 lg:[&_ul]:mt-0 [&_ul]:mb-0 [&_li]:leading-snug [&_li]:pl-1 [&_li]:text-balance' 
                                    : '[&_ul]:space-y-0 [&_ul]:!my-0 [&_ul]:!list-inside [&_ul]:!ps-0 [&_ul]:!ms-0 [&_ul]:!text-left [&_li]:!text-left [&_li]:leading-tight [&_li]:!mb-0 lg:[&_ul]:!list-outside lg:[&_ul]:!ps-5',
                                isMobileRedesign ? '!text-stone-700 [&_ul]:!list-inside [&_ul]:!pl-0 [&_ul]:!ml-0 [&_ul]:!text-left [&_li]:!text-left [&_ul]:marker:text-stone-700 [&_li]:!text-stone-700 [&_li]:!pl-1 !-mt-4 sm:!-mt-5 lg:!mt-6 lg:[&_ul]:!list-outside lg:[&_ul]:!pl-5' : ''
                            ]"
                        >
                            <slot name="description" mdc-unwrap="p" />
                            <template v-if="$slots['description-secondary']">
                                <br />
                                <slot name="description-secondary" mdc-unwrap="p" />
                            </template>
                        </div>
                    </div>

                    <div v-if="$slots.default" class="mt-3 lg:mt-6" :class="isLargeTitle ? 'mt-4' : ''">
                        <slot />
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="desktopLayout === 'split'"
            class="hidden lg:flex relative w-full min-h-[700px]"
            :class="overlayPosition === 'right' ? 'flex-row-reverse' : 'flex-row'"
        >
            <div class="absolute inset-0">
                <img :src="image" :alt="alt" class="w-full h-full object-cover" :style="{ objectPosition: imagePosition }" />
            </div>

            <div
                class="relative z-10 min-h-[700px] flex flex-col justify-center px-12 xl:px-20 py-16"
                :style="{ width: overlayWidth }"
                :class="overlayColor"
            >
                <div class="w-full">
                    <component :is="titleAsTag" v-if="$slots.title" class="font-bold text-4xl xl:text-5xl leading-none tracking-tight" :class="textColor">
                        <slot name="title" mdc-unwrap="p" />
                    </component>

                    <p v-if="$slots['title-secondary']" class="font-bold text-6xl xl:text-7xl leading-none tracking-tight mt-2" :class="titleSecondaryColor">
                        <slot name="title-secondary" mdc-unwrap="p" />
                    </p>

                    <div v-if="showDivider" class="w-14 h-[2px] bg-primary mt-4 mb-6" />

                    <div
                        v-if="$slots.description"
                        class="font-normal text-sm leading-relaxed lg:text-base mt-6 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:!ml-0 [&_ul]:space-y-3 [&_ul]:!my-0 [&_li]:leading-snug inherit-desc-color"
                        :class="descriptionColor"
                    >
                        <slot name="description" mdc-unwrap="p" />
                    </div>
                </div>
            </div>

            <div class="relative z-10" :style="{ width: `calc(100% - ${overlayWidth})` }" />
        </div>
    </div>
</template>

<style scoped>
.inherit-desc-color :deep(ul),
.inherit-desc-color :deep(li) {
    color: inherit !important;
}
</style>