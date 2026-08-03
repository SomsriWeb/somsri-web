<template>
	<div class="flex flex-wrap items-center justify-start gap-4 mt-6">
		<!-- ปุ่มติดต่อ (solid) -->
		<LineLink>
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="inline-flex items-center bg-primary px-6 py-2.5 text-sm text-white"
				size="md"
			>
				ปรึกษาฟรี
			</UButton>
		</LineLink>

		<!-- ปุ่มดูตัวอย่างผ้า → เลื่อนไปหมวดเนื้อผ้าในหน้าเดียวกัน -->
		<UButton
			to="#fabric"
			variant="outline"
			class="inline-flex items-center border-2 border-primary px-6 py-2.5 text-sm text-primary"
			size="md"
		>
			ดูตัวอย่างผ้า
		</UButton>
	</div>
</template>