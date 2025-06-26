import styles from './page.module.css';

import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CommentSection } from '@/components/user/CommentSection';

import { postService } from '@/services/user/postService';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const post = await postService.getPostBySlug(slug);

    return {
        title: post.title,
        openGraph: {
            title: post.title,
            type: 'article',
            url: `https://pyomin.com/posts/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
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
            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <time className={styles.date} dateTime={post.createdAt}>
                            {post.createdAt}
                        </time>

                        <Link href={`/posts?category=${encodeURIComponent(post.category)}`}>
                            <span className={styles.category}>
                                {post.category}
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

            <CommentSection postId={post.id} />
        </>
    );
}