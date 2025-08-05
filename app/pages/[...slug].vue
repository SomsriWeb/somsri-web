<script setup lang="ts">
	import { LINE_LINK } from "~/lib/lineLink"

	const route = useRoute()
	const pageType = ref<"page" | "blog">("page")

	const { data: page } = await useAsyncData("page-" + route.path, async () => {
		pageType.value = "page"
		let data = await queryCollection("content").path(route.path).first()

		if (!data) {
			data = await queryCollection("blog").path(route.path).first()
			if (data) {
				pageType.value = "blog"
			}
		}

		return data
	})

	if (!page.value) {
		throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
	}

	provide(LINE_LINK, page.value.lineLink)
</script>

<template>
	<div v-if="page">
		<NuxtLayout :name="page.activeNavbar || pageType === 'blog' ? 'color' : 'default'">
			<Metadata :page="page" />
			<ContentRenderer v-if="pageType === 'page'" class="space-y-[2rem]" :value="page" />

			<template v-else>
				<BlogHeader :image="page.image">
					<template #title>{{ page.title }}</template>
				</BlogHeader>
				<Container>
					<ContentRenderer class="space-y-[2rem]" :value="page" />
				</Container>
			</template>
		</NuxtLayout>
	</div>
</template>
