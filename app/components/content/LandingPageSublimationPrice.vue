<script setup lang="ts">
	// VARIALBE
	const items = [
		{
			title: "การพิมพ์ (Sublimation)",
			description:
				"กระบวนการพิมพสกรีนอีกรูปแบบหนึ่ง ที่ไดรับความนิยมเป็นอยางสูง โดยใช้ ความร้อนเข้ามาทำใหน้ำหมึกซึมเขาไปในเนื้อผ้า นิยมทำเปนเสื้อกีฬา",
			image: "/produce-tshirt/sublimation.png",
			alt: "ราคางาน Sublimation",
		},
	]
</script>

<template>
	<div class="space-y-5">
		<div
			class="block sm:grid md:block sm:grid-cols-2 sm:gap-5 md:gap-0 space-y-5 sm:space-y-0 md:space-y-5"
		>
			<Card v-for="item in items" :key="item.title" class="shadow" horizontal>
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
