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
			class="font-bold text-4xl lg:text-6xl leading-none text-primary font-stretch-condensed"
		>
			<slot name="title" mdc-unwrap="p">ขั้นตอนการสั่งผลิต</slot>
		</component>
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
			<div v-for="(item, index) in data" :key="item.label" class="flex flex-col items-center">
				<ProseImg
					v-if="item.image"
					class="max-w-[3rem] md:max-w-[5rem]"
					:src="item.image"
					:alt="item.label"
				/>
				<div class="flex items-start mt-3">
					<p
						class="font-bold font-stretch-condensed text-md md:text-xl bg-primary aspect-square w-5 h-5 flex items-center justify-center rounded-full text-white mr-2"
					>
						{{ index + 1 }}
					</p>
					<div>
						<p
							class="font-bold font-stretch-condensed text-primary text-md md:text-xl leading-none text-center"
						>
							{{ item.label }}
						</p>
						<p
							v-if="item.description"
							class="text-primary text-xs leading-none text-center"
						>
							{{ item.description }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<ProseP class="!text-primary font-stretch-condensed !font-bold text-center text-xl mt-5"
			>**ทางเรามีบริการ QC & Pack อย่างดี รับประกันคุณภาพสูง**
		</ProseP>
	</div>
</template>
