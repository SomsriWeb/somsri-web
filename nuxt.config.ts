import { beasties } from 'vite-plugin-beasties';

const GTAG_ID = 'GTM-5HWK828';
const META_PIXEL_ID = '796947021881915';
const HOTJAR_ID = 3498590;

import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/seo',
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxt/fonts',
        '@nuxt/eslint',
        'nuxt-swiper',
        'nuxt-viewport',
        '@nuxtjs/device',
        '@vueuse/nuxt',
        '@nuxt/scripts',
        'nuxt-studio',
    ],
    app: {
        head: {
            htmlAttrs: {
                lang: 'th',
            },
            link: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/favicon/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon/favicon-16x16.png',
                },
                {
                    rel: 'manifest',
                    href: '/favicon/site.webmanifest',
                },
                {
                    rel: 'mask-icon',
                    href: '/favicon/safari-pinned-tab.svg',
                    color: '#a52241',
                },
                {
                    rel: 'preload',
                    href: '/fonts/DB-Helvethaica-X-300.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preload',
                    href: '/fonts/DB-Helvethaica-X-500.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preload',
                    href: '/fonts/DB-Helvethaica-X-700.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'preconnect',
                    href: 'https://somsritshirt.com',
                },
            ],
            meta: [
                {
                    name: 'msapplication-TileColor',
                    content: '#a52241',
                },
                {
                    name: 'theme-color',
                    content: '#ffffff',
                },
            ],
        },
    },
    seo: {},
    site: {
        url: 'https://somsritshirt.com',
        name: 'สมศรีมีเสื้อ',
    },
    sitemap: {
        sitemapsPathPrefix: '/',
        sitemaps: {
            'page-sitemap': {
                sources: ['/api/__sitemap__/page'],
            },
            'post-sitemap': {
                sources: ['/api/__sitemap__/blog'],
            },
        },
    },
    css: ['~/assets/css/main.css'],
    devtools: { enabled: true },
    // watch: ['content/**'],
    fonts: {
        families: [
            {
                name: 'DB Helvethaica X',
                provider: 'local',
                preload: true,
            },
        ],
    },
    colorMode: {
        preference: 'light',
        fallback: 'light',
        storageKey: 'somsri-web-color-mode',
    },
    hooks: {
        'components:extend': (components) => {
            const globals = components.filter((c) => ['UButton', 'UIcon'].includes(c.pascalName));

            globals.forEach((c) => (c.global = true));
        },
    },
    viewport: {
        breakpoints: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        },

        defaultBreakpoints: {
            desktop: 'lg',
            mobile: 'xs',
            tablet: 'md',
        },

        fallbackBreakpoint: 'lg',
    },
    routeRules: {
        '/shop': { ssr: false, prerender: false },
        '/tshirt': { prerender: false },
        '/**': {
            prerender: true,
        },
    },
    nitro: {
        prerender: {
            routes: ['/', '/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml'],
            crawlLinks: true,
        },
        preset: 'bun',
    },
    vite: {
        plugins: [
            beasties({
                // optional beasties configuration
                options: {
                    preload: 'swap',
                },
            }),
        ],
    },

    compatibilityDate: '2025-07-19',
    $production: {
        scripts: {
            registry: {
                googleTagManager: {
                    id: GTAG_ID,
                },
                metaPixel: {
                    id: META_PIXEL_ID,
                },
                hotjar: {
                    id: HOTJAR_ID,
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            scripts: {
                googleAnalytics: {
                    // .env
                    // NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID=<your-id>
                    id: GTAG_ID,
                },
                metaPixel: {
                    id: META_PIXEL_ID,
                },
            },
        },
        env: process.env.NODE_ENV || 'production',
    },
    studio: {
        repository: {
            provider: 'github', // 'github' or 'gitlab'
            owner: 'SomsriWeb',
            repo: 'somsri-web',
        },
        route: '/_editor',
    },
    icon: {
        serverBundle: 'local',
    },
});
