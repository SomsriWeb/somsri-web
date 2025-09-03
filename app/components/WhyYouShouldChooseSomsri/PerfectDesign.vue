<script setup lang="ts">
	// MODEL
	const open = defineModel<boolean>("open")

	// FUNCTION
	function closeModal() {
		open.value = false
	}
</script>
<template>
	<UModal
		:class="{ hidden: !open }"
		class="max-w-3xl"
		:modal="open"
		:overlay="open"
		open
		@update:open="(value) => (open = value)"
	>
		<template #content>
			<div class="m-7 space-y-3">
				<UButton
					icon="lucide:x"
					class="absolute top-4 right-4 rounded-full !min-w-fit"
					@click="closeModal"
				/>
				<p class="text-3xl text-stone-800 font-light">
					อยากทำเสื้อแต่ยังไม่ได้ออกแบบ ไม่เป็นไรเพราะเรามี
				</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">บริการออกแบบเสื้อ</p>
				<p class="text-stone-800 text-xl font-light">
					สมศรีมีบริการออกแบบลายเสื้อเฉพาะตัว รูปแบบไม่ซ้ำใคร ไม่ว่าจะเป็น ลายกราฟิก โลโก้
					ข้อความ และอื่นๆ เราพร้อมให้คำปรึกษาเรื่องการออกแบบจนกว่าลูกค้าจะพอใจ
					สามารถสั่งผลิตและออกแบบได้ตามความต้องการของลูกค้า
					เพื่อให้ท่านได้ผลิตเสื้อที่มีรูปแบบตรงตามความต้องการมากที่สุด
				</p>

				<NuxtLink
					to="/portfolio"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					ดูตัวอย่างผลงานเพิ่มเติม <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
