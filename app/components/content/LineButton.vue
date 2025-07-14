<script setup lang="ts">
	import { LINE_LINK } from "~/lib/lineLink"

	// INJECT
	const lineLink = inject<string>(LINE_LINK)
</script>
<template>
	<NuxtLink :to="lineLink" external>
		<slot />
	</NuxtLink>
</template>
