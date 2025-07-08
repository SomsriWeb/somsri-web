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

		fabric: defineCollection({
			type: "data",
			source: "data/fabric/**.json",
			schema: z.object({
				name: z.string(),
				imgUrl: z.string(),
				popupImageUrl: z.string(),
				order: z.number(),
			}),
		}),

		priceCarousel: defineCollection({
			type: "data",
			source: "data/price/carousel/**.json",
			schema: z.object({
				uid: z.string(),
				name: z.string(),
				imageUrl: z.string(),
				conditions: z.array(
					z.object({
						text: z.string(),
					})
				),
				priceLists: z.array(
					z.object({
						fabricName: z.string(),
						rates: z.array(
							z.object({
								min: z.number(),
								max: z.number().nullable(),
								price: z.number().nullable(),
							})
						),
					})
				),
				order: z.number(),
			}),
		}),

		priceTab: defineCollection({
			type: "data",
			source: "data/price/tab/**.json",
			schema: z.object({
				uid: z.string(),
				name: z.string(),
				imageUrl: z.string(),
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
