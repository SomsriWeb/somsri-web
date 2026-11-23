<script setup lang="ts">
	const { t } = useI18n({ useScope: 'local' })

	// VARIALBE
	const items = computed(() => [
		{
			key: "sublimation",
			title: t("sublimation.title"),
			description: t("sublimation.description"),
			image: "/produce-tshirt/sublimation.png",
			alt: t("sublimation.alt"),
		},
	])
</script>

<i18n lang="json">
{
	"th": {
		"sublimation": {
			"title": "การพิมพ์ (Sublimation)",
			"description": "กระบวนการพิมพสกรีนอีกรูปแบบหนึ่ง ที่ไดรับความนิยมเป็นอยางสูง โดยใช้ ความร้อนเข้ามาทำใหน้ำหมึกซึมเขาไปในเนื้อผ้า นิยมทำเปนเสื้อกีฬา",
			"alt": "ราคางาน Sublimation"
		}
	},
	"en": {
		"sublimation": {
			"title": "Sublimation Printing",
			"description": "A hugely popular printing method that uses heat to make the ink penetrate into the fabric. Widely used for sportswear and jerseys.",
			"alt": "Sublimation printing prices"
		}
	}
}
</i18n>

<template>
	<div class="space-y-5">
		<div
			class="block sm:grid md:block sm:grid-cols-2 sm:gap-5 md:gap-0 space-y-5 sm:space-y-0 md:space-y-5"
		>
			<Card v-for="item in items" :key="item.key" class="shadow" horizontal>
				<ProseImg
					:src="item.image"
					:alt="item.alt"
					class="rounded-lg md:max-w-[10rem] aspect-square object-cover"
				/>
				<div>
					<ProseH4 class="mb-3">{{ item.title }}</ProseH4>
					<ProseP class="!text-primary leading-none">{{ item.description }}</ProseP>
				</div>
			</Card>
		</div>

		<div class="flex justify-center">
			<ProseImg
				src="/produce-tshirt/sublimation-price-table.jpg"
				alt="sport price"
				class="max-w-[25rem]"
			/>
		</div>
	</div>
</template>
