<script setup lang="ts">
	// VARIABLE
	const data = ref([
		{
			text: "มีหลากหลายสีที่คุณสามารถเลือกได้",
			image: "/tshirt-factory/many-fabric.png",
		},
		{
			text: "พร้อมให้คุณสกรีนลายเสื้อแบบครบจบในที่เดียว",
			image: "/tshirt-factory/screen-all-in-one.png",
		},
		{
			text: "มีรีวิวจากสินค้าจริงให้คุณได้ตัดสินใจก่อนการสั่งซื้อกับโรงงานผลิตเสื้อ",
			image: "/tshirt-factory/real-review.png",
		},
	])
</script>
<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
		<div v-for="item in data" :key="item.text">
			<NuxtImg
				class="object-cover w-full h-full rounded-xl mb-1"
				:src="item.image"
				:alt="item.text"
				format="webp"
				loading="lazy"
				placeholder
			/>
			<p class="text-center text-lg text-primary">{{ item.text }}</p>
		</div>
	</div>
</template>
