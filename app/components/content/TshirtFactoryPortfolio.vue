<script setup lang="ts">
	// VARIABLE
	const { locale } = useI18n()
	const items = [
		{
			title: "กลุ่มศิลปิน",
			"title-en": "Artists",
			description:
				"ไม่ว่าจะเป็น กลุ่มลูกค้าศิลปินอย่าง Tattoo Colour ที่สั่งทำเสื้อกับโรงงานผลิตเสื้อสมศรีและใช้รูปแบบการรีดร้อน DFT ศิลปิน Bonnadol สั่งผลิตเสื้อยืดใช้การสกรีนฮาฟโทน ศิลปิน Polycat ที่สั่งผลิตกระเป๋าสกรีนลายและศิลปินอื่นๆ อีกมากมายที่สั่งผลิตกับสมศรี",
			"description-en":
				"Artist clients such as Tattoo Colour, who produced shirts at the Somsri factory using DFT heat transfer; Bonnadol, who produced T-shirts with halftone screen printing; Polycat, who produced screen-printed tote bags; and many other artists who produce with Somsri.",
			image: "/tshirt-factory/portfolio/artist.png",
			alt: "โรงงานผลิตเสื้อ ให้กับลูกค้าทุกรูปแบบ",
			"alt-en": "Shirt factory serving every kind of customer",
			link: {
				label: "ดูรายละเอียด",
				"label-en": "View Details",
				to: "/tshirt",
			},
		},
		{
			title: "กลุ่มองค์กรชั้นนำ",
			"title-en": "Leading Organizations",
			description:
				"กลุ่มลูกค้าองค์กรชั้นนำ เช่น Flash Express สั่งผลิตเสื้อโปโลและพิมพ์ลาย sublimation องค์กร DAIKIN สั่งผลิตเสื้อโปโลแบบปัก HONDA สั่งผลิตเสื้อยืดแบบพิมพ์ sublimation เป็นต้น และองค์กรชั้นนำอื่นๆ อีกมากมายที่ใช้บริการกับโรงงานผลิตเสื้อ สมศรีมีเสื้อ หากสนใจสั่งผลิตเสื้อโปโล เสื้อบริษัท กับสมศรี สามารถดูรายละเอียดและสั่งซื้อมีเสื้อได้ที่นี่",
			"description-en":
				"Leading corporate clients such as Flash Express, who produced polo shirts with sublimation printing; DAIKIN, who produced embroidered polo shirts; HONDA, who produced sublimation-printed T-shirts; and many other leading organizations that trust the SomsriTshirt factory. Interested in custom polo shirts or company shirts? See the details and order here.",
			image: "/tshirt-factory/portfolio/organization.jpg",
			alt: "โรงงานผลิตเสื้อ สำหรับกลุ่มองค์กรชั้นนำ",
			"alt-en": "Shirt factory for leading organizations",
			link: {
				label: "รับผลิตเสื้อโปโล",
				"label-en": "Custom Polo Shirts",
				to: "/polo",
			},
		},
		{
			title: "กลุ่มลูกค้าทั่วไป",
			"title-en": "General Customers",
			description:
				"กลุ่มลูกค้าทั่วไป ที่สั่งผลิตเสื้อหลากหลายรูปแบบทั้งเสื้อโปโลแบบปัก เสื้อยืดแบบปัก เสื้อยืดสกรีน เสื้อยืดแบบรีดร้อน DFT เสื้อยืดแขนกุดสกรีน ไปจนถึงหน้ากากผ้าอนามัยแบบสกรีนกับโรงงานผลิตเสื้อของเรา",
			"description-en":
				"General customers who produce a wide range of items with our factory — embroidered polo shirts, embroidered T-shirts, screen-printed T-shirts, DFT heat-transfer T-shirts, screen-printed tank tops, and even screen-printed fabric face masks.",
			image: "/tshirt-factory/portfolio/general.png",
			alt: "โรงงานผลิตเสื้อ สำหรับลูกค้าทั่วไป",
			"alt-en": "Shirt factory for general customers",
			link: {
				label: "ดูรายละเอียด",
				"label-en": "View Details",
				to: "/tshirt",
			},
		},
	]
	const data = computed(() =>
		items.map((item) => {
			const en = locale.value === "en"
			return {
				title: en ? item["title-en"] : item.title,
				description: en ? item["description-en"] : item.description,
				image: item.image,
				alt: en ? item["alt-en"] : item.alt,
				link: {
					label: en ? item.link["label-en"] : item.link.label,
					to: item.link.to,
				},
			}
		})
	)
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
				:alt="item.alt || item.title"
				class="aspect-square object-cover rounded-lg w-full"
				format="webp"
				placeholder
				loading="lazy"
			/>
			<LinkButton :to="item.link.to">{{ item.link.label }}</LinkButton>
		</div>
	</div>
</template>
