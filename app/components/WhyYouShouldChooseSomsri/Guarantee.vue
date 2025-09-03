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
					ขั้นตอนการสั่งซื้อสะดวก รวดเร็ว พร้อมกับการผลิตที่แสนรวดเร็ว
				</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">
					ส่งตรงเวลารับประกันสินค้า 90 วัน
				</p>
				<p class="text-stone-800 text-xl font-light">
					สั่งผลิตเสื้อกับสมศรี เราใส่ใจทุกขั้นตอนเริ่มตั้งแต่ขั้นตอนการออกแบบเสื้อ
					ผลิตเสื้อ สกรีนเสื้อ และปักเสื้อ รองรับการผลิตทุกรูปแบบ
					ด้วยทีมงานมืออาชีพมากประสบการณ์และโรงงานผลิตของเราเอง
					จึงเป็นเหตุผลที่ทำให้ลูกค้าที่สั่งผลิตเสื้อกับเรามั่นใจได้ว่าสินค้าทุกตัวที่ได้ออกแบบกับทางเราจะต้องออกมาสวยงาม
					ถูกต้องตามแบบ สกรีนแน่น สีชัดเจน ไม่หลุด ไม่ลอกง่าย และทนทานต่อการซัก
					ส่งต่อความมั่นใจในทุกครั้งที่สวมใส่
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
