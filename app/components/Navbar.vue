<script setup lang="ts">
import { ALTERNATE_PATH } from '~/lib/alternatePath';
import type { NavigationMenuItem } from '@nuxt/ui';
import type { NavbarCollectionItem } from '@nuxt/content';

// PROPS
interface Props {
    activeNavbar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    activeNavbar: false,
});
const { activeNavbar } = toRefs(props);

// VARIABLE
const route = useRoute();
const { $viewport } = useNuxtApp();
const { data: menus } = await useAsyncData('navbar-menus', () => queryCollection('navbar').all());
const isScrolled = ref<boolean>(false);
const showMenu = ref<boolean>(false);
const { locale } = useI18n();
const lang = computed(() => locale.value as 'th' | 'en');
const localizePath = await useLocalizedPath();
const alternatePath = inject<string | null>(ALTERNATE_PATH, null);
const isSlideOverOpen = ref(false);

const navbarData = computed(() => (menus.value?.[0] as NavbarCollectionItem) || {});
const productItems = computed(() => {
    return navbarData.value.products || { previewCategories: [], shrinkCategories: [] };
});

const mainNavItemsBase = computed<NavigationMenuItem[]>(() => {
    return (navbarData.value.main || []).map((menu) => {
        const url = localizePath(menu.url);
        return {
            label: lang.value === 'th' ? menu.label : menu['label-en'],
            to: url,
            // ปิดการเติม /en อัตโนมัติของ Nuxt UI (useLocalizedPath จัดการแล้ว)
            locale: false,
            class: activeMenuClass(url, false),
        };
    });
});

const items = computed<NavigationMenuItem[]>(() => {
    const products = [...(productItems.value.previewCategories || []), ...(productItems.value.shrinkCategories || [])];

    return mainNavItemsBase.value.map((item, index) => {
        if (index !== 1 || products.length === 0) return item;
        return {
            ...item,
            slot: 'megamenu' as const,
            children: products.map((prod) => ({
                label: lang.value === 'th' ? prod.label : prod['label-en'],
                to: localizePath(prod.url),
                locale: false,
                class: activeMenuClass(localizePath(prod.url), true),
            })),
        };
    });
});

// COMPUTED
const navbarClass = computed(() => {
    if (showMenu.value && $viewport.isLessThan('xl')) return '!bg-primary shadow-lg';
    return isScrolled.value || activeNavbar.value ? '!bg-primary shadow-lg' : 'bg-transparent';
});

function activeMenuClass(url: string, isSubURL: boolean) {
    if (route.path !== url) {
        return 'font-normal';
    }

    if ($viewport.isLessOrEquals('lg') || (!isSubURL && (isScrolled.value || activeNavbar.value))) {
        return 'font-bold underline';
    }

    return 'font-bold !text-primary underline';
}

// FUNCTION
function handleScroll() {
    isScrolled.value = window.scrollY > 100;
}

// WATCH
watch($viewport.breakpoint, (value) => {
    console.log(value);
});

// LIFE CYCLE
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <nav :class="navbarClass" class="text-white flex justify-between px-6 py-2 md:py-5 lg:px-18 lg:py-0 lg:max-h-[72px]">
        <NavbarDesktop :show-menu="showMenu" :items="items" :product-items="productItems" :lang="lang" :home-path="localizePath('/')" :alternate-path="alternatePath" :localize-path="localizePath" />

        <NavbarMobile v-model:open="isSlideOverOpen" :items="items" :home-path="localizePath('/')" :alternate-path="alternatePath" />
    </nav>
</template>
