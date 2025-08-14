<script setup lang="ts">
	import { LINE_LINK } from "~/lib/lineLink"
	import { USE_NAVBAR } from "~/lib/useNavbar"
	import { USE_FOOTER } from "~/lib/useFooter"
	import { USE_LINE_FLOATING_BUTTON } from "~/lib/useLineFloatingButton"

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
	provide(USE_NAVBAR, page.value.navbar)
	provide(USE_FOOTER, page.value.footer)
	provide(USE_LINE_FLOATING_BUTTON, page.value.lineFloatingButton)
</script>

<template>
	<div v-if="page">
		<NuxtLayout :name="page.activeNavbar || pageType === 'blog' ? 'color' : 'default'">
			<Metadata :page="page" />
			<ContentRenderer v-if="pageType === 'page'" class="space-y-[2rem]" :value="page" />

			<template v-else>
				<BlogHeader :image="page.image" :alt="page.title">
					<template #title>{{ page.title }}</template>
				</BlogHeader>
				<Container>
					<ContentRenderer class="space-y-[2rem]" :value="page" />
				</Container>
			</template>
		</NuxtLayout>
	</div>
</template>
