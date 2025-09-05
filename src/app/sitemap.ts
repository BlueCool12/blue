import { MetadataRoute } from "next";

import { PostListResponse } from "@/types/post";

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';
const staticUrls = ['/', '/about', '/posts', '/guestbooks'] as const;

function extractChildSlugs(categories: { children: { slug: string }[] }[]): string[] {
    return categories.flatMap((parent) => parent.children.map((child) => child.slug));
}

async function fetchAllPosts(): Promise<PostListResponse[]> {
    const size = 100;
    let page = 0;
    const maxPages = 1000;
    const all: PostListResponse[] = [];

    while (page < maxPages) {
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/posts?page=${page}&size=${size}`);
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
        const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/categories`);
        if (!res.ok) throw new Error('카테고리 불러오기 실패');
        const json = await res.json();
        return extractChildSlugs(json);
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, categories] = await Promise.all([fetchAllPosts(), fetchCategories()]);

    posts.sort(
        (a, b) => new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime()
    );

    const latestPostDateISO = posts.length > 0
        ? new Date(posts[0].updatedAt ?? posts[0].createdAt).toISOString()
        : new Date().toISOString();

    const staticPages: MetadataRoute.Sitemap = staticUrls.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified:
            path === '/' || path === '/posts'
                ? latestPostDateISO
                : path === '/about'
                    ? '2025-09-05T00:00:00.000Z'
                    : '2025-07-01T00:00:00.000Z',
        changeFrequency: path === '/' || path === '/posts' ? 'weekly' : 'yearly',
        priority: path === '/' ? 1.0 : 0.5,
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map((slug) => ({
        url: `${SITE_URL}/posts/category/${encodeURIComponent(slug)}`,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}/posts/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.createdAt).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...postPages];
}