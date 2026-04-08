<script setup lang="ts">
// VARIABLE
const phoneNumbers = [
    { phoneNumber: '083-908-8853', owner: '( เซลล์ คุณเม )' },
    { phoneNumber: '083-908-8854', owner: '( เซลล์ คุณเบล )' },
    { phoneNumber: '063-421-6521', owner: '( เซลล์ คุณการีม )' },
    { phoneNumber: '095-454-6693', owner: '( เซลล์ คุณแนน )' },
];
const { t } = useI18n();

const leftColumnPhoneNumbers = computed(() => phoneNumbers.filter((_, index) => index % 2 === 0));
const rightColumnPhoneNumbers = computed(() => phoneNumbers.filter((_, index) => index % 2 !== 0));

// FUNCTION
function getCallLink(phoneNumber: string) {
    return `tel:${phoneNumber}`;
}
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ t('footer.phoneNumbersTitle') }}</FooterTitle>
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
