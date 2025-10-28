import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from '../../page.module.css';

import MorePosts from "../../MorePosts";
import { EmptyState } from '@/components/posts/EmptyState';
import { CategorySidebar } from '@/components/categories/CategorySidebar';
import MobileCategorySelect from '@/components/categories/MobileCategorySelect';

import { categoryService } from '@/services/categoryService';
import { postService } from '@/services/postService';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
    const categories = await categoryService.getCategories();
    const allChildren = categories?.flatMap((parent) => parent.children ?? []) ?? [];

    return allChildren.map((cat) => ({
        category: cat.slug,
    }));
}

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;

    const decoded = decodeURIComponent(category);
    if (!decoded) return notFound();

    const title = `${decoded.toUpperCase()} 카테고리 글 목록`;
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

    const [initial, categories] = await Promise.all([
        postService.getAllPosts({ page: 0, size: PAGE_SIZE, category: decoded }),
        categoryService.getCategories(),
    ]);

    const posts = initial.posts ?? [];

    return (
        <>
            <div className={styles['posts--mobile']}>
                <MobileCategorySelect
                    categories={categories}
                    current={decoded}
                />
            </div>

            <CategorySidebar
                categories={categories}
                categorySlug={decoded}
            />

            <section className={styles.section}>
                {posts.length === 0 ? (
                    <EmptyState message="열심히 공부 중입니다..." />
                ) : (
                    <ul className={styles.wrapper}>
                        {posts.map((post) => (
                            <li key={post.slug} className={styles.item}>
                                <article className={styles.post}>
                                    <Link href={`/posts/${post.slug}`} prefetch={false}>
                                        <header className={styles['post__header']}>
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

                        {initial.hasNext && (
                            <MorePosts size={PAGE_SIZE} categorySlug={decoded} />
                        )}
                    </ul>
                )}
            </section >
        </>
    );
}
