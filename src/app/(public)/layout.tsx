import type { Metadata } from 'next';
import { Suspense } from "react";

import '@/app/globals.css';
import styles from "./layout.module.css";

import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PageViewLogger } from '@/components/common/PageViewLogger';

export const metadata: Metadata = {
    title: {
        default: 'BlueCool',
        template: '%s | BlueCool',
    },
    description: 'BlueCool은 실전 웹 개발부터 서버 운영, DevOps 환경 구축까지 다양한 인사이트를 전하는 개발자 블로그입니다.',
    keywords: ['BlueCool', 'BlueCool12', '블루쿨', '개발 블로그', '개발자 블로그', '풀스택 개발자', '웹 개발', '프론트엔드', '백엔드'],
    alternates: {
        types: {
            'application/rss+xml': 'https://pyomin.com/rss.xml',
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    openGraph: {
        title: 'BlueCool',
        description: '개발자 BlueCool이 전하는 실전 웹 개발과 서버 운영 이야기',
        siteName: 'BlueCool',
        url: 'https://pyomin.com',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: 'https://pyomin.com/images/og_image_resize.png',
                width: 1200,
                height: 630,
                alt: 'BlueCool 대표 이미지',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BlueCool',
        description: '개발자 BlueCool이 전하는 실전 웹 개발과 서버 운영 이야기',
        images: ['https://pyomin.com/images/og_image_resize.png'],
    },
};

export default function UserMainLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <PageViewLogger />
            <main className={styles.content}>
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </>
    );
};