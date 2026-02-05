import type { Metadata } from 'next';
import Link from 'next/link';

import styles from '@/app/posts/(list)/page.module.css';
import AdsenseAd from '@/components/AdsenseAd';
import { EmptyState } from '@/components/posts/EmptyState';
import MorePosts from "@/app/posts/(list)/MorePosts";

import { postService } from '@/services/postService';

export const revalidate = 86400;

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

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {

  const { page } = await searchParams;
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
              다음 페이지
            </Link>
          </div>
        )}

        <AdsenseAd />
      </section >
    </>
  );
};