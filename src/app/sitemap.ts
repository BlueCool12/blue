import { MetadataRoute } from "next";

import { getApiBase } from "@/lib/api/apiBase";

export const revalidate = 86400;

const SITE_URL = 'https://pyomin.com';
const staticUrls = ['/', '/about', '/posts', '/guestbooks'] as const;

type PostSitemap = { key: string; lastModified: string };
type CategorySitemap = { key: string; lastModified: string };
type SitemapResponse<T> = { sitemap: T[] };

async function fetchPostSitemap(): Promise<PostSitemap[]> {
    const res = await fetch(`${getApiBase()}/posts/sitemap`);
    if (!res.ok) throw new Error('posts/sitemap 실패');    

    const json = (await res.json()) as SitemapResponse<PostSitemap>;

    console.log(json);
    return json.sitemap ?? [];
}

async function fetchCategorySitemap(): Promise<CategorySitemap[]> {
    const res = await fetch(`${getApiBase()}/categories/sitemap`);
    if (!res.ok) return [];

    const json = (await res.json()) as SitemapResponse<CategorySitemap>;
    return json.sitemap ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, categories] = await Promise.all([fetchPostSitemap(), fetchCategorySitemap()]);

    const latestPostDateISO = posts.at(0)?.lastModified ?? new Date().toISOString();

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

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${SITE_URL}/posts/category/${encodeURIComponent(category.key)}`,
        lastModified: category.lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}/posts/${encodeURIComponent(post.key)}`,
        lastModified: post.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...postPages];
}