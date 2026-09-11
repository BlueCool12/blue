'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

import styles from './Guestbook.module.css';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function GuestbookPage() {

    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
            {isLoading && (
                <LoadingSpinner />
            )}

            <div ref={ref} lang="ko" />
        </div>
    );
}