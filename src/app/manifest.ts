import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'BlueCool Blog',
        short_name: 'BlueCool',
        description:
            'BlueCool 블로그의 글들을 빠르게 탐색해보세요!',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'browser'],
        background_color: '#E6F7FB',
        theme_color: '#145B6F',
        orientation: 'any',
        dir: 'ltr',
        lang: 'ko-KR',
        categories: ['programming', 'blog', 'technology', 'education'],
        icons: [
            { src: "/images/manifest/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/images/manifest/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
            { src: "/images/manifest/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/images/manifest/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },

            { src: "/images/manifest/icon-256.png", sizes: "256x256", type: "image/png" },
            { src: "/images/manifest/icon-384.png", sizes: "384x384", type: "image/png" },

            { src: "/images/manifest/icon-32.png", sizes: "32x32", type: "image/png" },
            { src: "/images/manifest/icon-16.png", sizes: "16x16", type: "image/png" },
        ],
        shortcuts: [
            { name: 'Posts', url: '/posts', description: '전체 글 목록' },
            { name: 'About', url: '/about', description: '소개' },
            { name: 'Guestbook', url: '/guestbooks', description: '방명록' },
        ],
        screenshots: [

        ],
        protocol_handlers: [

        ],
        related_applications: [],
        prefer_related_applications: false
    };
}