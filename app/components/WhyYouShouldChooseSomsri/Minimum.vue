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
				<p class="text-3xl text-stone-800 font-light">ต้องการผลิตน้อยไม่ใช่ปัญหาเพราะ</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">
					ขั้นต่ำเพียง 100 ตัวก็สั่งผลิตได้
				</p>
				<p class="text-stone-800 text-xl font-light">
					ถึงสั่งผลิตเพียง 100 ตัว<sup>(1)</sup> สมศรีเราก็ใส่ใจตั้งแต่ขั้นตอนการออกแบบ
					เพื่อให้ผลงานออกมาสวยงามตรงใจลูกค้า ทำให้มั่นใจได้ในเรื่องคุณภาพ “สมศรีมีเสื้อ”
					การันตีด้วยรีวิวจากลูกค้ามากมายที่เลือกใช้บริการกับเรา
					มั่นใจได้ในคุณภาพของงานผลิตและสกรีนทุกตัว เนื้อผ้าดี มีคุณภาพ สีคมชัด สกรีนแน่น
					ทนทาน ใช้งานได้นาน
				</p>
				<ol class="list-decimal list-inside text-stone-500 text-sm font-light">
					<li>ยกเว้นเสื้อโปโลขั้นต่ำเพียงแค่ 50 ตัว</li>
				</ol>

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
