import { ReactNode, Suspense } from 'react';
import Link from 'next/link';

import '@/app/globals.css';
import '@/components/admin/editor/ckeditor.css';
import styles from './layout.module.css';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default async function MainLayout({ children }: { children: ReactNode }) {

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>BlueCool12</header>
            <div className={styles.body}>
                <nav className={styles.sidebar}>
                    <Link href="/admin" className={styles.navItem}>대시보드</Link>
                    <Link href="/admin/posts" className={styles.navItem}>글 목록</Link>
                    <Link href="/admin/posts/write" className={styles.navItem}>글 작성</Link>
                    <Link href="/admin/categories" className={styles.navItem}>카테고리 관리</Link>
                    <Link href="https://github.com/BlueCool12/blue/issues/1" className={styles.navItem} target='_blank' rel='noopener noreferrer'>방명록 관리</Link>
                </nav>
                <main className={styles.main}>
                    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
                </main>
            </div>
        </div>
    );
};