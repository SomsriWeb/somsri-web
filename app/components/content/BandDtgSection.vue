<script setup lang="ts">
interface Props {
    mainShirtImage?: string;
    sampleImage1?: string; // Cheunjai (Vertical)
    sampleImage2?: string; // Maleehuana (Horizontal)
}

withDefaults(defineProps<Props>(), {
    mainShirtImage: '/band-shirt/dtg-bigass.png',
    sampleImage1: '/band-shirt/dtg-cheunjai.png',
    sampleImage2: '/band-shirt/dtg-maleehuana.png',
});

interface Slots {
    title?(): unknown;
    subtitle?(): unknown;
    headerDescription?(): unknown;
    sampleTitle?(): unknown;
    sampleDescription?(): unknown;
}
defineSlots<Slots>();

const { t } = useI18n({ useScope: 'local' });
const localizePath = await useLocalizedPath();
</script>

<i18n lang="json">
{
    "th": {
        "title": "เสื้อวง เสื้อวงวินเทจ",
        "subtitle1": "เหมาะกับระบบการสกรีน",
        "subtitle2": "ประเภทใด?",
        "headerDesc1": "การสกรีนเสื้อวงวินเทจ เหมาะกับการ",
        "headerDescLink": "สกรีนแบบ DTG (Direct to garment)",
        "headerDesc2": "ที่เป็นเทคนิคสุดล้ำที่เป็นที่นิยมมากในปัจจุบันกับวงการพิมพ์ผลิตผ้า เหมาะกับการสร้างเอกลักษณ์ให้เสื้อผ้า เป็นการพิมพ์พ่นเสื้อผ้าโดยตรง ด้วยเครื่องสกรีน Brother GTX Pro Bulk",
        "sampleTitle": "ตัวอย่างการสกรีนแบบ DTG",
        "sampleDescription": "ใช้หมึกพิเศษที่สามารถซึมซับลงบนเส้นใยผ้าได้ผ่านการสั่งงานผ่านคอมพิวเตอร์เครื่องเดียว เพื่อให้ลวดลายบนผ้ามีความละเอียดสูง สีสันสดใส ดูเป็นธรรมชาติไม่แข็งทื่อและยังไม่ต้องเสียเวลาในขั้นตอนการทำแผ่นเฟรมไม่ต้องเปลืองสีสามารถพิมพ์ได้ตัวต่อตัว เป็นมิตรกับสิ่งแวดล้อมและที่สำคัญยังช่วยลดต้นทุนการผลิตลงได้อีกขั้นนึง แต่ได้ลายผ้าที่มีคุณภาพสูง",
        "sampleDescriptionMobile": "ใช้หมึกพิเศษที่สามารถซึมซับลงบนเส้นใยผ้าได้ผ่านการสั่งงานผ่านคอมพิวเตอร์เครื่องเดียว เพื่อให้ลวดลายบนผ้ามีความละเอียดสูง สีสันสดใสดูเป็นธรรมชาติไม่แข็งทื่อและยังไม่ต้องเสียเวลาในขั้นตอนการทำแผ่นเฟรมไม่ต้องเปลืองสีสามารถพิมพ์ได้ตัวต่อตัว เป็นมิตรกับสิ่งแวดล้อมและที่สำคัญยังช่วยลดต้นทุนการผลิตลงได้อีกขั้นนึง แต่ได้ลายผ้าที่มีคุณภาพสูง",
        "mainAlt": "เสื้อวงวินเทจ สกรีนแบบ DTG",
        "sample1Alt": "ตัวอย่างงานสกรีน DTG บนเสื้อวง",
        "sample2Alt": "ตัวอย่างงานสกรีน DTG ศิลปิน"
    },
    "en": {
        "title": "Band Shirts & Vintage Band Tees",
        "subtitle1": "Which printing method ",
        "subtitle2": "works best?",
        "headerDesc1": "Vintage band tees are best printed with",
        "headerDescLink": "DTG (Direct to Garment) printing",
        "headerDesc2": "— a cutting-edge technique that is hugely popular in garment printing today. Ideal for giving every shirt a distinctive identity, it prints directly onto the garment using a Brother GTX Pro Bulk printer.",
        "sampleTitle": "DTG Printing Samples",
        "sampleDescription": "Special inks soak directly into the fabric fibers, all controlled from a single computer, for high-resolution designs with vivid, natural-looking colors that never feel stiff. There is no screen-making step and no wasted ink, so you can print one piece at a time. It's eco-friendly and, most importantly, lowers production costs while still delivering high-quality prints.",
        "sampleDescriptionMobile": "Special inks soak directly into the fabric fibers, all controlled from a single computer, for high-resolution designs with vivid, natural-looking colors that never feel stiff. There is no screen-making step and no wasted ink, so you can print one piece at a time. It's eco-friendly and, most importantly, lowers production costs while still delivering high-quality prints.",
        "mainAlt": "Vintage band tee printed with DTG",
        "sample1Alt": "DTG printing sample on a band shirt",
        "sample2Alt": "DTG printing sample for an artist"
    }
}
</i18n>

