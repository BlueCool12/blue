import './global.css';
import '@/components/admin/editor/ckeditor.css';
import styles from './layout.module.css';

import { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: { children: ReactNode }) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/admin/login');
    }

    const res = await fetch('https://bluecool.pyomin.com/api/auth/me', {
        headers: {
            Cookie: `token=${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        redirect('/admin/login');
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>BlueCool12</header>
            <div className={styles.body}>
                <nav className={styles.sidebar}>
                    <Link href="/admin" className={styles.navItem}>대시보드</Link>
                    <Link href="/admin/posts" className={styles.navItem}>글 목록</Link>
                    <Link href="/admin/posts/write" className={styles.navItem}>글 작성</Link>
                </nav>
                <main>
                    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
                </main>
            </div>
        </div>
    );
};