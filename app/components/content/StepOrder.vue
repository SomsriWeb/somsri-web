<script setup lang="ts">
	const { data: step } = await useAsyncData("step", () =>
		queryCollection("stepOrder").order("order", "ASC").all()
	)
</script>

<template>
	<section class="pb-16">
		<h2 class="text-primary text-1xl md:text-4xl font-bold text-center mb-5">
			ขั้นตอนการสั่งซื้อ
		</h2>
		<div class="grid grid-rows-1 gap-3">
			<div v-for="(item, index) in step" :key="index" class="flex flex-col items-center">
				<ProseImg :src="item.image" :alt="item.name" class="max-w-md object-contain" />
			</div>
		</div>
	</section>
</template>
