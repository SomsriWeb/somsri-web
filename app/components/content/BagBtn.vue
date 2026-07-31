<script setup lang="ts">
	import { ProductTypeKey } from "~/lib/design/variable"
</script>

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
				ปรึกษาฟรี
			</UButton>
		</LineLink>

		<!-- ปุ่มออกแบบ (outline) → หน้าออกแบบพร้อมเลือกประเภทกระเป๋าผ้า -->
		<NuxtLink
			:to="{ path: '/shop', query: { type: ProductTypeKey.TOTEBAG } }"
			class="inline-flex"
		>
			<UButton
				icon="i-lucide-palette"
				variant="outline"
				class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
				size="md"
			>
				ออกแบบกระเป๋า
			</UButton>
		</NuxtLink>
	</div>
</template>