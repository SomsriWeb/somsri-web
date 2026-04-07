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
		body: "sm:p-3 flex flex-col justify-between",
	}
</script>

<template>
	<UCard :ui="ui" class="shadow hover:scale-105 transition duration-300">
		<template #header>
			<div class="aspect-4/3 overflow-hidden">
				<ProseImg :src="blog.image" :alt="blog.title" class="h-full w-full object-cover" />
			</div>
		</template>

		<NuxtLink :to="blog.path">
			<h2 class="text-xl font-bold text-primary leading-none">{{ blog.title }}</h2>
		</NuxtLink>
		<ProseP>{{ blog.date }}</ProseP>
		<NuxtLink :to="blog.path" class="block w-full text-left">
			<UButton variant="link" color="primary" class="justify-start! px-0 text-stone-600">อ่านต่อ</UButton>
		</NuxtLink>
	</UCard>
</template>
