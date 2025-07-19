<script setup lang="ts">
	// PROPS
	interface Props {
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { titleAsTag = "h2" } = defineProps<Props>()

	// VARIABLE
	const { data } = await useAsyncData("how-to-order", () =>
		queryCollection("howToOrder").order("order", "ASC").all()
	)
</script>
<template>
	<div>
		<component
			:is="titleAsTag"
			class="font-bold text-6xl leading-none text-primary font-stretch-condensed"
		>
			<slot name="title" mdc-unwrap="p" />
		</component>
		<div class="grid grid-cols-4 gap-5">
			<div v-for="item in data" :key="item.label" class="flex flex-col justify-center">
				<ProseImg v-if="item.image" :src="item.image" :alt="item.label" />
				<p
					class="font-bold font-stretch-condensed text-xl text-white leading-none text-center mt-3"
				>
					{{ item.label }}
				</p>
			</div>
		</div>
	</div>
</template>
