<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
	"th": { "consult": "ปรึกษาฟรี" },
	"en": { "consult": "Free Consultation" }
}
</i18n>

<template>
	<div class="flex flex-wrap items-center justify-start gap-4 mt-6">
		<!-- ปุ่มติดต่อ (solid) -->
		<LineLink>
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white"
				size="md"
			>
				{{ t('consult') }}
			</UButton>
		</LineLink>
	</div>
</template>
