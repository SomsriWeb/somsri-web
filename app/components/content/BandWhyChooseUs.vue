<script setup lang="ts">
interface Props {
    noticeTitle?: string;
    noticeSubtitle?: string;
    cardTitle?: string;
    cardDescription?: string;
    desktopImage?: string;
    mobileImage?: string;
    buttonText?: string;
    buttonLink?: string;
}

const props = withDefaults(defineProps<Props>(), {
    noticeTitle: undefined,
    noticeSubtitle: undefined,
    cardTitle: undefined,
    cardDescription: undefined,
    desktopImage: '/band-shirt/why-somsri-desktop.png',
    mobileImage: '/band-shirt/why-somsri-mobile.png',
    buttonText: undefined,
    buttonLink: 'https://contact.somsritshirt.com/c4119',
});

const { t } = useI18n({ useScope: 'local' });

const noticeTitle = computed(() => props.noticeTitle ?? t('noticeTitle'));
const noticeSubtitle = computed(() => props.noticeSubtitle ?? t('noticeSubtitle'));
const cardTitle = computed(() => props.cardTitle ?? t('cardTitle'));
const cardDescription = computed(() => props.cardDescription ?? t('cardDescription'));
const buttonText = computed(() => props.buttonText ?? t('buttonText'));
</script>

<i18n lang="json">
{
    "th": {
        "noticeTitle": "งานมัดย้อมจะประเมินราคาตามจำนวน ขนาด และสีที่ใช้สามารถส่งแบบมาให้แอดมินประเมินทางแชทไลน์ได้เลยนะคะ",
        "noticeSubtitle": "* ราคาเสื้อมัดย้อมจะบวกเพิ่ม 60 บาทจากราคาเสื้อยืดธรรมดา *",
        "cardTitle": "เลือกผลิตเสื้อวงดนตรีกับ Somsri แล้วดียังไง?",
        "cardDescription": "ตั้งแต่เลือกผ้า วางแบบ เลือกเทคนิคการพิมพ์ ไปจนถึงการผลิตจริง เราดูแลทุกขั้นตอนเพื่อให้งานเสื้อวงออกมาตรง Concept และพร้อมนำไปขายหรือใช้งานจริง",
        "buttonText": "สอบถามเพิ่มเติม",
        "imageAlt": "เลือกผลิตเสื้อวงดนตรีกับ Somsri",
        "feature1": "คุณภาพสินค้าระดับพรีเมี่ยม",
        "feature2": "การบริการครบวงจรจบในที่เดียว",
        "feature3": "ราคาคุ้มค่า",
        "feature4": "บริการหลังการขายการันตีสินค้า 90 วัน",
        "feature5": "มีผู้เชี่ยวชาญคอยดูแลให้คำปรึกษาตลอดทั้งกระบวนการ"
    },
    "en": {
        "noticeTitle": "Tie-dye orders are quoted based on quantity, size, and colors used. Just send your design to our admin via LINE chat for a quote.",
        "noticeSubtitle": "* Tie-dye shirts cost an extra 60 THB on top of the standard T-shirt price *",
        "cardTitle": "Why Make Your Band Shirts with Somsri?",
        "cardDescription": "From choosing the fabric, laying out the design, and selecting the printing technique to final production, we handle every step so your band shirts match your concept and are ready to sell or wear.",
        "buttonText": "Ask for More Details",
        "imageAlt": "Make your band shirts with Somsri",
        "feature1": "Premium product quality",
        "feature2": "Full-service, one-stop production",
        "feature3": "Great value for money",
        "feature4": "90-day after-sales product guarantee",
        "feature5": "Expert consultation throughout the entire process"
    }
}
</i18n>

<template>
    <section class="w-full py-12 sm:py-16 lg:py-20">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-14">
            <!-- Top Notice -->
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <h3 class="text-2xl sm:text-3xl lg:text-[32px] font-bold text-primary leading-snug tracking-tight">
                    {{ noticeTitle }}
                </h3>
                <p class="text-sm sm:text-base font-medium text-stone-600">
                    {{ noticeSubtitle }}
                </p>
            </div>

            <!-- Main Feature Card -->
            <div
                class="shadow-lg border border-stone-200/80 bg-white grid grid-cols-1 md:grid-cols-2"
                style="border-radius: 1.5rem; overflow: hidden; clip-path: inset(0 round 1.5rem);"
            >
                <!-- Left: Product Image -->
                <div class="relative w-full aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[380px] lg:h-[420px] bg-stone-900 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <!-- Desktop Image -->
                    <NuxtImg
                        :src="desktopImage"
                        :alt="t('imageAlt')"
                        class="hidden md:block w-full h-full object-cover object-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                        loading="lazy"
                    />
                    <!-- Mobile Image -->
                    <NuxtImg
                        :src="mobileImage"
                        :alt="t('imageAlt')"
                        class="block md:hidden w-full h-full object-cover object-center rounded-t-3xl"
                        loading="lazy"
                    />
                </div>

                <!-- Right: Red Content Box -->
                <div class="bg-primary text-white p-6 sm:p-8 lg:p-9 flex flex-col justify-center rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
                    <div>
                        <!-- Title -->
                        <h2 class="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight leading-tight mb-2.5 sm:mb-3">
                            {{ cardTitle }}
                        </h2>
                        <!-- Description -->
                        <p class="text-xs sm:text-sm text-white/90 font-normal leading-relaxed mb-5 sm:mb-6">
                            {{ cardDescription }}
                        </p>

                        <!-- Features Grid (2 Columns) -->
                        <div class="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-5">
                            <!-- Feature 1 -->
                            <div class="flex items-start gap-2.5 sm:gap-3">
                                <div class="shrink-0 mt-0.5">
                                    <UIcon name="i-lucide-shirt" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span class="text-xs sm:text-sm font-medium text-white leading-snug">
                                    {{ t('feature1') }}
                                </span>
                            </div>

                            <!-- Feature 2 -->
                            <div class="flex items-start gap-2.5 sm:gap-3">
                                <div class="shrink-0 mt-0.5">
                                    <UIcon name="i-lucide-package-check" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span class="text-xs sm:text-sm font-medium text-white leading-snug">
                                    {{ t('feature2') }}
                                </span>
                            </div>

                            <!-- Feature 3 -->
                            <div class="flex items-start gap-2.5 sm:gap-3">
                                <div class="shrink-0 mt-0.5">
                                    <UIcon name="i-lucide-badge-percent" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span class="text-xs sm:text-sm font-medium text-white leading-snug">
                                    {{ t('feature3') }}
                                </span>
                            </div>

                            <!-- Feature 4 -->
                            <div class="flex items-start gap-2.5 sm:gap-3">
                                <div class="shrink-0 mt-0.5">
                                    <UIcon name="i-lucide-shield-check" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span class="text-xs sm:text-sm font-medium text-white leading-snug">
                                    {{ t('feature4') }}
                                </span>
                            </div>

                            <!-- Feature 5 -->
                            <div class="flex items-start gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
                                <div class="shrink-0 mt-0.5">
                                    <UIcon name="i-lucide-users" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span class="text-xs sm:text-sm font-medium text-white leading-snug">
                                    {{ t('feature5') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA Button -->
            <div class="flex justify-center pt-2">
                <NuxtLink
                    :to="buttonLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-[#8f192f] text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                    <span>{{ buttonText }}</span>
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>