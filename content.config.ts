import { defineContentConfig, defineCollection, z } from "@nuxt/content"
import { asSeoCollection } from "@nuxtjs/seo/content"

export default defineContentConfig({
	collections: {
		content: defineCollection(
			asSeoCollection({
				type: "page",
				source: "**",
				schema: z.object({
					activeNavbar: z.boolean().default(false),
					lineLink: z.string().default("https://line.me/R/ti/p/%40diz8986o"),
				}),
			})
		),

		blog: defineCollection(
			asSeoCollection({
				type: "page",
				source: {
					include: "blog/*.md",
					prefix: "/blog",
				},
				schema: z.object({
					title: z.string(),
					description: z.string(),
					image: z.string(),
					date: z.string(),
					author: z.string(),
				}),
			})
		),

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

		portCardArtist: defineCollection({
			type: "data",
			source: "data/port-card-artist/**.json",
			schema: z.object({
				name: z.string(),
				method: z.string(),
				image: z.string(),
			}),
		}),

		portCardOrganization: defineCollection({
			type: "data",
			source: "data/port-card-organization/**.json",
			schema: z.object({
				name: z.string(),
				method: z.string(),
				image: z.string(),
			}),
		}),

		portCardOther: defineCollection({
			type: "data",
			source: "data/port-card-other/**.json",
			schema: z.object({
				name: z.string(),
				method: z.string(),
				image: z.string(),
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
			stepOrder: defineCollection({
			type: "data",
			source: "data/steporder/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				order: z.number(),
			}),
		}),
	},
})
