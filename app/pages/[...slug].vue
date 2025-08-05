<script setup lang="ts">
	import { LINE_LINK } from "~/lib/lineLink"

	const route = useRoute()

	const { data: page } = await useAsyncData("page-" + route.path, () => {
		return queryCollection("content").path(route.path).first()
	})

	if (!page.value) {
		throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
	}

	// console.log(page.value)

	provide(LINE_LINK, page.value.lineLink)
</script>

<template>
	<div v-if="page">
		<NuxtLayout :name="page.activeNavbar ? 'color' : 'default'">
			<Metadata :page="page" />
			<ContentRenderer class="space-y-[2rem]" :value="page" />
		</NuxtLayout>
	</div>
</template>
