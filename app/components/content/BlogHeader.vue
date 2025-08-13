<script setup lang="ts">
	// PROPS
	interface Props {
		image: string
		alt: string
		titleAsTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	}
	const { image, alt, titleAsTag = "h1" } = defineProps<Props>()
</script>

<template>
	<div>
		<header class="relative">
			<ProseImg :src="image" :alt="alt" class="!w-screen !h-screen object-cover" />
			<div class="absolute inset-0 bg-black/30" />
			<div class="absolute bottom-[7rem] px-5 md:px-[4.6rem] text-white">
				<component
					:is="titleAsTag"
					class="font-bold text-3xl sm:text-4xl lg:text-6xl leading-none"
					><slot name="title" mdc-unwrap="p"
				/></component>
				<p v-if="$slots['secondary-title']" class="font-bold text-lg lg:text-2xl">
					<slot name="secondary-title" mdc-unwrap="p" />
				</p>
				<p
					v-if="$slots.description"
					class="font-light text-lg lg:text-2xl"
					name="description"
					mdc-unwrap="p"
				>
					<slot name="description" mdc-unwrap="p" />
				</p>

				<div v-if="$slots.default" class="mt-5">
					<slot />
				</div>
			</div>
		</header>
	</div>
</template>
