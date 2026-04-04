<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { NavbarCollectionItem } from '@nuxt/content';

interface Props {
    showMenu: boolean;
    items: NavigationMenuItem[];
    productItems: NonNullable<NavbarCollectionItem['products']>;
    lang: 'th' | 'en';
}

defineProps<Props>();

const { $viewport } = useNuxtApp();
const hoveredCategory = ref<string | null>(null);
</script>

<template>
    <div class="lg:flex lg:pt-2">
        <NuxtLink to="/">
            <Logo class="max-w-6" />
        </NuxtLink>
    </div>

    <div
        :class="{ hidden: !showMenu && $viewport.isLessOrEquals('lg') }"
        class="flex flex-col w-screen left-0 fixed pt-0 pt-5 overflow-y-auto bg-primary lg:w-auto lg:static lg:flex-row lg:gap-3 lg:pt-0 lg:overflow-visible lg:bg-transparent lg:mt-0"
    >
        <UNavigationMenu
            :items="items"
            class="hidden md:flex flex-1 justify-center"
            :ui="{
                link: 'text-white hover:text-gray-300 transition-colors before:bg-transparent lg:text-[20px] gap-0.5',
                viewport: 'bg-transparent ring-0 shadow-none border-0 overflow-visible',
                content: 'bg-transparent ring-0 shadow-none p-0 overflow-visible bg-red',
                linkTrailingIcon: 'size-3 shrink-0 transform group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
        >
            <template #megamenu-content>
                <!-- กล่อง Custom Menu ของเราที่จะแสดงผลเพียวๆ -->
                <div class="w-[820px] bg-white rounded-[32px] border-2 border-primary p-3 shadow-2xl">
                    <!-- Top Featured Section -->
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <NuxtLink
                            v-for="product in productItems.previewCategories"
                            :key="product.id"
                            :to="lang === 'th' ? product.url : product['url-en']"
                            class="bg-primary text-white rounded-2xl p-2 flex gap-3 cursor-pointer hover:bg-[#8b1d33] transition-colors"
                        >
                            <img :src="product.image" :alt="lang === 'th' ? product.label : product['label-en']" class="w-20 h-24 object-cover rounded-lg bg-gray-300" />
                            <div>
                                <h3 class="font-bold text-lg mb-1">{{ lang === 'th' ? product.label : product['label-en'] }}</h3>
                                <p class="text-xs text-gray-200 leading-relaxed">
                                    {{ lang === 'th' ? product.desc : product['desc-en'] }}
                                </p>
                            </div>
                        </NuxtLink>
                    </div>

                    <!-- Bottom Categories Section -->
                    <div class="grid grid-cols-5 gap-3">
                        <template v-for="product in productItems.shrinkCategories" :key="product.id">
                            <!-- NESTED HOVER POPOVER สำหรับหมวดย่อยที่มี desc -->
                            <UPopover
                                v-if="product.desc || product['desc-en']"
                                :open="hoveredCategory === product.id"
                                :portal="false"
                                :content="{
                                    align: 'center',
                                    side: 'bottom',
                                    sideOffset: 8,
                                    avoidCollisions: false,
                                }"
                                :ui="{
                                    // ล้างสไตล์กล่องดั้งเดิมของ UPopover ให้โปร่งใส และเพิ่ม overflow-visible เพื่อปล่อยเงา
                                    content: 'bg-transparent ring-0 shadow-none border-0 p-0 rounded-none overflow-visible data-[state=closed]:duration-0',
                                }"
                            >
                                <!-- เพิ่ม duration-0 hover:duration-150 เพื่อให้ Hover เด้งออกทันที (0ms) ตอนเมาส์ออก -->
                                <!-- เพิ่ม focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 เพื่อป้องกันขอบสีเขียว -->
                                <UButton
                                    block
                                    :to="lang === 'th' ? product.url : product['url-en']"
                                    :ui="{ base: '!lg:px-0 !lg:py-1 !min-w-0 !text-nowrap !rounded-sm' }"
                                    class="bg-primary text-white font-bold hover:bg-[#8b1d33] transition-all duration-0 hover:duration-150 hover:-translate-y-0.5 shadow-sm focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 lg:text-[20px]"
                                    @pointerenter="hoveredCategory = product.id"
                                    @pointerleave="hoveredCategory = null"
                                >
                                    {{ lang === 'th' ? product.label : product['label-en'] }}
                                </UButton>

                                <template #content>
                                    <!-- เปลี่ยนจาก shadow-xl เป็น shadow-2xl ให้สวยและมีมิติเข้ากับตัว Mega Menu -->
                                    <div class="bg-primary text-white rounded-2xl p-4 flex gap-4 w-[600px] shadow-2xl border border-[#8b1d33]">
                                        <img :src="product.image" :alt="lang === 'th' ? product.label : product['label-en']" class="w-20 h-24 object-cover rounded-lg bg-gray-300 shrink-0" />
                                        <div>
                                            <h3 class="font-bold text-lg mb-1">
                                                {{ lang === 'th' ? product.label : product['label-en'] }}
                                            </h3>
                                            <p class="text-xs text-gray-200 leading-relaxed">
                                                {{ lang === 'th' ? product.desc : product['desc-en'] }}
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </UPopover>

                            <!-- ปุ่มปกติ สำหรับหมวดย่อยที่ไม่มี desc (อัปเดต duration เช่นกัน และลบ focus ring) -->
                            <UButton
                                v-else
                                block
                                :to="lang === 'th' ? product.url : product['url-en']"
                                class="bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-[#8b1d33] transition-all duration-0 hover:duration-150 hover:-translate-y-0.5 shadow-sm focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                            >
                                {{ lang === 'th' ? product.label : product['label-en'] }}
                            </UButton>
                        </template>
                    </div>
                </div>
            </template>
        </UNavigationMenu>
    </div>

    <div class="hidden lg:flex lg:relative lg:gap-5 lg:pt-3">
        <NuxtLink to="tel:024300678" external><Icon name="lucide:phone" /></NuxtLink>
        <NuxtLink to="/en"><Icon name="lucide:languages" /></NuxtLink>
    </div>
</template>
