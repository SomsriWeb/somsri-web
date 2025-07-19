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
		// ogType: isWriting ? "article" : "website",
		// ogUrl: seo.url,
		author: "สมศรีมีเสื้อ",
		title: pageSEO.value.title,
		description: pageSEO.value.description,
		twitterTitle: pageSEO.value.title,
		twitterDescription: pageSEO.value.description,
		twitterCard: "summary_large_image",
	})

	useHead({
		titleTemplate: "%s",
		title: pageSEO.value.title,
	})

	defineOgImage({
		url: "https://somsritshirt.com/og.jpg",
		width: 1200,
		height: 630,
		alt: "สมศรีมีเสื้อ",
	})
</script>
<template>
	<div v-if="$slots.default">
		<div class="max-w-[20rem]" />
		<slot />
	</div>
</template>
