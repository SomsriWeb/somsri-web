<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
    "th": { "message": "แย่จัง เกิดข้อผิดพลาดขึ้น" },
    "en": { "message": "Sorry, something went wrong." }
}
</i18n>

<template>
	<NuxtLayout name="color">
		<p>{{ t('message') }}</p>
	</NuxtLayout>
</template>
