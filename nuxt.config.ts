import { beasties } from 'vite-plugin-beasties';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/seo', '@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxt/fonts', '@nuxt/eslint', 'nuxt-swiper', 'nuxt-viewport', '@nuxtjs/device', '@vueuse/nuxt', '@nuxt/scripts'],
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
                    crossorigin: '',
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
    content: {
        preview: {
            api: 'https://api.nuxt.studio',
            dev: true,
            gitInfo: {
                name: 'somsri-web',
                owner: 'SomsriWeb',
                url: 'https://github.com/SomsriWeb/somsri-web',
            },
        },
        build: {
            transformers: ['~~/transformers/blog-path'],
        },
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
        '/shop': { ssr: false },
        '/**': {
            prerender: true,
        },
    },
    nitro: {
        prerender: {
            routes: ['/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml'],
            crawlLinks: true,
        },
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
                    id: 'UA-104199832-1',
                },
                metaPixel: {
                    id: '796947021881915',
                },
                hotjar: {
                    id: 3498590, // your id
                },
            },
        },
    },
});
