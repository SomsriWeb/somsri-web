<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });

const imgs = computed(() => [
    {
        src: '/pants/cut2.jpg',
        alt: t('brandAlt'),
    },
    {
        src: '/pants/screen3.jpg',
        alt: t('costAlt'),
    },
    {
        src: '/pants/screen4.jpg',
        alt: t('brandAlt'),
    },
    {
        src: '/pants/screen5.jpg',
        alt: t('brandAlt'),
    },
]);
</script>

<i18n lang="json">
{
    "th": {
        "brandAlt": "สมศรีมีเสื้อ",
        "costAlt": "งบประมาณจากรูปแบบการตัดเย็บ ต้องคิดต้นทุนเมื่อทำเสื้อแบรนด์ตัวเอง",
        "companyName": "บริษัท สมศรี การ์เมนท์ จำกัด"
    },
    "en": {
        "brandAlt": "SomsriTshirt",
        "costAlt": "Budgeting by sewing style — production costs to plan for when launching your own clothing brand",
        "companyName": "Somsri Garment Co., Ltd."
    }
}
</i18n>
<template>
    <div>
        <!-- Section ข้อความ -->
        <section class="flex flex-col items-center text-center px-4 py-10">
            <ProseH2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"> COMPANY INTRODUCTION </ProseH2>
            <ProseH2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 inline-flex items-center gap-2 flex-wrap justify-center">
                <Icon name="lucide:shirt" class="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                {{ t('companyName') }}
            </ProseH2>
            <p class="text-sm sm:text-base max-w-3xl">
                <slot name="CompanyDescription" mdc-unwrap="p" />
            </p>
        </section>

        <!--รูป-->
        <ClientOnly>
            <Vue3Marquee class="rounded-xl" :duration="80">
                <ProseImg v-for="img in imgs" :key="img.src" :src="img.src" :alt="img.alt" class="max-h-68 object-cover" />
            </Vue3Marquee>
        </ClientOnly>
    </div>
</template>
