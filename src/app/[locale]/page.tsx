import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import styles from '@/app/[locale]/page.module.css';

import { MdOutlineChevronRight } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';
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

  const [t, latestPosts, categories, troubleshootingPosts, retrospectivePosts] = await Promise.all([
    getTranslations('HomePage'),
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

          <div className={styles['hero__socials']}>
            <a
              className={styles['hero__social-link']}
              href="https://github.com/BlueCool12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('heroGithubAria')}
            >
              <svg
                className={styles['hero__social-icon']}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 98 96"
                role="img"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
            </a>

            <a
              className={styles['hero__social-link']}
              href="https://www.linkedin.com/in/bluecool/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('heroLinkedinAria')}
            >
              <FaLinkedin size={22} />
            </a>

            <a
              className={styles['hero__social-link']}
              href="https://www.notion.so/Backend-Developer-2e9381b7d1078089959de45d0f34014d?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('heroNotionAria')}
            >
              <SiNotion size={20} />
            </a>
          </div>
        </div>
      </section>
      {/* Hero Section */}

      {/* Categories Section */}
      <section className={styles['category-preview']}>
        <div className={styles['category-preview__heading']}>
          <div className={styles['category-preview__title-line']}>
            <hr />
            <h2 className={styles['category-preview__title']}>
              Daily Pick
              <Image src='/images/emoji/eyes.png' alt='' width={24} height={24} className={styles['title-emoji']} />
            </h2>
            <hr />
          </div>

          <p className={styles['category-preview__subtitle']}>{t('dailyPickSubtitle')}</p>
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
                  width={80}
                  height={80}
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
              {t('latestPostsTitle')}
              <Image src='/images/emoji/star.png' alt='' width={24} height={24} className={styles['title-emoji']} />
            </Link>
            <p className={styles['recent-posts__subtitle']}>
              {t('latestPostsSubtitle')}
            </p>
          </div>

          <Link
            href="/posts"
            className={styles['recent-posts__all-link']}
            aria-label={t('latestPostsAllAria')}
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
            <Link href='/posts/category/retrospective' className={styles['recent-posts__title']}>
              {t('retrospectiveTitle')}
              <Image src='/images/emoji/memo.png' alt='' width={24} height={24} className={styles['title-emoji']} />
            </Link>
            <p className={styles['recent-posts__subtitle']}>{t('retrospectiveSubtitle')}</p>
          </div>

          <Link
            href="/posts/category/retrospective"
            className={styles['recent-posts__all-link']}
            aria-label={t('retrospectiveMoreAria')}
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
                  alt={t('thumbnailAlt', { title: post.title })}
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
            <Link href='/posts/category/troubleshooting' className={styles['recent-posts__title']}>
              {t('troubleshootingTitle')}
              <Image src='/images/emoji/tools.png' alt='' width={24} height={24} className={styles['title-emoji']} />
            </Link>
            <p className={styles['recent-posts__subtitle']}>{t('troubleshootingSubtitle')}</p>
          </div>

          <Link
            href="/posts/category/troubleshooting"
            className={styles['recent-posts__all-link']}
            aria-label={t('troubleshootingMoreAria')}
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
                      alt={t('thumbnailAlt', { title: post.title })}
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