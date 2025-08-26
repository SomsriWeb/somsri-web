import { defineContentConfig, defineCollection, z } from "@nuxt/content"
import { asSeoCollection } from "@nuxtjs/seo/content"

export default defineContentConfig({
	collections: {
		content: defineCollection(
			asSeoCollection({
				type: "page",
				source: {
					include: "**",
					prefix: "/",
				},
				schema: z.object({
					activeNavbar: z.boolean().default(false),
					lineLink: z.string().default("https://line.me/R/ti/p/%40diz8986o"),
					title: z.string(),
					description: z.string(),
					image: z.string(),
					date: z.string(),
					author: z.string(),
					lineFloatingButton: z.boolean().default(true),
					navbar: z.boolean().default(true),
					footer: z.boolean().default(true),
				}),
			})
		),

		blog: defineCollection(
			asSeoCollection({
				type: "page",
				source: {
					include: "blog/**",
					prefix: "/",
				},
				schema: z.object({
					activeNavbar: z.boolean().default(false),
					lineLink: z.string().default("https://line.me/R/ti/p/%40diz8986o"),
					title: z.string(),
					description: z.string(),
					image: z.string(),
					date: z.string(),
					author: z.string(),
					lineFloatingButton: z.boolean().default(true),
					navbar: z.boolean().default(true),
					footer: z.boolean().default(true),
				}),
			})
		),

		product: defineCollection({
			type: "data",
			source: "data/product/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				alt: z.string().optional(),
				url: z.string(),
				featured: z.boolean().optional(),
				order: z.number(),
			}),
		}),

		screen: defineCollection({
			type: "data",
			source: "data/screen/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				alt: z.string().optional(),
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
				alt: z.string().optional(),
				url: z.string(),
				order: z.number(),
			}),
		}),

		print: defineCollection({
			type: "data",
			source: "data/print/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				alt: z.string().optional(),
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
				alt: z.string().optional(),
				imgUrl: z.string(),
				popupImageUrl: z.string(),
				order: z.number(),
			}),
		}),

		sportCarousel: defineCollection({
			type: "data",
			source: "data/sportcarousel/**.json",
			schema: z.object({
				image: z.string(),
				alt: z.string().optional(),
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
				alt: z.string().optional(),
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

		brandService: defineCollection({
			type: "data",
			source: "data/brand/**.json",
			schema: z.object({
				name: z.string(),
				method: z.string(),
				image: z.string(),
				alt: z.string().optional(),
				order: z.number(),
			}),
		}),

		brandPortCard: defineCollection({
			type: "data",
			source: "data/brand/brandportcard/**.json",
			schema: z.object({
				image: z.string(),
				order: z.number(),
			}),
		}),
		mask: defineCollection({
			type: "data",
			source: "data/mask/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				alt: z.string().optional(),
				order: z.number(),
			}),
		}),

		whyChooseSomsri: defineCollection({
			type: "data",
			source: "data/why-choose-somsri/**.json",
			schema: z.object({
				label: z.string(),
				icon: z.string().nullable().optional(),
				image: z.string().nullable().optional(),
				order: z.number(),
			}),
		}),
		howToOrder: defineCollection({
			type: "data",
			source: "data/how-to-order/**.json",
			schema: z.object({
				label: z.string(),
				description: z.string().optional(),
				icon: z.string().nullable().optional(),
				image: z.string().nullable().optional(),
				order: z.number(),
			}),
		}),

		whatCostSaving: defineCollection({
			type: "data",
			source: "data/what-cost-saving/**.json",
			schema: z.object({
				label: z.string(),
				icon: z.string().nullable().optional(),
				image: z.string().nullable().optional(),
				order: z.number(),
			}),
		}),

		hatStyles: defineCollection({
			type: "data",
			source: "data/hat-styles/**.json",
			schema: z.object({
				image: z.string(),
				label: z.string(),
				order: z.number(),
			}),
		}),

		fabrics: defineCollection({
			type: "data",
			source: "data/fabrics/**",
			schema: z.object({
				uid: z.string(),
				image: z.string(),
				forProductType: z.array(z.string()),
				labelTh: z.string(),
				labelEn: z.string(),
				recommendForStyle: z.string(),
				advantage: z.array(z.string()),
				disadvantage: z.array(z.string()),
			}),
		}),

		priceLists: defineCollection({
			type: "data",
			source: "data/price/**.json",
			schema: z.object({
				id: z.string(),
				productId: z.string(),
				prices: z.array(
					z.object({
						id: z.string(),
						fabricId: z.string(),
						lists: z.array(
							z.object({
								minOrder: z.number(),
								maxOrder: z.number().nullable(),
								price: z.number().nullable(),
								attributes: z.array(
									z.object({
										label: z.string(),
									})
								),
							})
						),
					})
				),
			}),
		}),

		poloProduct: defineCollection({
			type: "data",
			source: "data/polo/**.json",
			schema: z.object({
				name: z.string(),
				image: z.string(),
				alt: z.string().optional(),
				order: z.number(),
			}),
		}),
	},
})
