<script setup lang="ts">
	const { data: screens } = await useAsyncData("data-screens", () => {
		return queryCollection("screen").order("order", "ASC").all()
	})
</script>

<template>
	<div class="px-[4.6rem] py-[3rem]">
		<h2 class="text-primary text-[4rem] leading-none font-bold">ผลงานจากสมศรี</h2>
		<p class="text-stone-500 font-light mb-5">
			ไม่ว่าจะเป็น เสื้อยูนิฟอร์ม เสื้อองค์กร เสื้อทีม เสื้อกีฬา เสื้อสัมมนา
			มีรับประกันงานสกรีนเสื้อและงานปักทุกตัว
			การันตีได้ว่าสั่งผลิตเสื้อกับเราไม่มีผิดหวังแน่นอน คิดถึงงานที่ดีมีคุณภาพ คิดถึงสมศรี
		</p>

		<div class="grid grid-cols-4 gap-5 mb-5">
			<HomePortfolioCard
				v-for="screen in screens"
				:key="screen.name"
				:name="screen.name"
				:url="screen.url"
				:image="screen.image"
			/>
		</div>
	</div>
</template>
