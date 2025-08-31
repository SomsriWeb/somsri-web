// server/api/__sitemap__/page.ts
import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/nitro"

export default defineSitemapEventHandler(async (e) => {
	const docs = await queryCollection(e, "content").all() // คอลเลกชัน 'page'
	return docs.map((d) =>
		asSitemapUrl({
			loc: d.path, // v3: ใช้ path
			lastmod: new Date(), // v3: ใช้ updatedAt
		})
	)
})
