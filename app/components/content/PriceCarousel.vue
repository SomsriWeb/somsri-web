<script setup lang="ts">
	// PROPS
	interface Props {
		id: string
	}
	const { id } = defineProps<Props>()

	// VARIABLE
	const { data: priceData } = await useAsyncData(`priceCarousel`, () =>
		queryCollection("priceCarousel").order("order", "ASC").all()
	)

	// COMPUTED
	const activePriceData = computed(() => priceData.value?.find((item) => item.uid === id))
</script>

<template>
	<div v-if="activePriceData" class="grid grid-cols-1 sm:grid-cols-8 gap-5">
		<div class="sm:col-span-3 md:col-span-2">
			<PriceMetadata :price-data="activePriceData" />
		</div>
		<div class="sm:col-span-5 md:col-span-6">
			<PriceCarouselList :price-data="activePriceData" />
		</div>
	</div>
</template>
