import { Noto_Sans_KR } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';

import { Providers } from './providers';

const notoSans = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-noto',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'BlueCool',
        template: '%s | BlueCool',
    },
    description: 'BlueCool 공식 블로그 입니다.',
    keywords: ['BlueCool', 'BlueCool12', '블루쿨'],
    metadataBase: new URL('https://pyomin.com'),
    verification: {
        google: 'a_U5y0WSCgz0M6vCAXxFu6HFYeMcpYpbxrmX25W_veQ',
    },
    icons: [
        {
            rel: 'icon',
            url: '/favicon.ico?v=2',
        }
    ],
    openGraph: {
        title: 'BlueCool',
        description: 'BlueCool 공식 블로그 입니다.',
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
        description: 'BlueCool 공식 블로그 입니다.',
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
        <html lang="ko" suppressHydrationWarning className={notoSans.variable}>
            <body>
                {/* 구글 애널리틱스 스크립트 */}
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
                                gtag('config', 'G-GHCGQG92ZD');
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
                            description: "BlueCool 공식 블로그입니다.",
                            inLanguage: "ko-KR"
                        }),
                    }}
                />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}