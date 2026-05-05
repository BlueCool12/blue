import type { MetadataRoute } from "next";

import { getApiBase } from "@/lib/api/apiBase";
import { projects } from "@/app/[locale]/portfolio/data/projects";
import { SITE_URL, sitemapLanguages } from "@/i18n/metadata";

export const revalidate = 86400;

const staticPagesInfo = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0, lastModified: undefined },
    { path: '/posts', changeFrequency: 'weekly', priority: 0.7, lastModified: undefined },
    { path: '/about', changeFrequency: 'yearly', priority: 0.5, lastModified: '2026-04-12T15:41:00.000Z' },
    { path: '/portfolio', changeFrequency: 'yearly', priority: 0.5, lastModified: '2026-04-12T15:41:00.000Z' },
    { path: '/guestbooks', changeFrequency: 'yearly', priority: 0.5, lastModified: '2025-07-01T00:00:00.000Z' },
] as const;

type Sitemap = { key: string; lastModified: string };
type SitemapResponse<T> = { sitemap: T[] };

async function fetchPostSitemap(): Promise<Sitemap[]> {
    const res = await fetch(`${getApiBase()}/posts/sitemap`);
    if (!res.ok) throw new Error('posts/sitemap 실패');

    const json = (await res.json()) as SitemapResponse<Sitemap>;
    return json.sitemap ?? [];
}

async function fetchCategorySitemap(): Promise<Sitemap[]> {
    const res = await fetch(`${getApiBase()}/categories/sitemap`);
    if (!res.ok) return [];

    const json = (await res.json()) as SitemapResponse<Sitemap>;
    return json.sitemap ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, categories] = await Promise.all([fetchPostSitemap(), fetchCategorySitemap()]);

    const latestPostDateISO = posts.at(0)?.lastModified ?? new Date().toISOString();

    const staticPages: MetadataRoute.Sitemap = staticPagesInfo.map(({ path, lastModified, changeFrequency, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: lastModified ?? latestPostDateISO,
        changeFrequency,
        priority,
        alternates: { languages: sitemapLanguages(path) },
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => {
        const path = `/posts/category/${encodeURIComponent(category.key)}`;
        return {
            url: `${SITE_URL}${path}`,
            lastModified: category.lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: { languages: sitemapLanguages(path) },
        };
    });

    const postPages: MetadataRoute.Sitemap = posts.map((post) => {
        const path = `/posts/${encodeURIComponent(post.key)}`;
        return {
            url: `${SITE_URL}${path}`,
            lastModified: post.lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: { languages: sitemapLanguages(path) },
        };
    });

    const portfolioPages: MetadataRoute.Sitemap = projects.map((project) => {
        const path = `/portfolio/${project.slug}`;
        return {
            url: `${SITE_URL}${path}`,
            lastModified: project.lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: { languages: sitemapLanguages(path) },
        };
    });

    return [...staticPages, ...categoryPages, ...postPages, ...portfolioPages];
}