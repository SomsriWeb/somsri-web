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
	<div class="relative rounded-xl overflow-hidden bg-stone-100 p-3 sm:p-5 h-full">
		<ProseImg :src="image" alt="" class="max-w-9 sm:max-w-[50px] mb-2 sm:mb-3" />
		<h3 class="text-black text-lg sm:text-2xl font-bold leading-snug mb-2 sm:mb-3">
			{{ title }}
		</h3>
		<p class="text-stone-500 font-light pr-0.5 text-sm sm:text-base leading-snug">
			{{ description }}
		</p>
		<UButton
			color="primary"
			class="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-full min-w-fit! p-1.5! sm:p-2!"
			icon="lucide:plus"
			size="sm"
		/>
	</div>
</template>
