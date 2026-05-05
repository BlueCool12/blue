import { Suspense } from 'react';

import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import styles from '@/app/[locale]/posts/(list)/page.module.css';
import searchStyles from './page.module.css';
import { EmptyState } from '@/components/posts/EmptyState';
import { PostListSkeleton } from '@/components/posts/PostListSkeleton';
import { SearchFilters } from '@/components/posts/SearchFilters';
import MoreSearchResults from './MoreSearchResults';

import { categoryService } from '@/services/categoryService';
import { postService } from '@/services/postService';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ keyword?: string; category?: string; page?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { keyword } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Posts' });
  const title = keyword
    ? t('searchResultsMetaTitle', { keyword })
    : t('searchMetaTitle');

  return {
    title,
    robots: { index: false, follow: false },
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { keyword = '', category = '', page } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Posts' });
  const trimmed = keyword.trim();
  const currentPage = Number(page) || 0;
  const PAGE_SIZE = 10;

  const categories = await categoryService.getCategories();

  const filters = (
    <SearchFilters
      categories={categories}
      initialKeyword={trimmed}
      initialCategory={category}
    />
  );

  if (trimmed.length < 2) {
    return (
      <section className={styles.section}>
        {filters}
        <div className={searchStyles.placeholder}>
          <Image
            src="/images/search.webp"
            alt={t('searchImageAlt')}
            width={160}
            height={160}
            priority
          />
          <p className={searchStyles.hint}>{t('searchHint')}</p>
        </div>
      </section>
    );
  }

  const initial = await postService.searchPosts({
    keyword: trimmed,
    category: category || null,
    page: currentPage,
    size: PAGE_SIZE,
  });

  const posts = initial.posts ?? [];

  return (
    <section className={styles.section}>
      {filters}

      {posts.length === 0 ? (
        <EmptyState message={t('searchEmptyMessage', { keyword: trimmed })} />
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
              <MoreSearchResults
                keyword={trimmed}
                category={category || null}
                size={PAGE_SIZE}
                initialPage={currentPage}
              />
            </Suspense>
          )}
        </ul>
      )}
    </section>
  );
}
