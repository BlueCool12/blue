import { NextResponse } from "next/server";

import { PostListResponse } from "@/types/post";

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';

const staticUrls = ['/', '/about', '/posts', '/guestbooks']

async function fetchPosts(): Promise<PostListResponse[]> {
    try {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/user/posts`, { cache: 'no-store' });
        if (!res.ok) throw new Error('글 불러오기 실패');
        
        const json = await res.json();        
        return json.content;
    } catch {
        return [];
    }
}

export async function GET() {
    const posts = await fetchPosts();
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const latestPostDate = posts.length > 0
        ? new Date(posts[0].updatedAt).toISOString() : new Date().toISOString();


    const staticPagesLastModified: Record<string, string> = {
        '/': latestPostDate,
        '/posts': latestPostDate,
        '/about': '2025-07-01T00:00:00.000Z',
        '/guestbooks': '2025-07-01T00:00:00.000Z',
    };

    const staticPart = staticUrls.map((path) => {
        const priority = path === '/' ? '1.0' : '0.5';

        const changefreq = ['/', '/posts'].includes(path) ? 'weekly' : 'yearly';

        const lastmod = staticPagesLastModified[path];

        return `
            <url>
                <loc>${SITE_URL}${path}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>${changefreq}</changefreq>
                <priority>${priority}</priority>
            </url>`
    }).join('');

    const dynamicUrls = posts.map((post: PostListResponse) => {
        return `
            <url>
                <loc>${SITE_URL}/posts/${post.slug}</loc>
                <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
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