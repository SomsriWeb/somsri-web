<script lang="ts" setup>
	// PROPS
	interface Props {
		color: string
	}
	const props = defineProps<Props>()
	const { color } = toRefs(props)

	// VARIABLE
	const colorCode = `#${color.value}`
</script>
<template>
	<button
		type="button"
		class="rounded-full border-2 border-white aspect-square w-full h-full cursor-pointer"
		:style="{ backgroundColor: colorCode }"
	/>
</template>
