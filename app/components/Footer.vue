<script lang="ts" setup>
import { LINE_LINK } from '~/lib/lineLink';

const lineLink = inject<string>(LINE_LINK, 'https://line.me/R/ti/p/%40diz8986o');
const socialMedias = [
    {
        icon: 'ic:baseline-facebook',
        url: 'https://www.facebook.com/somsritshirt/',
    },
    {
        icon: 'fa6-brands:line',
        url: lineLink,
    },
    {
        icon: 'mdi:instagram',
        url: 'https://www.instagram.com/somsritshirt/',
    },
    {
        icon: 'ic:baseline-tiktok',
        url: 'https://www.tiktok.com/@somsritshirt_brand',
    },
];
</script>
<template>
    <footer>
        <div class="bg-primary grid grid-cols-1 sm:grid-cols-3 gap-10 px-5 md:px-[4.6rem] py-5">
            <FooterAbout />
            <FooterMenu />
            <div>
                <FooterAddress class="mb-5" />
                <FooterContact />
            </div>
        </div>
        <div class="bg-primary-600 flex justify-between items-center px-5 md:px-[4.6rem] py-2">
            <ProseImg src="/footer/footer-logo.png" alt="สมศรีมีเสื้อ" class="max-w-[3.5rem] sm:max-w-[5rem]" />
            <div class="flex items-center gap-2 sm:gap-5">
                <NuxtLink v-for="socialMedia in socialMedias" :key="socialMedia.url" :to="socialMedia.url" class="flex" external>
                    <UButton :icon="socialMedia.icon" variant="ghost" class="text-white p-0 !min-w-fit" size="lg" />
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>
