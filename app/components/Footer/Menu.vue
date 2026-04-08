<script lang="ts" setup>
import type { NavbarCollectionItem } from '@nuxt/content';

const { data: menus } = await useAsyncData('menu', () => queryCollection('navbar').all());
const { locale, t } = useI18n();
const lang = computed<'th' | 'en'>(() => (locale.value === 'en' ? 'en' : 'th'));

const navbarData = computed(() => (menus.value?.[0] as NavbarCollectionItem) || {});
const menuItems = computed(() => navbarData.value.main || []);
const firstColumnMenus = computed(() => menuItems.value.slice(0, 5));
const secondColumnMenus = computed(() => menuItems.value.slice(5));
</script>
<template>
    <div class="text-white">
        <FooterTitle>{{ t('footer.menu') }}</FooterTitle>
        <nav class="grid grid-cols-2 gap-3">
            <ul class="font-light">
                <li v-for="menu in firstColumnMenus" :key="menu.label">
                    <NuxtLink :to="lang === 'th' ? menu.url : menu['url-en']" class="underline">{{ lang === 'th' ? menu.label : menu['label-en'] }}</NuxtLink>
                </li>
            </ul>
            <ul class="font-light lg:relative">
                <li v-for="menu in secondColumnMenus" :key="menu.label">
                    <NuxtLink :to="lang === 'th' ? menu.url : menu['url-en']" class="underline">{{ lang === 'th' ? menu.label : menu['label-en'] }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
