<script setup lang="ts">
	// VARIABLE
	const data = ref([
		{
			text: "เรามีเนื้อผ้าให้เลือกหลากหลายชนิด",
			image: "/tshirt-factory/many-fabric.png",
			alt: "โรงงานรับผลิตเสื้อ",
		},
		{
			text: "พร้อมให้คุณสกรีนลายเสื้อแบบครบจบในที่เดียว",
			image: "/tshirt-factory/screen-all-in-one.png",
			alt: "งบประมาณจากรูปแบบการตัดเย็บ ต้องคิดต้นทุนเมื่อทำเสื้อแบรนด์ตัวเอง",
		},
		{
			text: "มีรีวิวจากสินค้าจริงให้คุณได้ตัดสินใจก่อนการสั่งซื้อกับโรงงานผลิตเสื้อ",
			image: "/tshirt-factory/real-review.png",
			alt: "โรงงานผลิตเสื้อผ้า",
		},
	])
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
