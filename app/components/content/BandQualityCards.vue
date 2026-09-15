<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

interface Props {
    title?: string;
    buttonText?: string;
    buttonLink?: string;
    image1?: string;
    alt1?: string;
    image2?: string;
    alt2?: string;
    description?: string;
}

const lineLink = inject<string>(LINE_LINK, 'https://contact.somsritshirt.com/c4119');

const props = withDefaults(defineProps<Props>(), {
    title: 'ผลงานที่พูดแทน :br คุณภาพการผลิต',
    buttonText: 'ปรึกษาฟรี',
    buttonLink: '',
    image1: '/band-shirt/feature-shetoldme.png',
    alt1: 'ผลงานผลิตเสื้อวง',
    image2: '/band-shirt/feature-band-members.png',
    alt2: 'ศิลปินกับเสื้อวง',
    description: 'ทุกโปรเจกต์ถูกดูแลตั้งแต่ผ้า ทรง สี เทคนิคพิมพ์ จนถึง QC :br เพื่อให้งานสุดท้ายตรงกับตัวตนของศิลปิน :br และพร้อมออกไปเจอกับแฟนคลับ',
});

const resolvedButtonLink = computed(() => props.buttonLink || lineLink);

interface Slots {
    title?(): unknown;
    button?(): unknown;
    description?(): unknown;
}
defineSlots<Slots>();
</script>

<template>
    <section class="w-full py-6 sm:py-8 lg:py-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                <!-- Card 1: Top Red Block (Title + Button) / Bottom Photo -->
                <div class="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-primary">
                    <!-- Top Half: Red Content -->
                    <div class="bg-primary text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center h-[180px] sm:h-[210px] lg:h-[230px] flex-shrink-0">
                        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                            <slot name="title" mdc-unwrap="p">{{ title }}</slot>
                        </h2>
                        <slot name="button">
                            <NuxtLink
                                :to="resolvedButtonLink"
                                target="_blank"
                                class="consult-btn inline-flex items-center justify-center px-8 py-2 rounded-lg font-semibold text-base cursor-pointer"
                            >
                                {{ buttonText }}
                            </NuxtLink>
                        </slot>
                    </div>

                    <!-- Bottom Half: Photo -->
                    <div class="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden bg-stone-900">
                        <NuxtImg
                            :src="image1"
                            :alt="alt1"
                            class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                            loading="lazy"
                        />
                    </div>
                </div>

                <!-- Card 2: Top Photo / Bottom Red Block (Description) -->
                <div class="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-primary">
                    <!-- Top Half: Photo -->
                    <div class="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden bg-stone-900">
                        <NuxtImg
                            :src="image2"
                            :alt="alt2"
                            class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                            loading="lazy"
                        />
                    </div>

                    <!-- Bottom Half: Red Content -->
                    <div class="bg-primary text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center h-[180px] sm:h-[210px] lg:h-[230px] flex-shrink-0">
                        <p class="text-xs sm:text-sm lg:text-base font-normal leading-relaxed text-white text-center max-w-xs sm:max-w-sm">
                            <slot name="description" mdc-unwrap="p">{{ description }}</slot>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.consult-btn {
    color: #ffffff !important;
    border: 1.5px solid rgba(255, 255, 255, 0.95);
    background-color: transparent;
    transition: all 0.25s ease;
    text-decoration: none;
}

.consult-btn:hover {
    background-color: #ffffff !important;
    color: var(--color-primary, #9e1c37) !important;
    transform: translateY(-1px) scale(1.03);
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.2);
}

.consult-btn:active {
    transform: translateY(0) scale(0.98);
}
</style>


