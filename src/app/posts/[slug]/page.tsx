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

import { postService } from '@/services/postService';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

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
                            {post.createdAt}
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

            <AdsenseAd />

            <CommentSectionWrapper postId={post.id} />

        </>
    );
}