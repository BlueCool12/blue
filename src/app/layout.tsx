import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import { Providers } from './providers';

const notoSans = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-noto',
    display: 'swap',
});

export const metadata = {
    title: {
        default: 'BlueCool',
        template: '%s | BlueCool',
    },
    description: 'BlueCool 공식 블로그 입니다.',
    keywords: ['BlueCool', 'BlueCool12', '블루쿨'],
    openGraph: {
        title: 'BlueCool',
        description: 'BlueCool 공식 블로그 입니다.',
        url: 'https://pyomin.com',
        type: 'website',
        siteName: 'BlueCool',
        images: [
            {
                url: 'https://pyomin.com/images/BlueCool1.png',
                width: 600,
                height: 600,
                alt: 'BlueCool 대표 이미지',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BlueCool',
        description: 'BlueCool 공식 블로그 입니다.',
        images: ['https://pyomin.com/images/BlueCool1.png'],
    },
    metadataBase: new URL('https://pyomin.com'),
}

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}