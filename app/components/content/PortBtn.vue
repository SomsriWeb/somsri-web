<script setup lang="ts">
interface Props {
  /**
   * กำหนดเส้นทางของ LINK
   */
  to: string;
}
const { to } = defineProps<Props>();

const { t } = useI18n({ useScope: 'local' });
const localizePath = await useLocalizedPath();
</script>

<i18n lang="json">
{
    "th": { "priceRate": "เรทราคาเสื้อ" },
    "en": { "priceRate": "Shirt Price Rates" }
}
</i18n>

<template>
  <!-- ปุ่มขอผ้าตัวอย่าง -->
  <div class="flex justify-center relative pt-5">
    <NuxtLink :to="localizePath(to)" class="block">
      <UButton
        size="xl"
        color="primary"
        variant="solid"
        icon="i-lucide-send"
        class="relative"
      >
        {{ t('priceRate') }}
        <!-- จุด ping animation -->
        <span
          class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3 rounded-full bg-primary-200 animate-ping"
        ></span>
      </UButton>
    </NuxtLink>
  </div>
</template>
