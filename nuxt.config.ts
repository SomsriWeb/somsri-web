// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/image"],
	css: ["~/assets/css/main.css"],
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	content: {
		preview: {
			api: "https://api.nuxt.studio",
			// force module initialization on dev env
			dev: true,
		},
	},
	hooks: {
		"components:extend": (components) => {
			console.log(components)
			const globals = components.filter((c) => ["UButton", "UIcon"].includes(c.pascalName))

			globals.forEach((c) => (c.global = true))
		},
	},
})
