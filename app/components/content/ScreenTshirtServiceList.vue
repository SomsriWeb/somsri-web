<script setup lang="ts">
	// PROPS
	interface Props {
		items: number
	}
	const props = defineProps<Props>()
</script>
<template>
	<div class="space-y-3">
		<div>
			<slot v-if="$slots.title" name="title" />
			<slot v-if="$slots.description" name="description" />
		</div>

		<div v-for="i in props.items" :key="i" class="rounded-xl p-2 bg-primary text-white">
			<slot :name="`item-${i}`" />
		</div>
	</div>
</template>
