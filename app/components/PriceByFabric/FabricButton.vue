<script setup lang="ts">
	import type { FabricsCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		data: FabricsCollectionItem
		active?: boolean
	}
	const props = withDefaults(defineProps<Props>(), {
		active: false,
	})
	const { data, active } = toRefs(props)
</script>

<template>
	<button
		class="border-2 border-stone-300 rounded-lg p-1 cursor-pointer transition"
		:class="{ '!border-primary': active }"
	>
		<FabricButtonContent :data="data" />
	</button>
</template>
