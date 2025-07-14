<script setup lang="ts">
	// PROPS
	interface Props {
		col1Class?: string
		col2Class?: string
	}

	const props = defineProps<Props>()
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<div :class="props.col1Class">
			<slot name="col-1" />
		</div>
		<div :class="props.col2Class">
			<slot name="col-2" />
		</div>
	</div>
</template>
