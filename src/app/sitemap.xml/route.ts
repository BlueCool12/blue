import { NextResponse } from "next/server";

import { PostListResponse } from "@/types/post";

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';

const staticUrls = ['/', '/about', '/posts', '/guestbooks']

function extractChildSlugs(categories: { children: { slug: string }[] }[]): string[] {
    return categories.flatMap((parent) => parent.children.map((child) => child.slug));
}

async function fetchAllPosts(): Promise<PostListResponse[]> {
    const size = 100;
    let page = 0;
    const maxPages = 1000;
    const all: PostListResponse[] = [];

    while (page < maxPages) {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/user/posts?page=${page}&size=${size}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('글 불러오기 실패');

        const json = await res.json();
        all.push(...json.content);

        if (json.last || page + 1 >= json.totalPages) break;
        page += 1;
    }
    return all;
}

async function fetchCategories(): Promise<string[]> {
    try {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/user/categories`, { cache: 'no-store' });
        if (!res.ok) throw new Error('카테고리 불러오기 실패');
        const json = await res.json();
        return extractChildSlugs(json);
    } catch {
        return [];
    }
}

export async function GET() {
    const [posts, categories] = await Promise.all([fetchAllPosts(), fetchCategories()]);

    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const latestPostDate = posts.length > 0
        ? new Date(posts[0].updatedAt ?? posts[0].createdAt).toISOString() : new Date().toISOString();


    const staticPagesLastModified: Record<string, string> = {
        '/': latestPostDate,
        '/posts': latestPostDate,
        '/about': '2025-08-04T00:00:00.000Z',
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

    const categoryUrls = categories
        .map(
            (slug) => `
                <url>
                    <loc>${SITE_URL}/posts/category/${encodeURIComponent(slug)}</loc>                    
                    <changefreq>monthly</changefreq>
                    <priority>0.6</priority>
                </url>`
        )
        .join('');

    const dynamicUrls = posts.map((post: PostListResponse) => {
        return `
            <url>
                <loc>${SITE_URL}/posts/${post.slug}</loc>
                <lastmod>${new Date(post.updatedAt ?? post.createdAt).toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>`
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticPart}
            ${categoryUrls}
            ${dynamicUrls}
        </urlset>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
    });
};