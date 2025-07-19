<script setup lang="ts">
	interface Props {
		horizontal?: boolean
	}
	const { horizontal = false } = defineProps<Props>()
</script>

<template>
	<div
		class="rounded-lg p-3 border border-stone-200 space-y-3"
		:class="{ 'flex flex-col md:flex-row gap-3 !space-y-0': horizontal }"
	>
		<slot />
	</div>
</template>
