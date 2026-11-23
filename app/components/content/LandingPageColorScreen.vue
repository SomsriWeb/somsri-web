<script setup lang="ts">
	const { t } = useI18n({ useScope: "local" })

	// VARIALBE
	const images = [
		"/produce-tshirt/cmyk.png",
		"/produce-tshirt/halftone.png",
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
                "title": "เทคนิค CMYK (Offset)",
                "advantage": "ลักษณะการทำงาน แบบ 4 สี คือ ไม่ว่าสี ที่เราต้องการสกรีนจะเยอะแค่ไหน การทำแบบแม่พิมพ์จะไม่เกิน 6 บล็อก (2 บล็อกที่เพิ่มมาคือ ขาวรอง พื้น และ ขาวไฮไลท์ ในกรณีเสื้อสี หรือสีดำ) เหมาะกับ งานที่ไม่ละเอียดมากหนัก สามารถประหยัดแม่พิมพ์ได้ เหมาะสำหรับ ภาพวิว ภาพวาด หรือภาพเหมือน",
                "disadvantage": "เนื่องจากการเรียงตัวของเม็ดสกรีน ซ้อนทับกันรายละเอียดที่ได้ อาจทำให้สีผิด เพี้ยนหรือหากสังเกตใกล้ ๆ ในงานสีอาจมีความหม่นหมองดูไม่สวยงาม"
            },
            {
                "title": "เทคนิค Halftone",
                "advantage": "เหมาะมากสำหรับงานที่ต้องการสีที่กลมกลืนกันอย่างลงตัว (การไล่สี) เพราะเทคนิคนี้จะทำให้เสื้อสกรีนออกมาเหมือนเราได้ไล่น้ำหนักของภาพ เช่น สกรีน ภาพเหมือน ข้อดีของเทคนิค นี้ในการสกรีนแบบนี้ก็คือจะได้สีที่สดและใกล้เคียงกับต้นฉบับมากที่สุด",
                "disadvantage": "ผิวสัมผัสไม่เรียบเนียน"
            }
        ],
        "advantageLabel": "ข้อดี:",
        "disadvantageLabel": "ข้อจำกัด:"
    },
    "en": {
        "items": [
            {
                "title": "CMYK (Offset) Technique",
                "advantage": "A 4-color process: no matter how many colors your design has, it never needs more than 6 screens (the 2 extra are a white underbase and a white highlight for colored or black shirts). Best for designs that aren't extremely detailed and helps save on screen costs — ideal for landscapes, paintings or portraits.",
                "disadvantage": "Because the halftone dots overlap, colors may shift slightly, and up close the colors can look a little dull."
            },
            {
                "title": "Halftone Technique",
                "advantage": "Ideal for designs that need smooth, seamless color blending (gradients). The print reproduces the tonal range of the image — for example portraits — giving vivid colors that stay very close to the original artwork.",
                "disadvantage": "The print surface is not completely smooth."
            }
        ],
        "advantageLabel": "Pros:",
        "disadvantageLabel": "Limitations:"
    }
}
</i18n>

<template>
	<div class="space-y-5">
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
	</div>
</template>
