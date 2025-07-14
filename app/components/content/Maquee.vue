<script setup lang="ts">
	interface Props {
		duration?: number
	}

	const props = withDefaults(defineProps<Props>(), {
		duration: 40,
	})
</script>

<template>
	<Vue3Marquee class="rounded-xl flex" :duration="props.duration">
		<slot />
	</Vue3Marquee>
</template>
