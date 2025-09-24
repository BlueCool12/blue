import { Metadata } from 'next';
import Script from 'next/script';

import '@/app/globals.css';
import styles from "./layout.module.css";
import { pretendard } from 'fonts/pretendard';

import { Providers } from './providers';
import { Header } from '@/components/header';
import { PageViewLogger } from '@/components/common/PageViewLogger';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
    metadataBase: new URL('https://pyomin.com'),
    verification: {
        google: 'a_U5y0WSCgz0M6vCAXxFu6HFYeMcpYpbxrmX25W_veQ',
    },
    applicationName: 'BlueCool',
    generator: 'Next.js',
    icons: [
        {
            rel: 'icon',
            url: '/favicon.ico',
        }
    ],
    title: {
        default: 'BlueCool',
        template: '%s | BlueCool',
    },
    description: 'BlueCool은 실전 웹 개발부터 서버 운영, DevOps 환경 구축까지 다양한 인사이트를 전하는 개발자 블로그입니다.',
    keywords: ['BlueCool', 'BlueCool12', '블루쿨', '개발 블로그', '개발자 블로그', '풀스택 개발자', '웹 개발', '프론트엔드', '백엔드'],
    alternates: {
        canonical: '/',
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
}

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning className={`${pretendard.variable}`}>
            <body>
                {/* 구글 애드센스 */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7027574538017618"
                    crossOrigin="anonymous"
                ></script>
                {/* 구글 애널리틱스 */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-GHCGQG92ZD"
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-GHCGQG92ZD', { debug_mode: false });
                                `,
                    }}
                />
                {/* JSON-LD */}
                <Script
                    id="jsonld-website"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "BlueCool",
                            url: "https://pyomin.com",
                            description: "개발자 BlueCool이 전하는 실전 웹 개발과 서버 운영 이야기",
                            inLanguage: "ko-KR",
                            publisher: {
                                "@type": "Organization",
                                name: "BlueCool",
                                logo: {
                                    "@type": "ImageObject",
                                    url: "https://pyomin.com/images/og_image_resize.png"
                                }
                            }
                        }),
                    }}
                />
                <Providers>
                    <Header />
                    <PageViewLogger />
                    <main className={styles.content}>
                        <Suspense fallback={<LoadingSpinner />}>
                            {children}
                        </Suspense>
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}