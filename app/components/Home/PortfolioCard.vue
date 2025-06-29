<script setup lang="ts">
	// PROPS
	interface Props {
		name: string
		url: string
		image: string
	}
	defineProps<Props>()
</script>
<template>
	<div class="relative rounded-xl overflow-hidden">
		<img :src="image" alt="" class="w-full h-full aspect-ratio--5x7 object-cover" />
		<div class="absolute inset-0 bg-black/15" />
		<h3 class="absolute top-5 left-5 text-white text-4xl">{{ name }}</h3>
		<UButton
			color="neutral"
			variant="outline"
			class="!text-primary absolute bottom-5 right-5 rounded-full !min-w-fit"
			icon="lucide:plus"
		/>
	</div>
</template>
