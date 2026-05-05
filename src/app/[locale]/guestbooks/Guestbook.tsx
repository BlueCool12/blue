'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from './Guestbook.module.css';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function GuestbookPage() {

    const t = useTranslations('GuestbookPage');
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const scrollToComments = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !ref.current) return;

        setIsLoading(true);

        ref.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('repo', 'BlueCool12/blue');
        script.setAttribute('issue-term', 'guestbooks');

        const appliedTheme =
            theme === 'system'
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark-blue'
                    : 'github-light'
                : theme === 'dark'
                    ? 'dark-blue'
                    : 'github-light';

        script.setAttribute('theme', appliedTheme);

        script.onload = () => setIsLoading(false);

        ref.current?.appendChild(script);
    }, [theme, mounted]);

    return (
        <div className={styles.container}>            
            <Image
                alt={t('imageAlt')}
                src='/images/guestbooks.webp'
                width={200}
                height={200}
                className={styles.image}
                priority
            />
            <button className={styles.button} onClick={scrollToComments}>{t('writeButton')}</button>

            {isLoading && (
                <LoadingSpinner />
            )}

            <div ref={ref} lang="ko" />
        </div>
    );
}