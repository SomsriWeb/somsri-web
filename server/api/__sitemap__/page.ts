import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/server"

export default defineSitemapEventHandler(async (e) => {
	const docs = await queryCollection(e, "content").all()
	console.log(`[sitemap] page source returned ${docs.length} URLs`)

	if (docs.length === 0) {
		throw new Error(
			"[sitemap] page source is empty during build. Check that content/page/*.md is included in the build context.",
		)
	}

	return docs.map((d) =>
		asSitemapUrl({
			loc: d.path, // v3: ใช้ path
			lastmod: new Date(), // v3: ใช้ updatedAt
		}),
	)
})
