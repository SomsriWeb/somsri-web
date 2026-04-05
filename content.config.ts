import { defineContentConfig, defineCollection, property } from '@nuxt/content';
import { z } from 'zod/v4';

const commonContentSchema = z.object({
    activeNavbar: z.boolean().default(false),
    lineLink: z.string().default('https://line.me/R/ti/p/%40diz8986o'),
    image: property(z.string()).editor({ input: 'media' }),
    date: z.string(),
    author: z.string(),
    lineFloatingButton: z.boolean().default(true),
    navbar: z.boolean().default(true),
    footer: z.boolean().default(true),
    language: z.enum(['th', 'en']).default('th'),
    'เพิ่ม script ใน head': z
        .array(
            z.object({
                type: z.string().optional(),
                src: z.string().url(),
                content: z.string().optional(),
                async: z.boolean().optional(),
                defer: z.boolean().optional(),
            }),
        )
        .default([]),
});

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: {
                include: 'page/*.md',
                prefix: '/',
            },
            schema: commonContentSchema,
        }),

        blog: defineCollection({
            type: 'page',
            source: {
                include: 'blog/*.md',
                prefix: '/',
            },
            schema: commonContentSchema,
        }),

        navbar: defineCollection({
            type: 'data',
            source: 'data/navbar.json',
            schema: z.object({
                main: z.array(
                    z.object({
                        label: z.string(),
                        'label-en': z.string(),
                        url: z.string(),
                        'url-en': z.string(),
                    }),
                ),
                products: z
                    .object({
                        previewCategories: z
                            .array(
                                z.object({
                                    id: z.string(),
                                    label: z.string(),
                                    'label-en': z.string(),
                                    url: z.string(),
                                    'url-en': z.string(),
                                    image: property(z.string()).editor({ input: 'media' }),
                                    desc: z.string().optional(),
                                    'desc-en': z.string().optional(),
                                }),
                            )
                            .optional(),
                        shrinkCategories: z
                            .array(
                                z.object({
                                    id: z.string(),
                                    label: z.string(),
                                    'label-en': z.string(),
                                    url: z.string(),
                                    'url-en': z.string(),
                                    image: property(z.string()).editor({ input: 'media' }),
                                    desc: z.string().optional(),
                                    'desc-en': z.string().optional(),
                                }),
                            )
                            .optional(),
                    })
                    .optional(),
            }),
        }),

        product: defineCollection({
            type: 'data',
            source: 'data/product/**.json',
            schema: z.object({
                name: z.string(),
                'name-en': z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                url: z.string(),
                featured: z.boolean().optional(),
                order: z.number(),
            }),
        }),

        screen: defineCollection({
            type: 'data',
            source: 'data/screen/**.json',
            schema: z.object({
                name: z.string(),
                'name-en': z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                'alt-en': z.string().optional(),
                url: z.string(),
                order: z.number(),
                category: z.string().optional(),
            }),
        }),

        portfolioCard: defineCollection({
            type: 'data',
            source: 'data/portfolio-card/**.json',
            schema: z.object({
                image: z.string(),
                alt: z.string(),
                order: z.number(),
            }),
        }),

        portfolioReview: defineCollection({
            type: 'data',
            source: 'data/portfolio-review/**.json',
            schema: z.object({
                image: z.string(),
                alt: z.string(),
                order: z.number(),
            }),
        }),

        pin: defineCollection({
            type: 'data',
            source: 'data/pin/**.json',
            schema: z.object({
                name: z.string(),
                'name-en': z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                'alt-en': z.string().optional(),
                url: z.string(),
                order: z.number(),
                category: z.string().optional(),
            }),
        }),

        print: defineCollection({
            type: 'data',
            source: 'data/print/**.json',
            schema: z.object({
                name: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                url: z.string(),
                order: z.number(),
            }),
        }),

        footerMenu: defineCollection({
            type: 'data',
            source: 'data/footer-menu/**.json',
            schema: z.object({
                label: z.string(),
                url: z.string(),
                order: z.number(),
            }),
        }),

        portCardArtist: defineCollection({
            type: 'data',
            source: 'data/port-card-artist/**.json',
            schema: z.object({
                name: z.string(),
                method: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
            }),
        }),

        portCardOrganization: defineCollection({
            type: 'data',
            source: 'data/port-card-organization/**.json',
            schema: z.object({
                name: z.string(),
                method: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
            }),
        }),

        portCardOther: defineCollection({
            type: 'data',
            source: 'data/port-card-other/**.json',
            schema: z.object({
                name: z.string(),
                method: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
            }),
        }),

        fabric: defineCollection({
            type: 'data',
            source: 'data/fabric/**.json',
            schema: z.object({
                name: z.string(),
                alt: z.string().optional(),
                imgUrl: property(z.string()).editor({ input: 'media' }),
                popupImageUrl: property(z.string()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        sportCarousel: defineCollection({
            type: 'data',
            source: 'data/sportcarousel/**.json',
            schema: z.object({
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),

        priceCarousel: defineCollection({
            type: 'data',
            source: 'data/price/carousel/**.json',
            schema: z.object({
                uid: z.string(),
                name: z.string(),
                imageUrl: property(z.string()).editor({ input: 'media' }),
                conditions: z.array(
                    z.object({
                        text: z.string(),
                    }),
                ),
                priceLists: z.array(
                    z.object({
                        fabricName: z.string(),
                        rates: z.array(
                            z.object({
                                min: z.number(),
                                max: z.number().nullable(),
                                price: z.number().nullable(),
                            }),
                        ),
                    }),
                ),
                order: z.number(),
            }),
        }),

        priceTab: defineCollection({
            type: 'data',
            source: 'data/price/tab/**.json',
            schema: z.object({
                uid: z.string(),
                name: z.string(),
                imageUrl: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),
        stepOrder: defineCollection({
            type: 'data',
            source: 'data/steporder/**.json',
            schema: z.object({
                name: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        brandService: defineCollection({
            type: 'data',
            source: 'data/brand/**.json',
            schema: z.object({
                name: z.string(),
                method: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),

        brandPortCard: defineCollection({
            type: 'data',
            source: 'data/brand/brandportcard/**.json',
            schema: z.object({
                image: property(z.string()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),
        mask: defineCollection({
            type: 'data',
            source: 'data/mask/**.json',
            schema: z.object({
                name: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),

        whyChooseSomsri: defineCollection({
            type: 'data',
            source: 'data/why-choose-somsri/**.json',
            schema: z.object({
                label: z.string(),
                icon: z.string().optional(),
                image: property(z.string().optional()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        social: defineCollection({
            type: 'data',
            source: 'data/social/**.json',
            schema: z.object({
                label: z.string(),
                label2: z.string().optional(),
                icon: z.string().optional(),
                order: z.number(),
                url: z.string().optional(),
            }),
        }),

        howToOrder: defineCollection({
            type: 'data',
            source: 'data/how-to-order/**.json',
            schema: z.object({
                label: z.string(),
                description: z.string().optional(),
                icon: z.string().optional(),
                image: property(z.string().optional()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        whatCostSaving: defineCollection({
            type: 'data',
            source: 'data/what-cost-saving/**.json',
            schema: z.object({
                label: z.string(),
                icon: z.string().optional(),
                image: property(z.string().optional()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        hatStyles: defineCollection({
            type: 'data',
            source: 'data/hat-styles/**.json',
            schema: z.object({
                image: property(z.string()).editor({ input: 'media' }),
                label: z.string(),
                order: z.number(),
            }),
        }),

        fabrics: defineCollection({
            type: 'data',
            source: 'data/fabrics/**',
            schema: z.object({
                uid: z.string(),
                imageUrl: property(z.string()).editor({ input: 'media' }),
                imageAlt: z.string().optional(),
                popupImageUrl: property(z.string().optional()).editor({ input: 'media' }),
                popupImageAlt: z.string().optional(),
                forProductType: z.array(z.enum(['tshirt', 'polo', 'sport', 'totebag', 'hat', 'mask', 'brand', 'pants', 'other'])),
                nameTh: z.string(),
                nameEn: z.string(),
                recommendForStyle: z.string(),
                advantage: z.array(z.string()),
                disadvantage: z.array(z.string()),
                order: z.number(),
            }),
        }),

        priceLists: defineCollection({
            type: 'data',
            source: 'data/price/**.json',
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
                                maxOrder: z.number(),
                                price: z.number(),
                                attributes: z.array(
                                    z.object({
                                        label: z.string(),
                                    }),
                                ),
                            }),
                        ),
                    }),
                ),
            }),
        }),

        whyYouShouldChooseSomsri: defineCollection({
            type: 'data',
            source: 'data/why-you-should-choose-somsri/**.json',
            schema: z.object({
                uid: z.string(),
                title: z.string(),
                'title-en': z.string(),
                description: z.string(),
                'description-en': z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        whyYouShouldChooseSomsriEn: defineCollection({
            type: 'data',
            source: 'data/why-you-should-choose-somsri-en/**.json',
            schema: z.object({
                uid: z.string(),
                title: z.string(),
                description: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                order: z.number(),
            }),
        }),

        poloProduct: defineCollection({
            type: 'data',
            source: 'data/polo-product/**.json',
            schema: z.object({
                name: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),
        productEn: defineCollection({
            type: 'data',
            source: 'data/product-en/**.json',
            schema: z.object({
                name: z.string(),
                image: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
                url: z.string(),
            }),
        }),
        size: defineCollection({
            type: 'data',
            source: 'data/size/tab/**.json',
            schema: z.object({
                uid: z.string(),
                name: z.string(),
                imageUrl: property(z.string()).editor({ input: 'media' }),
                alt: z.string().optional(),
                order: z.number(),
            }),
        }),

        mediaVideos: defineCollection({
            type: 'data',
            source: 'data/media-videos/**.json',
            schema: z.object({
                videoId: z.string(),
                title: z.string().optional(),
                category: z.string().optional(),
                platform: z.enum(['youtube', 'facebook']).default('youtube'),
                order: z.number(),
                thumbnail: z.string().optional(),
                muted: z.boolean().optional(),
                aspectRatio: z.enum(['16/9', '9/16']).optional(),
            }),
        }),
    },
});
