<script setup lang="ts">
	import type { PriceByFabricPriceList } from "@/types/priceList"

	// PROPS
	interface Props {
		data: PriceByFabricPriceList
	}
	const { data } = defineProps<Props>()

	const { t, locale } = useI18n({ useScope: 'local' })

	// หน้าอังกฤษ: ใช้ label-en ถ้ามี
	function attributeLabel(attribute: { label: string; 'label-en'?: string }) {
		return locale.value === 'en' ? (attribute['label-en'] ?? attribute.label) : attribute.label
	}
</script>

<i18n lang="json">
{
	"th": {
		"range": "สั่งตั้งแต่ {min} - {max} ตัว",
		"rangeUp": "สั่งตั้งแต่ {min} ตัวขึ้นไป",
		"currency": "บาท",
		"perPiece": "ต่อตัว",
		"askPrice": "สอบถามราคา"
	},
	"en": {
		"range": "Order {min} - {max} pcs",
		"rangeUp": "Order {min}+ pcs",
		"currency": "THB",
		"perPiece": " / piece",
		"askPrice": "Ask for a quote"
	}
}
</i18n>
<template>
	<div class="border border-stone-300 bg-stone-50 p-3 rounded-lg">
		<p v-if="data.maxOrder !== null" class="text-stone-700 leading-none">
			{{ t('range', { min: data.minOrder, max: data.maxOrder }) }}
		</p>
		<p v-else class="text-stone-700 leading-none">
			{{ t('rangeUp', { min: data.minOrder - 1 }) }}
		</p>

		<p v-if="data.price" class="text-primary font-bold font-stretch-condensed text-3xl">
			{{ data.price }} {{ t('currency') }}<span class="text-base">{{ t('perPiece') }}</span>
		</p>
		<LineLink v-else>
			<p class="text-primary font-bold font-stretch-condensed text-3xl underline">
				{{ t('askPrice') }}
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
					{{ attributeLabel(attribute) }}
				</p>
			</div>
		</div>
	</div>
</template>
