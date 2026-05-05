import { Suspense } from 'react';

import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import AdsenseAd from '@/components/AdsenseAd';
import styles from '@/app/[locale]/posts/(list)/page.module.css';
import MorePosts from "@/app/[locale]/posts/(list)/MorePosts";
import { PostListSkeleton } from '@/components/posts/PostListSkeleton';
import { EmptyState } from '@/components/posts/EmptyState';

import { localizedAlternates } from '@/i18n/metadata';
import { categoryService } from '@/services/categoryService';
import { postService } from '@/services/postService';

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await categoryService.getCategories();
  const allChildren = categories?.flatMap((parent) => parent.children ?? []) ?? [];

  return allChildren.map((cat) => ({
    category: cat.slug,
  }));
}

type Props = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;

  const decoded = decodeURIComponent(category);
  if (!decoded) return notFound();

  const t = await getTranslations({ locale, namespace: 'Posts' });
  const path = `/posts/category/${encodeURIComponent(decoded)}`;
  const alternates = localizedAlternates(locale, path);
  const title = t('categoryMetaTitle', { category: decoded.toUpperCase() });
  const description = t('categoryMetaDescription', { category: decoded });

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://pyomin.com${alternates.canonical}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { page } = await searchParams;

  const decoded = decodeURIComponent(category);
  if (!decoded) notFound();

  const t = await getTranslations({ locale, namespace: 'Posts' });
  const currentPage = Number(page) || 0;
  const PAGE_SIZE = 10;

  const initial = await postService.getAllPosts({
    page: currentPage,
    size: PAGE_SIZE,
    category: decoded
  });

  const posts = initial.posts ?? [];

  return (
    <>
      <section className={styles.section}>
        {posts.length === 0 ? (
          <EmptyState message={t('emptyMessage')} />
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
                      <time dateTime={post.publishedAt}>{post.publishedAtText}</time>
                    </footer>
                  </Link>
                </article>
              </li>
            ))}

            {initial.hasNext && (
              <Suspense fallback={<PostListSkeleton count={3} />}>
                <MorePosts
                  size={PAGE_SIZE}
                  categorySlug={decoded}
                  initialPage={currentPage}
                />
              </Suspense>
            )}
          </ul>
        )}

        {initial.hasNext && (
          <div className={styles['sr-only']}>
            <Link
              href={`/posts/category/${encodeURIComponent(decoded)}?page=${currentPage + 1}`}
              rel='next'
            >
              {t('nextPageLink')}
            </Link>
          </div>
        )}

        <AdsenseAd />
      </section >
    </>
  );
}