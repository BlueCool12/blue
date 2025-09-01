import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.css';
import PostList from "./PostList";
import { EmptyState } from '@/components/posts/EmptyState';

import { fetchPostsPage } from '@/lib/server/post';

export const revalidate = 60;
// export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const title = '전체 글 목록';
    const description = 'BlueCool 블로그의 전체글 목록입니다. 다양한 기술과 개발 이야기를 확인해보세요.';

    return {
        title,
        description,
        alternates: {
            canonical: '/posts',
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: 'https://pyomin.com/posts',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
};

export default async function Page() {

    const PAGE_SIZE = 10;
    const initial = await fetchPostsPage({ page: 1, size: PAGE_SIZE, category: null });

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

                        <PostList startPage={nextPage} size={PAGE_SIZE} categorySlug={null} />
                    </ul>
                )}
            </section >
        </>
    );
};