<script setup lang="ts">
import parsePhoneNumber from 'libphonenumber-js';
import { LANGUAGE } from '~/lib/language';

// VARIABLE
const phoneNumbers = ['024300678', '0661126521', '0661141399', '0634216521'];
const LANG = inject<'th' | 'en'>(LANGUAGE, 'th');
const data = {
    th: {
        title: 'เบอร์โทรศัพท์',
    },
    en: {
        title: 'Phone Numbers',
    },
};

// FUNCTION
function getCallLink(phoneNumber: string) {
    return `tel:${phoneNumber}`;
}

function formatPhoneNumber(phoneNumber: string) {
    const parsed = parsePhoneNumber(phoneNumber, 'TH');
    return parsed?.formatNational().replaceAll(' ', '-') || phoneNumber;
}
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ data[LANG].title }}</FooterTitle>
        <NuxtLink v-for="phoneNumber in phoneNumbers" :key="phoneNumber" :href="getCallLink(phoneNumber)" external class="font-light block underline">{{ formatPhoneNumber(phoneNumber) }}</NuxtLink>
    </div>
</template>
