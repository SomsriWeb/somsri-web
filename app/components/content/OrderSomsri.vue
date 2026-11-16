<script setup lang="ts">
import { LINE_LINK } from '~/lib/lineLink';
import { SALES_PEOPLE } from '~/lib/salesPeople';

// VARIABLE
const { locale } = useI18n();
const lineLink = inject(LINE_LINK, 'https://line.me/R/ti/p/%40diz8986o');
</script>
<template>
    <div>
        <div class="rounded-2xl p-3 md:p-7 bg-primary">
            <div class="text-center text-3xl lg:text-5xl font-bold text-white mb-3 leading-none">
                <slot name="title" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
            </div>
            <p class="text-center text-white text-base md:text-lg font-light mb-5">
                <slot name="description" mdc-unwrap="h1 h2 h3 h4 h5 h6 p" />
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-5">
                <NuxtLink :href="lineLink" external>
                    <UButton icon="hugeicons:line" color="neutral" class="!text-primary px-2 h-full" block>@somsritshirt</UButton>
                </NuxtLink>

                <NuxtLink href="https://www.facebook.com/somsritshirt" external>
                    <UButton icon="line-md:facebook" color="neutral" class="!text-primary px-2 h-full" block>Somsritshirt</UButton>
                </NuxtLink>

                <NuxtLink v-for="person in SALES_PEOPLE" :key="person.phoneNumber" :href="`tel:${person.phoneNumber.replaceAll('-', '')}`" external>
                    <UButton icon="solar:phone-bold" color="neutral" class="!text-primary px-2 !text-xs gap-3" block>
                        <div>
                            <p>{{ person.phoneNumber }}</p>
                            <p>{{ $t('sales.label', { name: person.name[locale as 'th' | 'en'] }) }}</p>
                        </div>
                    </UButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
