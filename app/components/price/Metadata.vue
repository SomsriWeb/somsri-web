<script setup lang="ts">
	import type { PriceCarouselCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		priceData: PriceCarouselCollectionItem
	}
	const { priceData } = defineProps<Props>()
</script>
<template>
	<div>
		<ProseH2 class="mb-2 text-center">{{ priceData.name }}</ProseH2>
		<img :src="priceData.imageUrl" :alt="priceData.name" class="w-full mb-2" />
		<ul class="list-disc list-inside">
			<li
				v-for="condition in priceData.conditions"
				:key="condition.text"
				class="text-primary leading-none"
			>
				{{ condition.text }}
			</li>
		</ul>
	</div>
</template>
