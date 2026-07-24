// server/api/__sitemap__/blog.ts
import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/nitro"

export default defineSitemapEventHandler(async (e) => {
	const posts = await queryCollection(e, "blog").all() // คอลเลกชัน 'blog'
	console.info(`[sitemap] blog source returned ${posts.length} URLs`)

	if (posts.length === 0) {
		throw new Error("[sitemap] blog source is empty during build")
	}

	return posts.map((d) =>
		asSitemapUrl({
			loc: d.path,
			lastmod: new Date(),
		})
	)
})
