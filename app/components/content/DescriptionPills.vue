<script setup lang="ts">
	// PROPS
	interface Props {
		slot?: number
		color?: "primary" | "white"
	}
	const { slot = 1, color = "primary" } = defineProps<Props>()
</script>
<template>
	<div
		class="rounded-full flex flex-wrap border-[3px]"
		:class="{
			'border-primary !text-primary': color === 'primary',
			'border-white !text-white': color === 'white',
		}"
	>
		<div
			v-for="i in slot"
			:key="i"
			class="p-0.5 px-3 min-w-full sm:min-w-[8rem] text-center"
			:class="{
				'border-b-[3px] sm:border-r-[3px] sm:border-b-0 border-primary':
					i !== slot && color === 'primary',
				'border-b-[3px] sm:border-r-[3px] sm:border-b-0 border-white':
					i !== slot && color === 'white',
			}"
		>
			<slot :name="`slot-${i}`" />
		</div>
	</div>
</template>
