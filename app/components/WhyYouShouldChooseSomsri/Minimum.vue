<script setup lang="ts">
	// MODEL
	const open = defineModel<boolean>("open")

	const { t } = useI18n({ useScope: 'local' })
	const localizePath = await useLocalizedPath()

	// FUNCTION
	function closeModal() {
		open.value = false
	}
</script>

<i18n lang="json">
{
	"th": {
		"lead": "ต้องการผลิตน้อยไม่ใช่ปัญหาเพราะ",
		"headline": "ขั้นต่ำเพียง 150 ตัวก็สั่งผลิตได้",
		"bodyBeforeNote": "ถึงสั่งผลิตเพียง 150 ตัว",
		"bodyAfterNote": "สมศรีเราก็ใส่ใจตั้งแต่ขั้นตอนการออกแบบ เพื่อให้ผลงานออกมาสวยงามตรงใจลูกค้า ทำให้มั่นใจได้ในเรื่องคุณภาพ “สมศรีมีเสื้อ” การันตีด้วยรีวิวจากลูกค้ามากมายที่เลือกใช้บริการกับเรา มั่นใจได้ในคุณภาพของงานผลิตและสกรีนทุกตัว เนื้อผ้าดี มีคุณภาพ สีคมชัด สกรีนแน่น ทนทาน ใช้งานได้นาน",
		"seePortfolio": "ดูตัวอย่างผลงานเพิ่มเติม"
	},
	"en": {
		"lead": "Small order? No problem, because",
		"headline": "Minimum order of just 150 pieces",
		"bodyBeforeNote": "Even with an order of just 150 pieces",
		"bodyAfterNote": "SomsriTshirt pays attention to every step from the design stage, so the result looks great and matches exactly what you had in mind. Our quality is backed by countless reviews from customers who chose us. Every piece is produced and printed with care: quality fabric, sharp colors, solid prints that are durable and long-lasting.",
		"seePortfolio": "View more of our work"
	}
}
</i18n>

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
				<p class="text-3xl text-stone-800 font-light">{{ t('lead') }}</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">
					{{ t('headline') }}
				</p>
				<p class="text-stone-800 text-xl font-light">
					{{ t('bodyBeforeNote') }}<sup>(1)</sup> {{ t('bodyAfterNote') }}
				</p>
				<!-- <ol class="list-decimal list-inside text-stone-500 text-sm font-light">
					<li>ยกเว้นเสื้อโปโลขั้นต่ำเพียงแค่ 50 ตัว</li>
				</ol> -->

				<NuxtLink
					:to="localizePath('/portfolio')"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					{{ t('seePortfolio') }} <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
