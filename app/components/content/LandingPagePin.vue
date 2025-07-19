<script setup lang="ts">
	// VARIALBE
	const items = [
		{
			title: "ปักธรรมดา",
			advantage: "สามารถปักลงบนผ้าได้หลายชนิด ทำให้งานโลโก้หรืออักษรดูสวยงาม",
			disadvantage:
				"ถ้าแบบมีการไล่เฉดสีหรือขนาดฟอนต์เล็กมากจนเกินไป จะไม่สามารถเก็บส่วนรายละเอียดงานได้หมด ซึ่งจะทำให้งานปักไม่สวยงามดูยึกยือและไม่คมชัด",
			image: "/produce-tshirt/pin.png",
		},
		{
			title: "ปักทรานส์เฟอร์",
			advantage:
				"งานปัก HD จะมีความสวยงาม เนื้อเนียน ละเอียด โดดเด่นคมชัดแม้จะตัวอักษรเล็กมากก็ตาม นอกจากนี้ยังสามารถไล่เฉดได้ ไม่จำกัดสีอีกด้วย",
			disadvantage: "จะต้องเป็นงานที่อยู่บนพื้นทึบเท่านั้น จึงสามารถทำได้",
			image: "/produce-tshirt/transfer.png",
		},
	]
</script>

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
				<ProseP class="!text-primary leading-none">ข้อดี: {{ item.advantage }}</ProseP>
				<ProseP class="!text-primary leading-none"
					>ข้อจำกัด: {{ item.disadvantage }}</ProseP
				>
			</div>
		</Card>

		<div class="sm:col-span-full">
			<ProseH3 class="text-xl text-center" as="p">
				งานปักจะประเมินราคาตามจำนวน ขนาด และสีไหมปัก
				สามารถส่งแบบมาให้แอดมินประเมินทางแชทไลน์ได้เลยนะคะ
			</ProseH3>
			<ProseP class="text-center text-lg !text-primary">
				***งานปักไม่แนะนำให้ใช้กับผ้ากีฬา เนื่องจากตัวผ้าลื่น งานปักจะทำให้ผ้าย่นได้***
			</ProseP>
		</div>
	</div>
</template>