<template>
    <section class="w-full py-8 lg:py-14">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- ================= Desktop Layout (md:block) ================= -->
            <div class="hidden md:block">
                <!-- Header: Left Title / Right Description -->
                <div class="flex justify-between items-start gap-8 lg:gap-12 mb-6 lg:mb-8">
                    <div class="flex-1">
                        <h2 class="text-3xl lg:text-4xl font-bold text-primary tracking-tight leading-none mb-2">
                            <slot name="title">{{ t('title') }}</slot>
                        </h2>
                        <p class="text-xl lg:text-2xl font-bold text-stone-900 leading-snug">
                            <slot name="subtitle">
                                {{ t('subtitle1') }}<br />{{ t('subtitle2') }}
                            </slot>
                        </p>
                    </div>
                    <div class="flex-1 text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal text-left pt-1">
                        <slot name="headerDescription">
                            {{ t('headerDesc1') }} <NuxtLink :to="localizePath('/screen')" class="text-primary font-medium underline">{{ t('headerDescLink') }}</NuxtLink> {{ t('headerDesc2') }}
                        </slot>
                    </div>
                </div>

                <!-- Big Shirt Mockup -->
                <div class="w-full flex justify-center my-6 lg:my-8">
                    <NuxtImg
                        :src="mainShirtImage"
                        :alt="t('mainAlt')"
                        class="w-full max-w-2xl lg:max-w-3xl object-contain drop-shadow-sm hover:scale-[1.01] transition duration-300"
                        loading="lazy"
                    />
                </div>

                <!-- Bottom Showcase Grid: Left Cheunjai / Right Maleehuana + Centered Text -->
                <div class="grid grid-cols-2 gap-6 lg:gap-8 items-stretch mt-6">
                    <!-- Left: Cheunjai Vertical Image (height matches Right Column automatically) -->
                    <div class="relative w-full h-full min-h-0 rounded-2xl overflow-hidden shadow-sm">
                        <NuxtImg
                            :src="sampleImage1"
                            :alt="t('sample1Alt')"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <!-- Right: Maleehuana (Top) + DTG Text (Bottom, Centered) -->
                    <div class="w-full flex flex-col items-center">
                        <NuxtImg
                            :src="sampleImage2"
                            :alt="t('sample2Alt')"
                            class="w-full aspect-[16/10] object-cover rounded-2xl shadow-sm"
                            loading="lazy"
                        />
                        <div class="mt-5 lg:mt-6 text-center flex flex-col items-center px-2">
                            <h3 class="text-3xl lg:text-4xl font-bold text-primary mb-3">
                                <slot name="sampleTitle">{{ t('sampleTitle') }}</slot>
                            </h3>
                            <p class="text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal">
                                <slot name="sampleDescription">
                                    {{ t('sampleDescription') }}
                                </slot>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= Mobile Layout (md:hidden) ================= -->
            <div class="block md:hidden text-center space-y-6">
                <!-- Mobile Header: Centered -->
                <div class="space-y-3">
                    <h2 class="text-3xl font-bold text-primary">
                        <slot name="title">{{ t('title') }}</slot>
                    </h2>
                    <p class="text-xl sm:text-2xl font-bold text-stone-900">
                        <slot name="subtitle">{{ t('subtitle1') }}{{ t('subtitle2') }}</slot>
                    </p>
                    <p class="text-base text-stone-800 leading-relaxed font-normal px-2 pt-1 text-center">
                        <slot name="headerDescription">
                            {{ t('headerDesc1') }} <NuxtLink :to="localizePath('/screen')" class="text-primary font-medium underline">{{ t('headerDescLink') }}</NuxtLink> {{ t('headerDesc2') }}
                        </slot>
                    </p>
                </div>

                <!-- Big Shirt Mockup -->
                <div class="w-full flex justify-center py-2">
                    <NuxtImg
                        :src="mainShirtImage"
                        :alt="t('mainAlt')"
                        class="w-full max-w-[300px] object-contain"
                        loading="lazy"
                    />
                </div>

                <!-- Sample Image 2 (Maleehuana) -->
                <div class="w-full">
                    <NuxtImg
                        :src="sampleImage2"
                        :alt="t('sample2Alt')"
                        class="w-full aspect-[16/10] object-cover rounded-xl shadow-sm"
                        loading="lazy"
                    />
                </div>

                <!-- DTG Explanation (Mobile) -->
                <div class="space-y-3 px-2 text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold text-primary">
                        <slot name="sampleTitle">{{ t('sampleTitle') }}</slot>
                    </h3>
                    <p class="text-base text-stone-800 leading-relaxed font-normal">
                        <slot name="sampleDescription">
                            {{ t('sampleDescriptionMobile') }}
                        </slot>
                    </p>
                </div>

                <!-- Sample Image 1 (Cheunjai) -->
                <div class="w-full pt-2 flex justify-center">
                    <NuxtImg
                        :src="sampleImage1"
                        :alt="t('sample1Alt')"
                        class="w-full max-w-[340px] aspect-[3/4] object-cover rounded-xl shadow-sm"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
