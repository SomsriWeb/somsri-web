// server/api/__sitemap__/page.ts
import { defineSitemapEventHandler, asSitemapUrl } from "#imports"
import { queryCollection } from "@nuxt/content/nitro"

// th "/about" <-> en "/en/about" ; th "/" <-> en "/en"
const toEn = (thPath: string) => (thPath === "/" ? "/en" : `/en${thPath}`)
const toTh = (enPath: string) => (enPath === "/en" ? "/" : enPath.replace(/^\/en/, ""))

export default defineSitemapEventHandler(async (e) => {
	const [th, en] = await Promise.all([
		queryCollection(e, "contentTh").all(),
		queryCollection(e, "contentEn").all(),
	])
	const enPaths = new Set(en.map((d) => d.path))

	const alternatives = (thPath: string, enPath: string) => [
		{ hreflang: "th", href: thPath },
		{ hreflang: "en", href: enPath },
		{ hreflang: "x-default", href: thPath },
	]

	const thUrls = th.map((d) => {
		const enPath = toEn(d.path)
		return asSitemapUrl({
			loc: d.path,
			lastmod: new Date(),
			...(enPaths.has(enPath) ? { alternatives: alternatives(d.path, enPath) } : {}),
		})
	})

	const enUrls = en.map((d) =>
		asSitemapUrl({
			loc: d.path,
			lastmod: new Date(),
			alternatives: alternatives(toTh(d.path), d.path),
		})
	)

	return [...thUrls, ...enUrls]
})
