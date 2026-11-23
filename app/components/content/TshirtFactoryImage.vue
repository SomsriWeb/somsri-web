<script setup lang="ts">
	// VARIABLE
	const { locale } = useI18n()
	const items = [
		{
			text: "เรามีเนื้อผ้าให้เลือกหลากหลายชนิด",
			"text-en": "We offer a wide variety of fabrics to choose from",
			image: "/tshirt-factory/many-fabric.png",
			alt: "โรงงานรับผลิตเสื้อ",
			"alt-en": "Custom shirt manufacturing factory",
		},
		{
			text: "พร้อมให้คุณสกรีนลายเสื้อแบบครบจบในที่เดียว",
			"text-en": "Ready to screen print your designs, all in one place",
			image: "/tshirt-factory/screen-all-in-one.png",
			alt: "งบประมาณจากรูปแบบการตัดเย็บ ต้องคิดต้นทุนเมื่อทำเสื้อแบรนด์ตัวเอง",
			"alt-en": "Budgeting by sewing style – costs to consider when making your own shirt brand",
		},
		{
			text: "มีรีวิวจากสินค้าจริงให้คุณได้ตัดสินใจก่อนการสั่งซื้อกับโรงงานผลิตเสื้อ",
			"text-en": "Real product reviews to help you decide before ordering from our factory",
			image: "/tshirt-factory/real-review.png",
			alt: "โรงงานผลิตเสื้อผ้า",
			"alt-en": "Garment factory",
		},
	]
	const data = computed(() =>
		items.map((item) => {
			const en = locale.value === "en"
			return {
				text: en ? item["text-en"] : item.text,
				image: item.image,
				alt: en ? item["alt-en"] : item.alt,
			}
		})
	)
</script>
<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
		<div v-for="item in data" :key="item.text">
			<NuxtImg
				class="object-cover w-full h-full rounded-xl mb-1"
				:src="item.image"
				:alt="item.alt || item.text"
				format="webp"
				loading="lazy"
				placeholder
			/>
			<p class="text-center text-lg text-primary">{{ item.text }}</p>
		</div>
	</div>
</template>
