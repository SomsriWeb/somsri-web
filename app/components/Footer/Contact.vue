<script setup lang="ts">
import { SALES_PEOPLE } from '~/lib/salesPeople';

// VARIABLE
const { t, locale } = useI18n();
const phoneNumbers = computed(() =>
    SALES_PEOPLE.map((person) => ({
        phoneNumber: person.phoneNumber,
        owner: t('footer.contact.sales', { name: person.name[locale.value as 'th' | 'en'] }),
    })),
);

const leftColumnPhoneNumbers = computed(() => phoneNumbers.value.filter((_, index) => index % 2 === 0));
const rightColumnPhoneNumbers = computed(() => phoneNumbers.value.filter((_, index) => index % 2 !== 0));

// FUNCTION
function getCallLink(phoneNumber: string) {
    return `tel:${phoneNumber}`;
}
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ $t('footer.contact.title') }}</FooterTitle>
        <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-3">
            <div>
                <NuxtLink v-for="phoneNumber in leftColumnPhoneNumbers" :key="phoneNumber.phoneNumber" :href="getCallLink(phoneNumber.phoneNumber)" external class="font-light block">{{
                    phoneNumber.phoneNumber + ' ' + phoneNumber.owner
                }}</NuxtLink>
            </div>
            <div>
                <NuxtLink v-for="phoneNumber in rightColumnPhoneNumbers" :key="phoneNumber.phoneNumber" :href="getCallLink(phoneNumber.phoneNumber)" external class="font-light block">{{
                    phoneNumber.phoneNumber + ' ' + phoneNumber.owner
                }}</NuxtLink>
            </div>
        </div>
    </div>
</template>
