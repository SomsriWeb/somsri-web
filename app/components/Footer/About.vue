<script setup lang="ts">
const { locale, t } = useI18n();
const lang = computed<'th' | 'en'>(() => (locale.value === 'en' ? 'en' : 'th'));
const data = {
    th: {
        title: 'เกี่ยวกับเรา',
        description:
            'โรงงานผลิตเสื้อ สมศรีมีเสื้อ รับผลิตเสื้อ รับสกรีนเสื้อ และปักเสื้อ ครบวงจรในที่เดียว บริการออกแบบลายเสื้อฟรี รูปแบบไม่ซ้ำใคร พร้อมให้คำปรึกษาแนะนำเรื่องการออกแบบให้ตรงความต้องการของลูกค้ามากที่สุด',
    },
    en: {
        title: 'About Us',
        description:
            'SomsriTshirt Factory offers comprehensive services including shirt production, screen printing, and embroidery. We provide free design services with unique styles and expert consultation to meet your design needs.',
    },
};
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ t('footer.aboutTitle') }}</FooterTitle>
        <p class="font-light">
            {{ data[lang].description }}
        </p>
    </div>
</template>
