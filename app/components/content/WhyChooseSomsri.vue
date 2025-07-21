<script setup lang="ts">
	// PROPS
	interface Props {
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { titleAsTag = "h2" } = defineProps<Props>()

	// VARIABLE
	const { data } = await useAsyncData("why-choose-somsri", () =>
		queryCollection("whyChooseSomsri").order("order", "ASC").all()
	)
</script>

<template>
	<Container class="bg-primary" no-space>
		<component :is="titleAsTag" class="font-bold text-white text-4xl mb-5 leading-none"
			><slot name="title" mdc-unwrap="p">เลือก Somsri แล้วดียังไง? </slot></component
		>

		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
			<div
				v-for="item in data"
				:key="item.label"
				class="flex flex-col justify-start items-center"
			>
				<ProseImg
					v-if="item.image"
					:src="item.image"
					:alt="item.label"
					class="max-w-[4rem]"
				/>
				<p
					class="font-bold font-stretch-condensed text-xl text-white leading-none text-center mt-3"
				>
					{{ item.label }}
				</p>
			</div>
		</div>
	</Container>
</template>
