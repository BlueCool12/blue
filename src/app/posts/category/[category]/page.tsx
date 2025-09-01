import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from '../../page.module.css';

import PostList from "../../PostList";
import { EmptyState } from '@/components/posts/EmptyState';

import { fetchPostsPage } from '@/lib/server/post';

export const revalidate = 60;

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;

    const decoded = decodeURIComponent(category);
    if (!decoded) return notFound();

    const title = `${decoded} 카테고리 글 목록`;
    const description = `BlueCool 블로그의 "${decoded}" 카테고리 글 목록입니다.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/posts/category/${encodeURIComponent(decoded)}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://pyomin.com/posts/category/${encodeURIComponent(decoded)}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decoded = decodeURIComponent(category);
    if (!decoded) notFound();

    const PAGE_SIZE = 10;

    const initial = await fetchPostsPage({ page: 1, size: PAGE_SIZE, category: decoded });

    const items = initial.posts ?? [];
    const nextPage = initial.nextPage ?? 2;

    return (
        <>
            <section className={styles.section}>
                {items.length === 0 ? (
                    <EmptyState message="열심히 공부 중입니다..." />
                ) : (
                    <ul className={styles.wrapper}>
                        {items.map((post) => (
                            <li key={post.slug} className={styles.item}>
                                <article className={styles.post}>
                                    <Link href={`/posts/${post.slug}`} prefetch={false}>
                                        <header className={styles.titleRow}>
                                            <h2 className={styles.title}>{post.title}</h2>
                                            <span className={styles.badge}>{post.category}</span>
                                        </header>

                                        <p className={styles.content}>{post.contentSummary}</p>

                                        <footer className={styles.meta}>
                                            <time dateTime={post.createdAt}>{post.createdAtText}</time>
                                        </footer>
                                    </Link>
                                </article>
                            </li>
                        ))}

                        <PostList startPage={nextPage} size={PAGE_SIZE} categorySlug={decoded} />
                    </ul>
                )}
            </section >
        </>
    );
}
