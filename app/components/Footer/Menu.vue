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

const menuItems = computed(() => menus.value?.[0]?.data || []);
const firstColumnMenus = computed(() => menuItems.value.slice(0, 5));
const secondColumnMenus = computed(() => menuItems.value.slice(5));
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ data[LANG].menu }}</FooterTitle>
        <nav class="grid grid-cols-2 gap-3">
            <ul class="font-light">
                <li v-for="menu in firstColumnMenus" :key="menu.label">
                    <NuxtLink :to="LANG === 'th' ? menu.url : menu['url-en']" class="underline">{{ LANG === 'th' ? menu.label : menu['label-en'] }}</NuxtLink>
                </li>
            </ul>
            <ul class="font-light lg:relative">
                <li v-for="menu in secondColumnMenus" :key="menu.label">
                    <NuxtLink :to="LANG === 'th' ? menu.url : menu['url-en']" class="underline">{{ LANG === 'th' ? menu.label : menu['label-en'] }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
