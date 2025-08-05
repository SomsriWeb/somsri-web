<script setup lang="ts">
	import type { BlogCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		blog: BlogCollectionItem
	}
	const { blog } = defineProps<Props>()

	// VARIABLE
	const ui = {
		header: "p-0 sm:p-0",
		body: "sm:p-3",
	}
</script>

<template>
	<UCard :ui="ui">
		<template #header>
			<ProseImg :src="blog.image" :alt="blog.title" />
		</template>

		<NuxtLink :to="blog.path">
			<h2 class="text-xl font-bold text-primary leading-none">{{ blog.title }}</h2>
		</NuxtLink>
		<ProseP>{{ blog.date }}</ProseP>
	</UCard>
</template>
