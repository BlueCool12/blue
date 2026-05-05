'use client';

import { Link } from '@/i18n/navigation';
import { useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useTranslations } from 'next-intl';
import styles from '@/app/[locale]/page.module.css';

export default function HeroClient() {
    const t = useTranslations('HomePage');
    const greetings = useMemo(() => t.raw('greetings') as string[], [t]);

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
    }, [displayedText, isDeleting, index, greetings]);

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
                {t('heroVisitorText')}<br />
                <span className={styles.greeting}>
                    {displayedText}
                </span>
            </p>

            <div className={styles.hero__about}>
                <button
                    onClick={() => setVisible((prev) => !prev)}
                    className={styles['hero__about-button']}
                    aria-label={t('heroAboutToggleAria')}
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