<script setup lang="ts">
	// PROPS
	interface Props {
		title: string
		description: string
		image: string
		button?: boolean
	}
	withDefaults(defineProps<Props>(), {
		button: true,
	})

	// EMITS
	type Emit = {
		actionClick: []
	}
	defineEmits<Emit>()
</script>
<template>
	<div class="relative rounded-xl overflow-hidden bg-stone-100 p-5 h-full">
		<ProseImg :src="image" alt="" class="max-w-[50px] mb-3" />
		<h3 class="text-black text-2xl font-bold leading-7 mb-3">{{ title }}</h3>
		<p class="text-lg text-stone-500 font-light">{{ description }}</p>
		<UButton
			color="primary"
			class="absolute bottom-3 right-3 rounded-full !min-w-fit"
			icon="lucide:plus"
			size="sm"
		/>
	</div>
</template>
