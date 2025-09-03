import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.css';

import { MdOutlineChevronRight } from 'react-icons/md';
import HeroClient from '@/components/HeroClient';

import { getDailySeed, seededShuffle } from '@/lib/utils/dailyShuffle';

import { PostLatest } from '@/types/post';
import { postService } from '@/services/postService';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';

export const revalidate = 300;

async function getLatestPosts(): Promise<PostLatest[]> {
    return await postService.getLatestPosts();
}

async function getCategories(): Promise<Category[]> {
    return await categoryService.getCategories();
}

export default async function Home() {

    const [latestPosts, categories] = await Promise.all([
        getLatestPosts(),
        getCategories(),
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
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
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
                        <Link href='/posts' className={styles['recent-posts__title']}>최신 글 🌟</Link>
                        <p className={styles['recent-posts__subtitle']}>새로 올라온 글들을 확인해보세요</p>
                    </div>

                    <Link href="/posts" className={styles['recent-posts__all-link']} aria-label='전체 글 목록 보기'><MdOutlineChevronRight /></Link>
                </div>

                <div className={styles['recent-posts__card-wrapper']}>
                    {latestPosts?.map((post: PostLatest) => (
                        <Link key={post.id} href={`/posts/${post.slug}`} className={styles['recent-posts__link']}>
                            <article className={styles['recent-posts__card']}>
                                <div className={styles['recent-posts__content']}>
                                    <h3 className={styles['recent-posts__card-title']}>{post.title}</h3>

                                    <time className={styles['recent-posts__date']} dateTime={post.createdAt}>
                                        {post.createdAtText}
                                    </time>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
            {/* Latest Posts Section */}
        </div>
    )
}