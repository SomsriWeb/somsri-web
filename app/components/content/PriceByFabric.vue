<script setup lang="ts">
	import FabricButton from "@/components/PriceByFabric/FabricButton.vue"
	import RateCard from "@/components/PriceByFabric/RateCard.vue"
	import type { PriceByFabricPriceList } from "~/types/priceList"
	import FabricButtonContent from "@/components/PriceByFabric/FabricButtonContent.vue"
	import type { FabricsCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		type: "tshirt" | "polo" | "sweater" | "jacket" | "coat" | "dress" | "other"
	}
	const { type } = defineProps<Props>()

	// VARIABLE
	const { data } = await useAsyncData("fabrics", () => {
		return queryCollection("fabrics").path(type).order("labelEn", "ASC").all()
	})
	const { data: priceLists } = await useAsyncData("priceLists", () => {
		return queryCollection("priceLists").all()
	})
	const fabrics = data.value?.filter((fabric) => fabric.forProductType.includes(type)) || []
	const activeFabric = ref<string>(data.value?.[0]?.labelEn ?? "")

	// COMPUTED
	const activeFabricData = computed(() => {
		return fabrics.find(
			(fabric) => fabric.labelEn === activeFabric.value
		) as FabricsCollectionItem
	})

	// FUNCTION
	function generateKey(fabricId: string, priceList: PriceByFabricPriceList) {
		return `${fabricId}-${priceList.minOrder}-${priceList.maxOrder}`
	}

	function getPriceListFromFabricId(fabricId: string) {
		const productPriceList = priceLists.value?.find((priceList) => priceList.productId === type)
		return productPriceList?.prices.find((price) => price.fabricId === fabricId)
	}
</script>

<template>
	<div class="rounded-xl border border-stone-300 overflow-hidden space-y-5 p-3">
		<div class="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
			<FabricButton
				v-for="fabric in fabrics"
				:key="fabric.id"
				:data="fabric"
				:active="activeFabric === fabric.labelEn"
				@click="activeFabric = fabric.labelEn"
			/>
		</div>

		<USelectMenu
			v-model="activeFabric"
			value-key="labelEn"
			:items="fabrics"
			class="w-full lg:hidden"
		>
			<FabricButtonContent :data="activeFabricData" />
			<template #item="{ item }">
				<FabricButtonContent :data="item" />
			</template>
		</USelectMenu>

		<div
			v-for="fabric in fabrics"
			:key="fabric.id"
			:class="{ hidden: activeFabric !== fabric.labelEn }"
		>
			<h3 class="text-2xl font-bold font-stretch-condensed uppercase text-stone-700 mb-3">
				ผ้า {{ fabric.labelEn }}
			</h3>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
				<RateCard
					v-for="rate in getPriceListFromFabricId(fabric.uid)?.lists"
					:key="generateKey(fabric.id, rate)"
					:data="rate"
				/>
			</div>
		</div>

		<LineLink>
			<UButton class="font-bold">สั่งผลิตเลย</UButton>
		</LineLink>
	</div>
</template>
