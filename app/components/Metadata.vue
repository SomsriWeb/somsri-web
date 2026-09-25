<script setup lang="ts">
	import type { ContentCollectionItem } from "@nuxt/content"

	// PROPS
	interface Props {
		page: ContentCollectionItem
	}
	const { page } = defineProps<Props>()

	// COMPUTED
	const pageSEO = computed(() => {
		return {
			title: page.title,
			description: page.description,
		}
	})

	// COMPOSABLES
	useSeoMeta({
		// ogSiteName: seo.title,
		ogTitle: pageSEO.value.title,
		ogDescription: pageSEO.value.description,
		ogImage: "https://somsritshirt.com/og.jpg",
		// ogType: isWriting ? "article" : "website",
		// ogUrl: seo.url,
		author: "สมศรีมีเสื้อ",
		title: pageSEO.value.title,
		description: pageSEO.value.description,
		twitterTitle: pageSEO.value.title,
		twitterDescription: pageSEO.value.description,
		twitterCard: "summary_large_image",
		twitterImage: "https://somsritshirt.com/og.jpg",
		robots: page.noindex ? "noindex" : undefined,
	})

	useHead({
		titleTemplate: "%s",
		title: pageSEO.value.title,
		script:
			page["เพิ่ม script ใน head"]?.map((script) => {
				const { content, ...rest } = script
				return {
					...rest,
					textContent: content,
				}
			}) || [],
	})

</script>
<template>
	<div v-if="$slots.default">
		<div class="max-w-[20rem]" />
		<slot />
	</div>
</template>
