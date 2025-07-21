<script setup lang="ts">
	const { data: Mask } = await useAsyncData("Mask", () =>
		queryCollection("mask").where("order", "IN", [1, 2, 3]).all()
	)
</script>
<template>
	<section class="pb-16">
		<div class="grid grid-rows-1 gap-3">
			<div v-for="(item, index) in Mask" :key="index" class="flex flex-col items-center">
				<ProseImg :src="item.image" :alt="item.name" class="max-w-md" />
			</div>
		</div>
	</section>
</template>
