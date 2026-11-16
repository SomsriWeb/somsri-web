// server/api/__sitemap__/page.ts
import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/nitro"

const toEnglishPath = (path: string) => (path === "/" ? "/en" : `/en${path}`)

// hreflang สำหรับหน้าที่มีทั้งภาษาไทยและอังกฤษ
const alternativesFor = (path: string) => [
	{ hreflang: "th", href: path },
	{ hreflang: "en", href: toEnglishPath(path) },
	{ hreflang: "x-default", href: path },
]

export default defineSitemapEventHandler(async (e) => {
	const [thDocs, enDocs] = await Promise.all([
		queryCollection(e, "content").select("path").all(), // content/page/
		queryCollection(e, "contentEn").select("path").all(), // content/page-en/
	])
	console.info(`[sitemap] page source returned ${thDocs.length} TH + ${enDocs.length} EN URLs`)

	if (thDocs.length === 0) {
		throw new Error("[sitemap] page source is empty during build")
	}

	const thPaths = new Set(thDocs.map((d) => d.path))
	const enPaths = new Set(enDocs.map((d) => d.path))

	return [
		...thDocs.map((d) =>
			asSitemapUrl({
				loc: d.path,
				lastmod: new Date(),
				alternatives: enPaths.has(d.path) ? alternativesFor(d.path) : undefined,
			})
		),
		...enDocs.map((d) =>
			asSitemapUrl({
				loc: toEnglishPath(d.path),
				lastmod: new Date(),
				alternatives: thPaths.has(d.path) ? alternativesFor(d.path) : undefined,
			})
		),
	]
})
