<script setup lang="ts">
	// PROPS
	interface Props {
		as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
	}

	// PROPS
	const props = withDefaults(defineProps<Props>(), {
		as: "h4",
	})
</script>

<template>
	<component :is="props.as" :class="`text-primary text-2xl leading-none font-bold`"
		><slot mdc-unwrap="h4 p"
	/></component>
</template>
