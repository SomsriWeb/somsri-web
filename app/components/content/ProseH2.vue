<script setup lang="ts">
	// PROPS
	interface Props {
		size?: "sm" | "lg"
	}

	// PROPS
	const props = withDefaults(defineProps<Props>(), {
		size: "lg",
	})

	const { size } = toRefs(props)

	// COMPUTED
	const sizeClass = computed(() => {
		switch (size.value) {
			case "sm":
				return "text-xl md:text-3xl"
			case "lg":
				return "text-[1.5rem] md:text-[3rem]"
			default:
				return "text-[2.5rem] md:text-[4rem]"
		}
	})
</script>
<template>
	<h2 class="text-primary leading-none font-bold" :class="sizeClass">
		<slot />
	</h2>
</template>
