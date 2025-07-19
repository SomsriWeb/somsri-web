<script setup lang="ts">
	// VARIALBE
	const items = [
		{
			title: "เทคนิค CMYK (Offset)",
			advantage:
				"ลักษณะการทำงาน แบบ 4 สี คือ ไม่ว่าสี ที่เราต้องการสกรีนจะเยอะแค่ไหน การทำแบบแม่พิมพ์จะไม่เกิน 6 บล็อก (2 บล็อกที่เพิ่มมาคือ ขาวรอง พื้น และ ขาวไฮไลท์ ในกรณีเสื้อสี หรือสีดำ) เหมาะกับ งานที่ไม่ละเอียดมากหนัก สามารถประหยัดแม่พิมพ์ได้ เหมาะสำหรับ ภาพวิว ภาพวาด หรือภาพเหมือน",
			disadvantage:
				"เนื่องจากการเรียงตัวของเม็ดสกรีน ซ้อนทับกันรายละเอียดที่ได้ อาจทำให้สีผิด เพี้ยนหรือหากสังเกตใกล้ ๆ ในงานสีอาจมีความหม่นหมองดูไม่สวยงาม",
			image: "/produce-tshirt/cmyk.png",
		},
		{
			title: "เทคนิค Halftone",
			advantage:
				"เหมาะมากสำหรับงานที่ต้องการสีที่กลมกลืนกันอย่างลงตัว (การไล่สี) เพราะเทคนิคนี้จะทำให้เสื้อสกรีนออกมาเหมือนเราได้ไล่น้ำหนักของภาพ เช่น สกรีน ภาพเหมือน ข้อดีของเทคนิค นี้ในการสกรีนแบบนี้ก็คือจะได้สีที่สดและใกล้เคียงกับต้นฉบับมากที่สุด",
			disadvantage: "ผิวสัมผัสไม่เรียบเนียน",
			image: "/produce-tshirt/halftone.png",
		},
	]
</script>

<template>
	<div class="space-y-5">
		<Card v-for="item in items" :key="item.title" class="shadow" horizontal>
			<ProseImg
				:src="item.image"
				class="rounded-lg max-w-[10rem] aspect-square object-cover"
			/>
			<div>
				<ProseH4 class="mb-3">{{ item.title }}</ProseH4>
				<ProseP class="!text-primary leading-none">ข้อดี: {{ item.advantage }}</ProseP>
				<ProseP class="!text-primary leading-none"
					>ข้อจำกัด: {{ item.disadvantage }}</ProseP
				>
			</div>
		</Card>
	</div>
</template>
