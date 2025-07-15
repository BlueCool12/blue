'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './page.module.css';

import { MdOutlineStar } from 'react-icons/md';
import Link from 'next/link';
import { useLatestPosts } from '@/hooks/queries/posts/useLatestPosts';
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

    const { data: latestPosts, isLoading, isError } = useLatestPosts();

    const typingRef = useRef<NodeJS.Timeout | null>(null);

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
        <>
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
                        <button onClick={() => setVisible((prev) => !prev)} className={styles['hero__about-button']}>
                            <MdOutlineStar size={20} color='var(--theme-color-9)' />
                        </button>
                        <Link href={'/about'} className={`${styles['hero__about-label']} ${visible ? styles['hero__about-label--show'] : ''}`}>
                            About Me
                        </Link>
                    </div>

                </div>

                <Image
                    src='/images/main.webp'
                    alt='메인 페이지 이미지'
                    width={300}
                    height={300}
                    priority
                    className={styles.hero__image}
                />
            </section>

            <section className={styles['recent-posts']}>
                <h2 className={styles['recent-posts__title']}>최신글</h2>

                {isLoading && (
                    <div className={styles['recent-posts__skeleton-wrapper']}>
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className={styles['recent-posts__skeleton']}>
                                <div className={styles['skeleton-title']} />
                                <div className={styles['skeleton-date']} />
                            </div>
                        ))}
                    </div>
                )}

                {isError && (
                    <p className={styles['recent-posts__error']}>최신글을 불러오는 데 실패했어요 😢</p>
                )}

                {latestPosts?.map((post: PostLatest) => (
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
        </>
    )
}