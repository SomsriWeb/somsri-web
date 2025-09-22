<script lang="ts" setup>
import { LANGUAGE } from '~/lib/language';

const { data: menus } = await useAsyncData('menu', () => queryCollection('navbar').all());
const LANG = inject<'th' | 'en'>(LANGUAGE, 'th');
const data = {
    th: {
        menu: 'เมนู',
    },
    en: {
        menu: 'Menu',
    },
};
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ data[LANG].menu }}</FooterTitle>
        <nav>
            <ul class="font-light">
                <li v-for="menu in menus?.[0]?.data || []" :key="menu.label">
                    <NuxtLink :to="LANG === 'th' ? menu.url : menu['url-en']" class="underline">{{ LANG === 'th' ? menu.label : menu['label-en'] }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
