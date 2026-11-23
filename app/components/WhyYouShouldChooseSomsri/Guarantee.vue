<script setup lang="ts">
	// MODEL
	const open = defineModel<boolean>("open")

	// FUNCTION
	function closeModal() {
		open.value = false
	}

	const { t } = useI18n({ useScope: "local" })
	const localizePath = await useLocalizedPath()
</script>

<i18n lang="json">
{
	"th": {
		"intro": "ขั้นตอนการสั่งซื้อสะดวก รวดเร็ว พร้อมกับการผลิตที่แสนรวดเร็ว",
		"headline": "ส่งตรงเวลารับประกันสินค้า 90 วัน",
		"description": "สั่งผลิตเสื้อกับสมศรี เราใส่ใจทุกขั้นตอนเริ่มตั้งแต่ขั้นตอนการออกแบบเสื้อ ผลิตเสื้อ สกรีนเสื้อ และปักเสื้อ รองรับการผลิตทุกรูปแบบ ด้วยทีมงานมืออาชีพมากประสบการณ์และโรงงานผลิตของเราเอง จึงเป็นเหตุผลที่ทำให้ลูกค้าที่สั่งผลิตเสื้อกับเรามั่นใจได้ว่าสินค้าทุกตัวที่ได้ออกแบบกับทางเราจะต้องออกมาสวยงาม ถูกต้องตามแบบ สกรีนแน่น สีชัดเจน ไม่หลุด ไม่ลอกง่าย และทนทานต่อการซัก ส่งต่อความมั่นใจในทุกครั้งที่สวมใส่",
		"seeMore": "ดูตัวอย่างผลงานเพิ่มเติม"
	},
	"en": {
		"intro": "A simple, fast ordering process backed by quick production",
		"headline": "On-time delivery with a 90-day product warranty",
		"description": "When you order with SomsriTshirt, we take care of every step — from shirt design to production, screen printing and embroidery — and support every kind of production run. With an experienced professional team and our own factory, you can be confident that every piece designed with us comes out exactly as planned: crisp, vivid prints that won't crack or peel and stand up to repeated washing. Confidence you can feel every time you wear it.",
		"seeMore": "See more of our work"
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
				<p class="text-3xl text-stone-800 font-light">{{ t("intro") }}</p>
				<p class="text-[4rem] font-bold leading-16 text-stone-800">{{ t("headline") }}</p>
				<p class="text-stone-800 text-xl font-light">
					{{ t("description") }}
				</p>

				<NuxtLink
					:to="localizePath('/portfolio')"
					class="text-primary hover:underline transition-all flex items-center gap-1"
				>
					{{ t("seeMore") }} <UIcon name="lucide:chevron-right" />
				</NuxtLink>
			</div>
		</template>
	</UModal>
</template>
