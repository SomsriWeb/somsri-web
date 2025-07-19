<script setup lang="ts">
	// PROPS
	interface Props {
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { titleAsTag = "h2" } = defineProps<Props>()

	// VARIABLE
	const { data } = await useAsyncData("what-cost-saving", () =>
		queryCollection("whatCostSaving").order("order", "ASC").all()
	)
</script>

<template>
	<Container
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 bg-primary"
		no-space
	>
		<component
			:is="titleAsTag"
			class="sm:col-span-2 md:col-span-full lg:col-span-1 font-bold text-white text-4xl leading-none"
			><slot name="title" mdc-unwrap="p">เลือก Somsri แล้วดียังไง? </slot></component
		>

		<div
			v-for="item in data"
			:key="item.label"
			class="flex flex-col justify-start items-center"
		>
			<ProseImg v-if="item.image" :src="item.image" :alt="item.label" class="max-w-[4rem]" />
			<p
				class="font-bold font-stretch-condensed text-xl text-white leading-none text-center mt-3"
			>
				{{ item.label }}
			</p>
		</div>
	</Container>
</template>
