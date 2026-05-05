import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import styles from '@/app/[locale]/posts/(list)/page.module.css';
import AdsenseAd from '@/components/AdsenseAd';
import { EmptyState } from '@/components/posts/EmptyState';
import MorePosts from "@/app/[locale]/posts/(list)/MorePosts";

import { localizedAlternates } from '@/i18n/metadata';
import { postService } from '@/services/postService';

export const revalidate = 86400;

type GenProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GenProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Posts' });
  const alternates = localizedAlternates(locale, '/posts');
  const title = t('listMetaTitle');
  const description = t('listMetaDescription');

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
  }
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ params, searchParams }: Props) {

  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Posts' });
  const currentPage = Number(page) || 0;
  const PAGE_SIZE = 10;

  const initial = await postService.getAllPosts({
    page: currentPage,
    size: PAGE_SIZE,
    category: null
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
              <MorePosts
                size={PAGE_SIZE}
                categorySlug={null}
                initialPage={currentPage}
              />
            )}
          </ul>
        )}

        {initial.hasNext && (
          <div className={styles['sr-only']}>
            <Link href={`/posts?page=${currentPage + 1}`} rel='next'>
              {t('nextPageLink')}
            </Link>
          </div>
        )}

        <AdsenseAd />
      </section >
    </>
  );
};