// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								modules: [
								  "@nuxt/content",
								  "@nuxt/ui",
								  "@nuxt/image",
								  "@nuxt/fonts",
								  "@nuxt/eslint",
								  "@nuxtjs/sitemap",
								  "nuxt-swiper",
								],
								css: ["~/assets/css/main.css"],
								devtools: { enabled: true },
								future: {
																compatibilityVersion: 4,
								},
								watch: ["content/**"],
								fonts: {
																assets: { prefix: "/fonts/" },
																families: [
																								{
																																name: "DB Helvethaica X",
																																provider: "local",
																								},
																],
								},
								content: {
																preview: {
																								api: "https://api.nuxt.studio",
																								// force module initialization on dev env
																								dev: true,
																},
								},
								colorMode: {
																preference: "light",
																fallback: "light",
																storageKey: "somsri-web-color-mode",
								},
								hooks: {
																"components:extend": (components) => {
																								const globals = components.filter((c) => ["UButton", "UIcon"].includes(c.pascalName))

																								globals.forEach((c) => (c.global = true))
																},
								},
})