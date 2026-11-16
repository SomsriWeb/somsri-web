<script lang="ts" setup>
import type { NavbarCollectionItem } from '@nuxt/content';

const { data: menus } = await useAsyncData('menu', () => queryCollection('navbar').all());
const { t, locale } = useI18n();
const localizePath = await useLocalizedPath();

const navbarData = computed(() => (menus.value?.[0] as NavbarCollectionItem) || {});
const menuItems = computed(() => navbarData.value.main || []);


const accordionItems = computed(() => [{
    label: t('footer.menu'),
    slot: 'menu-content'
}]);

const firstColumnMenus = computed(() => menuItems.value.slice(0, 5));
const secondColumnMenus = computed(() => menuItems.value.slice(5));
</script>

<template>
    <div class="text-white">
        <!-- แสดง Accordion บนหน้าจอเล็ก (ต่ำกว่า md) -->
        <div class="md:hidden">
            <UAccordion :items="accordionItems" :ui="{ trigger :'text-2xl font-bold'}">
                <template #menu-content>
                    <nav class="grid grid-cols-2 gap-3 pb-4">
                        <ul class="font-light">
                            <li v-for="menu in firstColumnMenus" :key="menu.label">
                                <NuxtLink :to="localizePath(menu.url)" class="underline">
                                    {{ locale === 'th' ? menu.label : menu['label-en'] }}
                                </NuxtLink>
                            </li>
                        </ul>
                        <ul class="font-light">
                            <li v-for="menu in secondColumnMenus" :key="menu.label">
                                <NuxtLink :to="localizePath(menu.url)" class="underline">
                                    {{ locale === 'th' ? menu.label : menu['label-en'] }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                    </template>
            </UAccordion>
        </div>

        <!-- แสดงแบบปกติบนหน้าจอใหญ่ (md ขึ้นไป) -->
        <div class="hidden md:block">
            <FooterTitle >{{ $t('footer.menu') }}</FooterTitle>
            <nav class="grid grid-cols-2 gap-3">
                <ul class="font-light">
                    <li v-for="menu in firstColumnMenus" :key="menu.label">
                        <NuxtLink :to="localizePath(menu.url)" class="underline">
                            {{ locale === 'th' ? menu.label : menu['label-en'] }}
                        </NuxtLink>
                    </li>
                </ul>
                <ul class="font-light lg:relative">
                    <li v-for="menu in secondColumnMenus" :key="menu.label">
                        <NuxtLink :to="localizePath(menu.url)" class="underline">
                            {{ locale === 'th' ? menu.label : menu['label-en'] }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
