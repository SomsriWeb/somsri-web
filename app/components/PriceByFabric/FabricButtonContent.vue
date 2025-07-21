<script setup lang="ts">
	import type { FabricsCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		data: FabricsCollectionItem
	}
	const props = defineProps<Props>()
	const { data } = toRefs(props)
</script>

<template>
	<div class="flex items-center gap-2">
		<ProseImg
			:src="data.image"
			:alt="data.labelEn"
			class="max-w-[1.5rem] rounded-[5px]"
			width="50"
		/>
		<p class="font-stretch-condensed font-medium text-sm uppercase leading-none">
			{{ data.labelEn }}
		</p>
	</div>
</template>
