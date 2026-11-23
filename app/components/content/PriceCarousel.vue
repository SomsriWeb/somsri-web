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

	const { locale } = useI18n()

	// COMPUTED
	// หน้าอังกฤษ: ใช้ฟิลด์ *-en ถ้ามี
	const activePriceData = computed(() => {
		const item = priceData.value?.find((item) => item.uid === id)
		if (!item || locale.value !== 'en') return item
		return {
			...item,
			name: item['name-en'] ?? item.name,
			conditions: item.conditions.map((condition) => ({ ...condition, text: condition['text-en'] ?? condition.text })),
			priceLists: item.priceLists.map((priceList) => ({ ...priceList, fabricName: priceList['fabricName-en'] ?? priceList.fabricName })),
		}
	})
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
