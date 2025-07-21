<script setup lang="ts">
	// PROPS
	interface Props {
		image: string
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { image, titleAsTag = "h1" } = defineProps<Props>()
</script>

<template>
	<Container class="bg-primary grid grid-cols-1 lg:grid-cols-2 gap-5">
		<div class="text-white">
			<component
				:is="titleAsTag"
				class="font-bold text-7xl text-center md:text-left leading-none"
				><slot name="title" mdc-unwrap="p"
			/></component>
			<p
				v-if="$slots['secondary-title']"
				class="font-bold font-stretch-condensed text-2xl text-center md:text-left leading-none"
			>
				<slot name="secondary-title" mdc-unwrap="p" />
			</p>
			<p
				v-if="$slots.description"
				class="font-light text-2xl text-center md:text-left leading-none"
				name="description"
				mdc-unwrap="p"
			>
				<slot name="description" mdc-unwrap="p" />
			</p>

			<div v-if="$slots.default" class="mt-3">
				<slot />
			</div>

			<div class="mt-3 flex justify-center md:justify-start">
				<slot name="cta">
					<LineLink>
						<UButton color="neutral">ปรึกษาฟรี</UButton>
					</LineLink>
				</slot>
			</div>
		</div>
		<ProseImg
			:src="image"
			class="rounded-xl aspect-square object-cover lg:aspect-auto lg:object-contain"
		/>
	</Container>
</template>
