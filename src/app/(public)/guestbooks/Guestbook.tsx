'use client';

import styles from './Guestbook.module.css';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function GuestbookPage() {

    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const scrollToComments = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !ref.current) return;

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

        ref.current?.appendChild(script);
    }, [theme, mounted]);

    return (
        <main className={styles.container}>
            <h1>GUESTBOOK</h1>
            <Image
                alt='방명록 이미지'
                src='/images/guestbooks.png'
                width={200}
                height={200}
                className={styles.image}
                priority
            />
            <button className={styles.button} onClick={scrollToComments}>✍️ 방명록 남기러 가기</button>
            <div ref={ref} />
        </main>
    );
}