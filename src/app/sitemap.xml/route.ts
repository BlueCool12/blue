import { PostListResponse } from "@/types/post";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';

const staticUrls = [
    '/',
    '/about',
    '/guestbooks'
];

async function fetchPosts(): Promise<PostListResponse[]> {
    try {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/api/user/posts`, { cache: 'no-store' });
        if (!res.ok) throw new Error('글 불러오기 실패');
        return res.json();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('❗ fetchPosts 에러:', err.message);
        } else {
            console.error('❗ fetchPosts 알 수 없는 에러:', err);
        }
        return [];
    }
}

export async function GET() {
    console.log('🚀 sitemap.xml 요청 들어옴');

    const posts = await fetchPosts();
    console.log('🧾 최종 post 수:', posts.length);

    const dynamicUrls = posts.map((post: PostListResponse) => {
        return `
            <url>
                <loc>${SITE_URL}/posts/${post.slug}</loc>
                <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>`
    }).join('');

    const staticPart = staticUrls.map((path) => {
        const priority = path === '/' ? '1.0' : '0.5';
        return `
            <url>
                <loc>${SITE_URL}${path}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>${priority}</priority>
            </url>`
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticPart}
            ${dynamicUrls}
        </urlset>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        },
    });
};