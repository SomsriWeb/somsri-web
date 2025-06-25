// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/image"],
	css: ["~/assets/css/main.css"],
	devtools: { enabled: true },
	content: {
		preview: {
			api: "https://api.nuxt.studio",
			// force module initialization on dev env
			dev: true,
		},
	},
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-04-03",
})
