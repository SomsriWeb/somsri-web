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
	<div class="relative rounded-2xl overflow-hidden">
		<img :src="image" alt="" class="w-full h-full aspect-square object-cover" />
		<div class="absolute inset-0 bg-black/15" />
		<div
			class="absolute bottom-10 left-0 right-0 p-5 flex justify-between items-center flex-col"
		>
			<h3 class="text-white text-4xl font-bold mb-1">{{ name }}</h3>
			<NuxtLink :to="url">
				<UButton color="neutral" class="!text-primary">ดูเพิ่มเติม</UButton>
			</NuxtLink>
		</div>
	</div>
</template>
