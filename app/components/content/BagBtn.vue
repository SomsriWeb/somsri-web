<script setup lang="ts">
	import { ProductTypeKey } from "~/lib/design/variable"

	const { t } = useI18n({ useScope: "local" })
	const localizePath = await useLocalizedPath()
</script>

<i18n lang="json">
{
	"th": { "consult": "ปรึกษาฟรี", "design": "ออกแบบกระเป๋า" },
	"en": { "consult": "Free Consultation", "design": "Design Your Bag" }
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
				{{ t("consult") }}
			</UButton>
		</LineLink>

		<!-- ปุ่มออกแบบ (outline) → หน้าออกแบบพร้อมเลือกประเภทกระเป๋าผ้า -->
		<NuxtLink
			:to="{ path: localizePath('/shop'), query: { type: ProductTypeKey.TOTEBAG } }"
			class="inline-flex"
		>
			<UButton
				icon="i-lucide-palette"
				variant="outline"
				class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
				size="md"
			>
				{{ t("design") }}
			</UButton>
		</NuxtLink>
	</div>
</template>