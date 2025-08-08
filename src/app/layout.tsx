import { Metadata } from 'next';
import Script from 'next/script';

import { pretendard } from 'fonts/pretendard';

import { Providers } from './providers';

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}