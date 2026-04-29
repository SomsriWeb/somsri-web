<script setup lang="ts">
	import type { PriceList } from "~/types/priceList"

	// PROPS
	interface Props {
		priceLists: PriceList
	}
	const { priceLists } = defineProps<Props>()

	// COMPUTED
	const loopedRates = computed(() => priceLists.rates.slice(1))
</script>

<template>
	<div
		class="rounded-xl border-2 border-primary overflow-hidden bg-primary h-full flex flex-col"
	>
		<h3 class="text-center text-white bg-primary font-bold px-2 py-1 text-lg leading-tight min-h-14 flex items-center justify-center">
			{{ priceLists.fabricName }}
		</h3>
		<div class="bg-white flex flex-col gap-0.5 items-center p-1 min-h-36 justify-center">
			<p class="text-primary">เริ่มต้นที่</p>
			<p class="text-primary text-5xl font-bold inline-flex items-baseline justify-center gap-x-1 whitespace-nowrap">
				{{ priceLists.rates[0]?.price || "สอบถามราคา"}}
				<span v-if="priceLists.rates[0]?.price" class="text-sm text-stone-800 shrink-0">THB</span>
			</p>
			<p class="text-primary min-h-5">
				({{ priceLists.rates[0]?.min }} - {{ priceLists.rates[0]?.max }} ตัว)
			</p>
		</div>
		<div class="space-y-1 text-white flex-1">
			<div
				v-for="rate in loopedRates"
				:key="rate.min"
				class="flex justify-between gap-3 items-center px-2 py-1 min-h-15"
			>
				<div class="min-h-10 flex flex-col justify-center">
					<p class="leading-none">จำนวน(ตัว)</p>
					<p v-if="rate.max" class="font-bold leading-none">
						{{ rate.min }} - {{ rate.max }}
					</p>
					<p v-else class="font-bold leading-none">{{ rate.min }}+</p>
				</div>
				<p
					class="font-bold leading-none text-right inline-flex items-baseline justify-end gap-x-1 whitespace-nowrap shrink-0"
					:class="[rate.price ? 'text-3xl' : 'text-sm']"
				>
					{{ rate.price || "สอบถามราคา"}}
					<span v-if="rate.price" class="text-xs font-normal shrink-0">THB</span>
				</p>
			</div>
		</div>
	</div>
</template>
