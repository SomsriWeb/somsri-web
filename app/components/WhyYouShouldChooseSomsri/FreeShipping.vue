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
				<p class="text-3xl text-stone-800 font-light">อยู่ในกรุงเทพมหานครฯ ใช่หรือไม่</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">สมศรีส่งให้ฟรี</p>
				<p class="text-stone-800 text-xl font-light">
					สมศรีมีเสื้อพร้อมการให้บริการแบบมืออาชีพ เพื่อให้คุณมั่นใจในบริการของเรา
					เรามีทีมงานยินดีให้คำปรึกษาฟรี
				</p>

				<NuxtLink
					to="/design"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					ดูตัวอย่างผลงานเพิ่มเติม <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
