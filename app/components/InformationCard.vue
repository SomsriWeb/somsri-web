<script setup lang="ts">
	// PROPS
	interface Props {
		title: string
		description: string
		image: string
	}
	defineProps<Props>()

	// EMITS
	type Emit = {
		actionClick: []
	}
	defineEmits<Emit>()
</script>
<template>
	<div class="rounded-xl overflow-hidden bg-stone-100 p-5 h-full">
		<img :src="image" alt="" class="max-w-[50px] mb-3" />
		<h3 class="text-black text-3xl font-bold leading-9 mb-3">{{ title }}</h3>
		<p class="text-2xl text-stone-500 font-light">{{ description }}</p>
	</div>
</template>
