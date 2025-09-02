'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import styles from '@/app/page.module.css';

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

export default function HeroClient() {

    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [visible, setVisible] = useState(false);

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
        </>
    );
};