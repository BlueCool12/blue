import { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import styles from './page.module.css';

import CommentSectionWrapper from '@/components/comments/CommentSectionWrapper';
import { ScrollProgress } from '@/components/posts/ScrollProgress';
import ShareButtons from '@/components/posts/ShareButtons';
import { LogoBorder } from '@/components/posts/LogoBorder';
import { PrevNextNavigation } from '@/components/posts/PrevNextNavigation';
import AdsenseAd from '@/components/AdsenseAd';
import { CommentSkeleton } from '@/components/comments/CommentSkeleton';

import { postService } from '@/services/postService';
import { getApiBase } from "@/lib/api/apiBase";

type Sitemap = { key: string; lastModified: string };
type SitemapResponse<T> = { sitemap: T[] };

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
    const res = await fetch(`${getApiBase()}/posts/sitemap`);
    if (!res.ok) throw new Error('Failed to fetch staticParams');

    const { sitemap }: SitemapResponse<Sitemap> = await res.json();

    return sitemap.map((item): { slug: string } => ({
        slug: item.key
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const post = await postService.getPostBySlug(slug);

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/posts/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            url: `https://pyomin.com/posts/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        },
    };
}

export default async function PostDetail({ params }: PageProps) {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const post = await postService.getPostBySlug(slug);

    if (!post) notFound();

    return (
        <>
            <ScrollProgress />

            <article id='main-content' className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <time className={styles.date} dateTime={post.createdAt}>
                            {post.createdAtText}
                        </time>

                        <Link href={`/posts/category/${encodeURIComponent(post.category.slug)}`}>
                            <span className={styles.category}>
                                {post.category.name}
                            </span>
                        </Link>

                    </div>

                    <h1 className={styles.title}>{post.title}</h1>
                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <PrevNextNavigation prev={post.previousPost} next={post.nextPost} />

            <ShareButtons title={post.title} slug={slug} />

            <LogoBorder />

            <Suspense fallback={<CommentSkeleton />}>
                <CommentSectionWrapper postId={post.id} />
            </Suspense>

            <AdsenseAd />
        </>
    );
}