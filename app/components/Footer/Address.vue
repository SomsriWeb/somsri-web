<script setup lang="ts">
// VARIABLE
const { locale, t } = useI18n();
const lang = computed<'th' | 'en'>(() => (locale.value === 'en' ? 'en' : 'th'));
const data = {
    th: {
        title: 'ติดต่อเรา',
        address: 'บริษัท สมศรีการ์เมนท์ จำกัด 1033/6 ถนนเพชรเกษม 106 หนองค้างพลู หนองแขม กทม. 10160',
    },
    en: {
        title: 'Contact Us',
        address: 'Somsri Garment Co., Ltd. 1033/6 Phetkasem 106 Road, Nongkhangplu, Nongkhaem, Bangkok 10160',
    },
};
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ t('footer.contactTitle') }}</FooterTitle>
        <p class="font-light">{{ data[lang].address }}</p>
    </div>
</template>
