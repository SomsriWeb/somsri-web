// server/api/__sitemap__/blog.ts
import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/nitro"

export default defineSitemapEventHandler(async (e) => {
	const posts = await queryCollection(e, "blog").all() // คอลเลกชัน 'blog'
	return posts.map((d) =>
		asSitemapUrl({
			loc: d.path,
			lastmod: new Date(),
		})
	)
})
