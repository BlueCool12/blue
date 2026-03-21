import Image from 'next/image';
import Link from 'next/link';

import styles from '@/app/page.module.css';

import { MdOutlineChevronRight } from 'react-icons/md';
import HeroClient from '@/components/HeroClient';
import HorizontalScrollSection from '@/components/common/HorizontalScrollSection';

import { getDailySeed, seededShuffle } from '@/lib/utils/dailyShuffle';

import { PagedPost, PostLatest } from '@/types/post';
import { postService } from '@/services/postService';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';

export const revalidate = 86400;

async function getLatestPosts(): Promise<PostLatest[]> {
  return await postService.getLatestPosts();
}

async function getCategories(): Promise<Category[]> {
  return await categoryService.getCategories();
}

async function getTroubleshootingPosts(): Promise<PagedPost> {
  return await postService.getAllPosts({ category: 'troubleshooting', page: 0, size: 4 });
}

async function getRetrospectivePosts(): Promise<PagedPost> {
  return await postService.getAllPosts({ category: 'retrospective', page: 0, size: 1 });
}

export default async function Home() {

  const [latestPosts, categories, troubleshootingPosts, retrospectivePosts] = await Promise.all([
    getLatestPosts(),
    getCategories(),
    getTroubleshootingPosts(),
    getRetrospectivePosts(),
  ]);

  const allChildren = categories?.flatMap((parent) => parent.children ?? []) ?? [];
  const shuffledChildren = seededShuffle(allChildren, getDailySeed()).slice(0, 3);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>

        <div className={styles.hero__text}>
          <HeroClient />
        </div>

        <div className={styles.hero__image}>
          <Image
            src='/images/main.webp'
            alt='메인 페이지 이미지'
            priority
            width={280}
            height={280}
          />
        </div>
      </section>
      {/* Hero Section */}

      {/* Categories Section */}
      <section className={styles['category-preview']}>
        <div className={styles['category-preview__heading']}>
          <div className={styles['category-preview__title-line']}>
            <hr />
            <h2 className={styles['category-preview__title']}>Daily Pick 👀</h2>
            <hr />
          </div>

          <p className={styles['category-preview__subtitle']}>매일 새롭게 만나는 세 가지 주제</p>
        </div>

        <div className={styles['category-preview__wrapper']}>
          <div className={styles['category-preview__list']}>
            {shuffledChildren.map((category, i) => (
              <Link
                key={category.slug}
                href={`/posts/category/${encodeURIComponent(category.slug)}`}
                className={`${styles['category-preview__item']} ${i === 1 ? styles['category-preview__item--center'] : ''
                  }`}
              >
                <Image
                  src={`/images/categories/svgrepo_${encodeURIComponent(category.slug)}.svg`}
                  className={styles['category-preview__image']}
                  alt={category.name}
                  width={100}
                  height={100}
                />
                <span className={styles['category-preview__alt']}>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Categories Section */}

      {/* Latest Posts Section */}
      <section className={styles['recent-posts']}>
        <div className={styles['recent-posts__header']}>
          <div className={styles['recent-posts__heading']}>
            <Link
              href='/posts'
              className={styles['recent-posts__title']}
            >
              최신 글 🌟
            </Link>
            <p className={styles['recent-posts__subtitle']}>
              새로 올라온 글들을 확인해보세요!
            </p>
          </div>

          <Link
            href="/posts"
            className={styles['recent-posts__all-link']}
            aria-label='전체 글 목록 보기'
          >
            <MdOutlineChevronRight />
          </Link>
        </div>

        <div className={styles['recent-posts__card-wrapper']}>
          {latestPosts?.map((post: PostLatest) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className={styles['recent-posts__link']}>
              <article className={styles['recent-posts__card']}>
                <div className={styles['recent-posts__content']}>
                  <h3 className={styles['recent-posts__card-title']}>{post.title}</h3>

                  <time className={styles['recent-posts__date']} dateTime={post.publishedAt}>
                    {post.publishedAtText}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
      {/* Latest Posts Section */}

      {/* Retrospective Posts Section */}
      <section className={styles['recent-posts']}>
        <div className={styles['recent-posts__header']}>
          <div className={styles['recent-posts__heading']}>
            <Link href='/posts/category/retrospective' className={styles['recent-posts__title']}>회고 📝</Link>
            <p className={styles['recent-posts__subtitle']}>지나온 과정을 돌아보며 더 나아지기 위한 기록을 남깁니다</p>
          </div>

          <Link
            href="/posts/category/retrospective"
            className={styles['recent-posts__all-link']}
            aria-label='회고 글 더 보기'
          >
            <MdOutlineChevronRight />
          </Link>
        </div>

        <div className={styles['retrospective-wrapper']}>
          {retrospectivePosts?.posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className={styles['retrospective-card']}>
              <figure className={styles['retrospective-card__thumb']}>
                <Image
                  src={post.coverPath ?? '/images/empty.webp'}
                  alt={`${post.title} 썸네일`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </figure>

              <div className={styles['retrospective-card__content']}>
                <h3 className={styles['retrospective-card__title']}>{post.title}</h3>
                <p className={styles['retrospective-card__summary']}>{post.contentSummary}</p>
                <time className={styles['retrospective-card__date']} dateTime={post.publishedAt}>
                  {post.publishedAtText}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Retrospective Posts Section */}

      {/* Troubleshooting Posts Section */}
      <section className={styles['recent-posts']}>
        <div className={styles['recent-posts__header']}>
          <div className={styles['recent-posts__heading']}>
            <Link href='/posts/category/troubleshooting' className={styles['recent-posts__title']}>Troubleshooting 🛠️</Link>
            <p className={styles['recent-posts__subtitle']}>실제 서비스에서 마주한 문제들을 분석하고 해결 과정에서 얻은 경험들을 공유합니다</p>
          </div>

          <Link
            href="/posts/category/troubleshooting"
            className={styles['recent-posts__all-link']}
            aria-label='트러블슈팅 글 더 보기'
          >
            <MdOutlineChevronRight />
          </Link>
        </div>

        <HorizontalScrollSection containerClassName={styles['troubleshooting-posts']}>
          {troubleshootingPosts?.posts.map((post) => {
            return (
              <article key={post.slug} className={styles['troubleshooting-posts__card']}>
                <Link
                  href={`/posts/${post.slug}`}
                  className={styles['troubleshooting-posts__card-link']}
                  aria-labelledby={`post-${post.slug}`}
                >
                  <figure className={styles['troubleshooting-posts__thumb']}>
                    <Image
                      src={post.coverPath ?? '/images/empty.webp'}
                      alt={`${post.title} 썸네일`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>

                  <div className={styles['troubleshooting-posts__content']}>
                    <h3 id={`post-${post.slug}`} className={styles['troubleshooting-posts__title']}>
                      {post.title}
                    </h3>
                    <p className={styles['troubleshooting-posts__summary']}>{post.contentSummary}</p>
                    <time className={styles['troubleshooting-posts__date']} dateTime={post.publishedAt}>
                      {post.publishedAtText}
                    </time>
                  </div>
                </Link>
              </article>
            );
          })}
        </HorizontalScrollSection>
      </section>
      {/* Troubleshooting Posts Section */}
    </div>
  )
}