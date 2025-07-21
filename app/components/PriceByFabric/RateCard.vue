<script setup lang="ts">
	import type { PriceByFabricPriceList } from "@/types/priceList"

	// PROPS
	interface Props {
		data: PriceByFabricPriceList
	}
	const { data } = defineProps<Props>()
</script>
<template>
	<div class="border border-stone-300 bg-stone-50 p-3 rounded-lg">
		<p v-if="data.maxOrder !== null" class="text-stone-700 leading-none">
			สั่งตั้งแต่ {{ data.minOrder }} - {{ data.maxOrder }} ตัว
		</p>
		<p v-else class="text-stone-700 leading-none">
			สั่งตั้งแต่ {{ data.minOrder - 1 }} ตัวขึ้นไป
		</p>

		<p v-if="data.price" class="text-primary font-bold font-stretch-condensed text-3xl">
			{{ data.price }} บาท<span class="text-base">ต่อตัว</span>
		</p>
		<LineLink v-else>
			<p class="text-primary font-bold font-stretch-condensed text-3xl underline">
				สอบถามราคา
			</p>
		</LineLink>

		<div class="flex flex-col gap-2">
			<div
				v-for="attribute in data.attributes"
				:key="attribute.label"
				class="text-stone-500 flex gap-1 items-center"
			>
				<Icon name="lucide:check" size="0.75rem" />
				<p class="text-sm">
					{{ attribute.label }}
				</p>
			</div>
		</div>
	</div>
</template>
