<script setup lang="ts">
	const { t } = useI18n({ useScope: "local" })

	// VARIALBE
	const images = [
		"/produce-tshirt/pin.png",
		"/produce-tshirt/transfer.png",
	]
	const items = computed(() =>
		images.map((image, i) => ({
			title: t(`items.${i}.title`),
			advantage: t(`items.${i}.advantage`),
			disadvantage: t(`items.${i}.disadvantage`),
			image,
		})),
	)
</script>

<i18n lang="json">
{
    "th": {
        "items": [
            {
                "title": "ปักธรรมดา",
                "advantage": "สามารถปักลงบนผ้าได้หลายชนิด ทำให้งานโลโก้หรืออักษรดูสวยงาม",
                "disadvantage": "ถ้าแบบมีการไล่เฉดสีหรือขนาดฟอนต์เล็กมากจนเกินไป จะไม่สามารถเก็บส่วนรายละเอียดงานได้หมด ซึ่งจะทำให้งานปักไม่สวยงามดูยึกยือและไม่คมชัด"
            },
            {
                "title": "ปักทรานส์เฟอร์",
                "advantage": "งานปัก HD จะมีความสวยงาม เนื้อเนียน ละเอียด โดดเด่นคมชัดแม้จะตัวอักษรเล็กมากก็ตาม นอกจากนี้ยังสามารถไล่เฉดได้ ไม่จำกัดสีอีกด้วย",
                "disadvantage": "จะต้องเป็นงานที่อยู่บนพื้นทึบเท่านั้น จึงสามารถทำได้"
            }
        ],
        "advantageLabel": "ข้อดี:",
        "disadvantageLabel": "ข้อจำกัด:",
        "pricingNote": "งานปักจะประเมินราคาตามจำนวน ขนาด และสีไหมปัก สามารถส่งแบบมาให้แอดมินประเมินทางแชทไลน์ได้เลยนะคะ",
        "warning": "***งานปักไม่แนะนำให้ใช้กับผ้ากีฬา เนื่องจากตัวผ้าลื่น งานปักจะทำให้ผ้าย่นได้***"
    },
    "en": {
        "items": [
            {
                "title": "Standard Embroidery",
                "advantage": "Can be embroidered on many types of fabric, giving logos and lettering a polished look.",
                "disadvantage": "Designs with color gradients or very small fonts can't capture every detail, which can make the embroidery look uneven and less sharp."
            },
            {
                "title": "Transfer Embroidery",
                "advantage": "HD embroidery is smooth, fine and sharp — even with very small lettering. It can also reproduce gradients with unlimited colors.",
                "disadvantage": "Can only be applied to designs on a solid background."
            }
        ],
        "advantageLabel": "Pros:",
        "disadvantageLabel": "Limitations:",
        "pricingNote": "Embroidery is priced by quantity, size and number of thread colors. Just send your design to our admin on LINE for a quote.",
        "warning": "***We don't recommend embroidery on sportswear fabric — the fabric is slippery and embroidery can make it pucker.***"
    }
}
</i18n>

<template>
	<div
		class="block sm:grid md:block sm:grid-cols-2 sm:gap-5 md:gap-0 space-y-5 sm:space-y-0 md:space-y-5"
	>
		<Card v-for="item in items" :key="item.title" class="shadow" horizontal>
			<ProseImg
				:src="item.image"
				class="rounded-lg max-w-[10rem] aspect-square object-cover"
			/>
			<div>
				<ProseH4 class="mb-3">{{ item.title }}</ProseH4>
				<ProseP class="!text-primary leading-none">{{ t("advantageLabel") }} {{ item.advantage }}</ProseP>
				<ProseP class="!text-primary leading-none"
					>{{ t("disadvantageLabel") }} {{ item.disadvantage }}</ProseP
				>
			</div>
		</Card>

		<div class="sm:col-span-full">
			<ProseH3 class="text-xl text-center" as="p">
				{{ t("pricingNote") }}
			</ProseH3>
			<ProseP class="text-center text-lg !text-primary">
				{{ t("warning") }}
			</ProseP>
		</div>
	</div>
</template>
