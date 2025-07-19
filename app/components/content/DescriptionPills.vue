<script setup lang="ts">
	// PROPS
	interface Props {
		slot?: number
	}
	const { slot = 1 } = defineProps<Props>()
</script>
<template>
	<div class="rounded-full flex flex-wrap border-[3px] border-primary text-primary">
		<div
			v-for="i in slot"
			:key="i"
			class="p-0.5 px-3 min-w-full sm:min-w-[8rem] text-center"
			:class="{ 'border-b-[3px] sm:border-r-[3px] sm:border-b-0 border-primary': i !== slot }"
		>
			<slot :name="`slot-${i}`" />
		</div>
	</div>
</template>
