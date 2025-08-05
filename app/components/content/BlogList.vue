<script setup lang="ts">
	import type { BlogCollectionItem } from "@nuxt/content"
	import { v4 as uuidv4 } from "uuid"

	// VARIABLE
	const page = ref<number>(1)
	const ITEMS_PER_PAGE = 10
	const blogs = ref<BlogCollectionItem[]>([])
	const totalBlogs = ref<number>(await getTotalBlogs())
	const maxPages = computed(() => Math.ceil(totalBlogs.value / ITEMS_PER_PAGE))
	const loadmoreRef = useTemplateRef<HTMLDivElement>("loadmoreRef")
	const isLoading = ref<boolean>(false)

	useIntersectionObserver(loadmoreRef, ([entry]) => {
		if (entry?.isIntersecting) {
			loadmore()
		}
	})

	// FUNCTION
	async function getBlogs(): Promise<BlogCollectionItem[]> {
		const key = uuidv4()
		const { data } = await useAsyncData(key, () =>
			queryCollection("blog")
				// .order("date", "DESC")
				.limit(ITEMS_PER_PAGE)
				.skip((page.value - 1) * ITEMS_PER_PAGE)
				.all()
		)
		return data.value ?? []
	}

	async function getTotalBlogs(): Promise<number> {
		const { data } = await useAsyncData("totalBlogs", () => queryCollection("blog").count())
		return data.value ?? 0
	}

	async function loadmore() {
		if (page.value >= maxPages.value) return

		isLoading.value = true
		page.value++
		const newBlogs = await getBlogs()
		blogs.value.push(...newBlogs)
		isLoading.value = false
	}

	blogs.value = await getBlogs()
</script>

<template>
	<div>
		<div class="grid grid-cols-4 gap-3">
			<BlogItem v-for="blog in blogs" :key="blog.id" :blog="blog" />
		</div>

		<div ref="loadmoreRef" class="h-[1px] bg-gray-200 w-full my-5" />
	</div>
</template>
