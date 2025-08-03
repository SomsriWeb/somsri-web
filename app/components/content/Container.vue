<script setup lang="ts">
	// PROPS
	interface Props {
		noSpace?: boolean
	}
	const { noSpace = false } = defineProps<Props>()
</script>

<template>
	<div class="w-full px-5 md:px-[4.6rem] py-[3rem]" :class="{ 'space-y-8': !noSpace }">
		<slot />
	</div>
</template>
