'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.css';

import { MdOutlineStar, MdOutlineChevronRight } from 'react-icons/md';

import { useLatestPosts } from '@/hooks/queries/posts/useLatestPosts';
import { useCategories } from '@/hooks/queries/categories/useCategories';

import { getDailySeed, seededShuffle } from '@/lib/utils/dailyShuffle';

import { PostLatest } from '@/types/post';

const greetings = [
    '환영합니다 :D',
    '반가워요 XD',
    '어서오세요 ^o^',
    '함께 공부해요 =D',
    '좋은 하루 되세요 :>',
    "사랑합니다 :p",
    '고맙습니다 =]',
    '행복하세요 =D',
    '감사합니다 ^_^',
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const [visible, setVisible] = useState(false);

    const latestPosts = useLatestPosts();

    const categories = useCategories();

    const typingRef = useRef<NodeJS.Timeout | null>(null);

    const shuffledChildren = useMemo(() => {
        const allChildren = categories.data?.flatMap((parent) => parent.children ?? []) ?? [];
        return seededShuffle(allChildren, getDailySeed()).slice(0, 3);
    }, [categories.data]);

    useEffect(() => {
        const current = greetings[index];
        const charIndex = displayedText.length;

        if (typingRef.current) clearTimeout(typingRef.current);

        typingRef.current = setTimeout(() => {
            if (!isDeleting) {
                // 타이핑 중
                if (charIndex < current.length) {
                    setDisplayedText(current.slice(0, charIndex + 1));
                } else {
                    // 다 타이핑했으면 대기 후 삭제 시작
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                // 삭제 중
                if (charIndex > 0) {
                    setDisplayedText(current.slice(0, charIndex - 1));
                } else {
                    // 삭제 완료 → 다음 텍스트로 전환
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % greetings.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => {
            if (typingRef.current) clearTimeout(typingRef.current);
        };
    }, [displayedText, isDeleting, index]);

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>

                <div className={styles.hero__text}>

                    <h1 className={styles.hero__title}>
                        {'Hello, World!'.split('').map((char, i) => (
                            <span
                                key={i}
                                className={styles.letter}
                                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>

                    <p className={styles.hero__description}>
                        블로그에 방문하신 여러분<br />
                        <span className={styles.greeting}>
                            {displayedText}
                        </span>
                    </p>

                    <div className={styles.hero__about}>
                        <button
                            onClick={() => setVisible((prev) => !prev)}
                            className={styles['hero__about-button']}
                            aria-label='About Me 보기 토글'
                        >
                            <MdOutlineStar size={20} className={styles.starIcon} />
                        </button>
                        <Link href={'/about'} className={`${styles['hero__about-label']} ${visible ? styles['hero__about-label--show'] : ''}`}>
                            About Me
                        </Link>
                    </div>

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
                                    src={`/images/categories/svgrepo_${encodeURIComponent(category.name)}.svg`}
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

                {latestPosts.isLoading && (
                    <div className={styles['recent-posts__skeleton-wrapper']}>
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className={styles['recent-posts__skeleton']}>
                                <div className={styles['skeleton-title']} />
                                <div className={styles['skeleton-date']} />
                            </div>
                        ))}
                    </div>
                )}

                {latestPosts.isError && (
                    <p className={styles['recent-posts__error']}>최신 글을 불러오는 데 실패했어요 😢</p>
                )}

                {latestPosts.data?.map((post: PostLatest) => (
                    <Link key={post.id} href={`/posts/${post.slug}`} className={styles['recent-posts__link']}>
                        <article className={styles['recent-posts__card']}>
                            <div className={styles['recent-posts__content']}>
                                <h3 className={styles['recent-posts__card-title']}>{post.title}</h3>

                                <time className={styles['recent-posts__date']} dateTime={post.createdAt}>
                                    {post.createdAt}
                                </time>
                            </div>
                        </article>
                    </Link>
                ))}
            </section>
            {/* Latest Posts Section */}
        </div>
    )
}