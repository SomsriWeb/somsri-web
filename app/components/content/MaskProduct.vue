<script setup lang="ts">
	const { data: Mask } = await useAsyncData("Mask", () =>
		queryCollection("mask").where("order", "IN", [1, 2, 3]).all()
	)

	const { locale } = useI18n()
	const nameOf = (item: { name: string; "name-en"?: string }) =>
		locale.value === "en" ? (item["name-en"] ?? item.name) : item.name
</script>
<template>
	<section class="pb-16">
		<div class="grid grid-rows-1 gap-3">
			<div v-for="(item, index) in Mask" :key="index" class="flex flex-col items-center">
				<ProseImg :src="item.image" :alt="nameOf(item)" class="max-w-md" />
			</div>
		</div>
	</section>
</template>
