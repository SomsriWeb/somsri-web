import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
	collections: {
		content: defineCollection({
			type: "page",
			source: "**",
		}),

		product: defineCollection({
			type: "data",
			source: "data/product/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				url: z.string(),
				order: z.number(),
			}),
		}),

		screen: defineCollection({
			type: "data",
			source: "data/screen/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				url: z.string(),
				order: z.number(),
			}),
		}),

		pin: defineCollection({
			type: "data",
			source: "data/pin/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				url: z.string(),
				order: z.number(),
			}),
		}),

		footerMenu: defineCollection({
			type: "data",
			source: "data/footer-menu/**.json",
			schema: z.object({
				label: z.string(),
				url: z.string(),
				order: z.number(),
			}),
		}),
			stepOeder: defineCollection({
			type: "data",
			source: "data/footer-menu/**.json",
			schema: z.object({
				label: z.string(),
				url: z.string(),
				order: z.number(),
			}),
		}),
	},
})
