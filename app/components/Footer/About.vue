<script setup lang="ts">
const { t } = useI18n();

const items = computed(() => [
    {
        label: t('footer.about.title'),
        content: t('footer.about.description'),
    },
]);
</script>
<template>
    <div class="text-white">
        <div class="hidden md:block">
            <FooterTitle>{{ $t('footer.about.title') }}</FooterTitle>
            <p class="font-light">
                {{ $t('footer.about.description') }}
            </p>
        </div>

        <div class="block md:hidden">
            <UAccordion :items="items" :ui="{ trigger :'text-2xl font-bold'}"/>
        </div>
    </div>
</template>
