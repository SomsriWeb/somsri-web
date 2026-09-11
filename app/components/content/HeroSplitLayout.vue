<script setup lang="ts">
// PROPS
interface Props {
    image: string;
    titleAsTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    alt?: string;
    screenHeight?: boolean;
    imageAnchor?: 'left' | 'right' | 'center' | string;
    /** รูปแบบการแสดงภาพ โดยค่าเริ่มต้นยังครอบเต็มพื้นที่เหมือนเดิม */
    imageFit?: 'cover' | 'contain';
    /** ลดขนาดและความสูงสำหรับ section ภายในหน้า */
    compact?: boolean;
    /** แสดงปุ่ม CTA โดยค่าเริ่มต้นยังแสดงเหมือนเดิม */
    showCta?: boolean;
}
const { image, titleAsTag = 'h1', alt = '', screenHeight = true, imageAnchor = 'center', imageFit = 'cover', compact = false, showCta = true } = defineProps<Props>();
</script>

<template>
    <div class="w-full overflow-hidden bg-white" :class="{ 'lg:py-10': compact }">
        <div class="flex flex-col lg:flex-row" :class="[{ 'lg:min-h-screen': screenHeight }, compact ? 'mx-auto max-w-7xl lg:items-center' : 'lg:items-stretch']">
            <div class="flex flex-col items-center justify-center px-6 lg:w-1/2 lg:items-start" :class="compact ? 'py-10 lg:px-12 lg:py-10 xl:px-16' : 'py-12 lg:px-16 lg:py-16 xl:px-24'">
                <p v-if="$slots['secondary-title']" class="mb-2 text-center font-bold text-primary lg:text-left" :class="compact ? 'text-sm lg:text-base' : 'text-lg lg:text-2xl'">
                    <slot name="secondary-title" mdc-unwrap="p" />
                </p>

                <component
                    :is="titleAsTag"
                    class="mb-4 text-center leading-tight font-bold lg:text-left"
                    :class="compact ? 'text-2xl md:text-3xl lg:text-3xl xl:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl'"
                >
                    <span :class="compact ? 'text-stone-700' : 'text-primary'">
                        <slot name="title" mdc-unwrap="p" />
                    </span>
                    <template v-if="$slots['title-secondary']">
                        <br />
                        <span class="text-stone-700">
                            <slot name="title-secondary" mdc-unwrap="p" />
                        </span>
                    </template>
                </component>

                <p v-if="$slots.description" class="text-center leading-relaxed font-light text-stone-600 lg:text-left" :class="compact ? 'mb-0 text-base' : 'mb-8'">
                    <slot name="description" mdc-unwrap="p" />
                </p>

                <p v-if="$slots['secondary-description']" class="text-center font-light text-stone-500 lg:text-left" :class="compact ? 'mt-8 text-sm leading-relaxed' : 'mt-4 mb-8 leading-relaxed'">
                    <slot name="secondary-description" mdc-unwrap="p" />
                </p>

                <div v-if="$slots.default" class="mb-6 w-full flex flex-col items-center lg:items-start">
                    <slot />
                </div>

                <div v-if="showCta">
                    <slot name="cta">
                        <LineLink>
                            <UButton>ปรึกษาฟรี</UButton>
                        </LineLink>
                    </slot>
                </div>
            </div>

            <div :class="compact ? 'aspect-video w-full lg:w-1/2' : 'aspect-[4/3] lg:w-1/2 lg:aspect-auto'">
                <img
                    :src="image"
                    :alt="alt"
                    class="w-full h-full"
                    :class="imageFit === 'contain' ? 'object-contain' : 'object-cover'"
                    :style="{ objectPosition: imageAnchor === 'left' ? 'left center' : imageAnchor === 'right' ? 'right center' : 'center center' }"
                />
            </div>
        </div>
    </div>
</template>
