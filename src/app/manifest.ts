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
            { src: '/favicon.ico' },
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