import fs from 'fs';
import path from 'path';

import { NextResponse } from "next/server";

import { PostListResponse } from "@/types/post";

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';

const getFileLastModified = (relativePath: string): string => {
    try {
        const filePath = path.join(process.cwd(), relativePath);
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString();
    } catch {
        return new Date().toISOString();
    }
};

const staticUrls = ['/', '/about', '/posts', '/guestbooks']

async function fetchPosts(): Promise<PostListResponse[]> {
    try {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/user/posts`, { cache: 'no-store' });
        if (!res.ok) throw new Error('글 불러오기 실패');
        return res.json();
    } catch {
        return [];
    }
}

export async function GET() {
    const posts = await fetchPosts();
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const mainPageLastMod = posts.length > 0
        ? new Date(posts[0].updatedAt).toISOString()
        : getFileLastModified('app/(public)/page.tsx');


    const staticPagesLastModified: Record<string, string> = {
        '/': mainPageLastMod,
        '/about': getFileLastModified('app/(public)/about/page.tsx'),
        '/posts': getFileLastModified('app/(public)/posts/page.tsx'),
        '/guestbooks': getFileLastModified('app/(public)/guestbooks/page.tsx'),
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