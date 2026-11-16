<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';

/**
 * การ์ดโปรโมทจุดเด่นของการผลิตกับ Somsri
 * ซ้าย = รูปภาพเต็มความสูง, ขวา = พื้นหลัง primary + หัวข้อ/คำอธิบาย/รายการจุดเด่น (ไอคอน)
 * ด้านล่างการ์ด = ปุ่ม CTA อยู่กึ่งกลาง
 */
interface FeatureItem {
    /** ชื่อไอคอนแบบ Nuxt Icon เช่น "i-lucide-shirt" */
    icon: string;
    /** ข้อความอธิบายจุดเด่น รองรับหลายบรรทัดด้วย \n */
    label: string;
}

interface Props {
    image: string;
    alt?: string;
    /** ด้านที่วางรูป, default = left ตาม design */
    imagePosition?: 'left' | 'right';
    features?: FeatureItem[];
    buttonLabel?: string;
    /** ไม่ระบุ = ใช้ลิงก์ LINE ของหน้า (frontmatter lineLink) */
    buttonLink?: string;
}

const {
    image,
    alt = '',
    imagePosition = 'left',
    features,
    buttonLabel,
    buttonLink,
} = defineProps<Props>();

const { t } = useI18n({ useScope: 'local' });
const localizePath = await useLocalizedPath();

const resolvedFeatures = computed<FeatureItem[]>(
    () =>
        features ?? [
            { icon: 'i-lucide-shirt', label: t('features.quality') },
            { icon: 'i-lucide-package-check', label: t('features.oneStop') },
            { icon: 'i-lucide-hand-coins', label: t('features.value') },
            { icon: 'i-lucide-badge-check', label: t('features.guarantee') },
            { icon: 'i-lucide-users', label: t('features.experts') },
        ],
);
const resolvedButtonLabel = computed(() => buttonLabel ?? t('buttonLabel'));

interface Slots {
    title(): unknown;
    description(): unknown;
}
defineSlots<Slots>();

const lineLink = inject<string>(LINE_LINK);
const resolvedButtonLink = computed(() => {
    const link = buttonLink ?? lineLink;
    return link ? localizePath(link) : link;
});
</script>

<i18n lang="json">
{
    "th": {
        "features": {
            "quality": "คุณภาพสินค้าระดับพรีเมี่ยม",
            "oneStop": "การบริการครบวงจรจบในที่เดียว",
            "value": "ราคาคุ้มค่า",
            "guarantee": "บริการหลังการขายการันตีสินค้า 90 วัน",
            "experts": "มีผู้เชี่ยวชาญคอยดูแลให้คำปรึกษาตลอดทั้งกระบวนการ"
        },
        "buttonLabel": "สอบถามเพิ่มเติม"
    },
    "en": {
        "features": {
            "quality": "Premium product quality",
            "oneStop": "Full-service production, all in one place",
            "value": "Great value for money",
            "guarantee": "After-sales service with a 90-day product guarantee",
            "experts": "Dedicated experts to advise you throughout the process"
        },
        "buttonLabel": "Contact us"
    }
}
</i18n>

<template>
    <section class="jersey-why-card my-6">
        <div
            class="grid overflow-hidden rounded-2xl shadow-md md:grid-cols-2"
            :class="imagePosition === 'right' ? 'md:[&>*:first-child]:order-2' : ''"
        >
            <!-- รูปภาพ -->
            <div class="min-h-[16rem] md:min-h-[26rem]">
                <img :src="image" :alt="alt" loading="lazy" class="h-full w-full object-cover" />
            </div>

            <!-- เนื้อหา -->
            <div class="bg-primary px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 class="!m-0 text-2xl leading-snug font-bold text-white md:text-3xl">
                    <slot name="title" mdc-unwrap="p" />
                </h2>

                <div class="mt-3 text-sm leading-relaxed text-white/90 md:text-base">
                    <slot name="description" mdc-unwrap="p" />
                </div>

                <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
                    <div v-for="(feat, i) in resolvedFeatures" :key="i" class="flex items-start gap-2.5">
                        <Icon :name="feat.icon" class="mt-0.5 size-6 shrink-0" />
                        <p class="text-sm leading-snug text-white">{{ feat.label }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex justify-center">
            <UButton
                :to="resolvedButtonLink"
                :locale="false"
                size="xl"
                color="primary"
                variant="solid"
                icon="i-lucide-send"
                class="rounded-none"
            >
                {{ resolvedButtonLabel }}
            </UButton>
        </div>
    </section>
</template>