<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
const localizePath = await useLocalizedPath();
</script>

<i18n lang="json">
{
    "th": { "label": "ดูผลงานกลุ่มลูกค้าองค์กร" },
    "en": { "label": "View Corporate Client Portfolio" }
}
</i18n>

<template>
  <div class="flex justify-center relative mb-10">
    <NuxtLink :to="localizePath('/portfolio-organization')" class="block">
      <UButton
        size="xl"
        color="primary"
        variant="solid"
        class="relative"
      >
        {{ t('label') }}
      </UButton>
    </NuxtLink>
  </div>
</template>
