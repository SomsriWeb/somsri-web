<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

const lineLink = inject<string>(LINE_LINK, 'https://contact.somsritshirt.com/c4119');

const props = withDefaults(defineProps<Props>(), {
    title: 'ราคาสั่งผลิตเสื้อวง',
    description: 'หากลูกค้าสั่งในจำนวนมากยิ่งจะทำให้ราคาถูกลงอย่างชัดเจนนอกจากนี้เรายังมีบริการคอยให้คำแนะนำตั้งแต่ขั้นตอนเริ่มต้นอย่างการออกแบบไปจนถึงการเลือกเนื้อผ้าที่เหมาะสมกับงบประมาณและประเภทเสื้อที่ลูกค้าต้องการ',
    buttonText: 'สอบถามราคา',
    buttonLink: '',
});

const resolvedButtonLink = computed(() => props.buttonLink || lineLink);

interface Slots {
    title?(): unknown;
    description?(): unknown;
    button?(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <div class="w-full py-6 sm:py-8 lg:py-10">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 text-center md:text-left">
                <!-- Title & Description -->
                <div class="flex-1 max-w-2xl">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-2 md:mb-3">
                        <slot name="title" mdc-unwrap="p">{{ title }}</slot>
                    </h2>
                    <p class="text-xs sm:text-sm lg:text-base text-stone-600 font-normal leading-relaxed">
                        <slot name="description" mdc-unwrap="p">{{ description }}</slot>
                    </p>
                </div>

                <!-- Action Button -->
                <div class="flex items-center justify-center md:justify-end flex-shrink-0 pt-2 md:pt-0">
                    <NuxtLink
                        :to="resolvedButtonLink"
                        target="_blank"
                        class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 rounded-lg bg-primary hover:bg-primary-600 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer h-fit"
                    >
                        <span><slot name="button" mdc-unwrap="p">{{ buttonText }}</slot></span>
                        <Icon name="lucide:arrow-right" class="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
