import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/server"

export default defineSitemapEventHandler(async (e) => {
	const posts = await queryCollection(e, "blog").all() // คอลเลกชัน 'blog' 
	console.log(`[sitemap] blog source returned ${posts.length} URLs`)

	if (posts.length === 0) {
		throw new Error(
			"[sitemap] blog source is empty during build. Check that content/blog/*.md is included in the build context.",
		)
	}

	return posts.map((d) =>
		asSitemapUrl({
			loc: d.path,
			lastmod: new Date(),
		}),
	)
})
