<script setup lang="ts">
	// VARIABLE
	const data = ref([
		{
			title: "กลุ่มศิลปิน",
			description:
				"ไม่ว่าจะเป็น กลุ่มลูกค้าศิลปินอย่าง Tattoo Colour ที่สั่งทำเสื้อกับโรงงานผลิตเสื้อสมศรีและใช้รูปแบบการรีดร้อน DFT ศิลปิน Bonnadol สั่งผลิตเสื้อยืดใช้การสกรีนฮาฟโทน ศิลปิน Polycat ที่สั่งผลิตกระเป๋าสกรีนลายและศิลปินอื่นๆ อีกมากมายที่สั่งผลิตกับสมศรี",
			image: "/tshirt-factory/portfolio/artist.png",
			link: {
				label: "ดูรายละเอียด",
				to: "/tshirt",
			},
		},
		{
			title: "กลุ่มองค์กรชั้นนำ",
			description:
				"กลุ่มลูกค้าองค์กรชั้นนำ เช่น Flash Express สั่งผลิตเสื้อโปโลและพิมพ์ลาย sublimation องค์กร DAIKIN สั่งผลิตเสื้อโปโลแบบปัก HONDA สั่งผลิตเสื้อยืดแบบพิมพ์ sublimation เป็นต้น และองค์กรชั้นนำอื่นๆ อีกมากมายที่ใช้บริการกับโรงงานผลิตเสื้อ สมศรีมีเสื้อ หากสนใจสั่งผลิตเสื้อโปโล เสื้อบริษัท กับสมศรี สามารถดูรายละเอียดและสั่งซื้อมีเสื้อได้ที่นี่",
			image: "/tshirt-factory/portfolio/organization.jpg",
			link: {
				label: "รับผลิตเสื้อโปโล",
				to: "/polo",
			},
		},
		{
			title: "กลุ่มลูกค้าทั่วไป",
			description:
				"กลุ่มลูกค้าทั่วไป ที่สั่งผลิตเสื้อหลากหลายรูปแบบทั้งเสื้อโปโลแบบปัก เสื้อยืดแบบปัก เสื้อยืดสกรีน เสื้อยืดแบบรีดร้อน DFT เสื้อยืดแขนกุดสกรีน ไปจนถึงหน้ากากผ้าอนามัยแบบสกรีนกับโรงงานผลิตเสื้อของเรา",
			image: "/tshirt-factory/portfolio/general.png",
			link: {
				label: "ดูรายละเอียด",
				to: "/tshirt",
			},
		},
	])
</script>
<template>
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
		<div
			v-for="item in data"
			:key="item.title"
			class="bg-stone-50 border border-stone-300 rounded-lg p-3 space-y-3"
		>
			<ProseH3>{{ item.title }}</ProseH3>
			<ProseP>{{ item.description }}</ProseP>
			<NuxtImg
				:src="item.image"
				:alt="item.title"
				class="aspect-square object-cover rounded-lg w-full"
				format="webp"
				placeholder
				loading="lazy"
			/>
			<LinkButton :to="item.link.to">{{ item.link.label }}</LinkButton>
		</div>
	</div>
</template>
