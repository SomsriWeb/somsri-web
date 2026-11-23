<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="json">
{
	"th": {
		"consult": "ปรึกษาฟรี",
		"fabricSamples": "ดูตัวอย่างผ้า"
	},
	"en": {
		"consult": "Free Consultation",
		"fabricSamples": "View Fabric Samples"
	}
}
</i18n>

<template>
	<div class="flex flex-wrap items-center justify-start gap-4 mt-6">
		<!-- ปุ่มติดต่อ (solid) -->
		<!-- หมายเหตุ: LineLink เป็น multi-root component ใส่ class ที่ตัวมันเองไม่ได้ผล ต้องใส่ที่ UButton ตรงๆ -->
		<LineLink>
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white"
				size="md"
			>
				{{ t('consult') }}
			</UButton>
		</LineLink>

		<!-- ปุ่มดูตัวอย่างผ้า → เลื่อนไปหมวดเนื้อผ้าในหน้าเดียวกัน -->
		<UButton
			to="#fabric"
			variant="outline"
			class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
			size="md"
		>
			{{ t('fabricSamples') }}
		</UButton>
	</div>
</template>