<script setup lang="ts">
	// PROPS
	interface Props {
		as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
	}

	// PROPS
	const props = withDefaults(defineProps<Props>(), {
		as: "h3",
	})
</script>

<template>
	<component :is="props.as" :class="`text-primary text-3xl leading-none font-bold`"
		><slot mdc-unwrap="h3 p"
	/></component>
</template>
