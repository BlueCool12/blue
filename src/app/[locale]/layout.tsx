import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import '@/app/globals.css';
import styles from "./layout.module.css";
import { pretendard } from 'fonts/pretendard';

import { routing } from '@/i18n/routing';
import { alternateLocales, localizedAlternates, ogLocale } from '@/i18n/metadata';
import { Providers } from './providers';
import { Header } from '@/components/header';
import { PageViewLogger } from '@/components/common/PageViewLogger';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Footer } from '@/components/footer';
import { FloatingFeedbackButton } from '@/components/common/FloatingFeedbackButton';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Site' });
  const alternates = localizedAlternates(locale, '/');

  return {
    metadataBase: new URL('https://pyomin.com'),
    verification: {
      google: 'a_U5y0WSCgz0M6vCAXxFu6HFYeMcpYpbxrmX25W_veQ',
    },
    applicationName: 'BLUECOOL',
    generator: 'Next.js',
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    alternates: {
      ...alternates,
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
      title: t('title'),
      description: t('ogDescription'),
      siteName: t('title'),
      url: `https://pyomin.com${alternates.canonical}`,
      locale: ogLocale(locale),
      alternateLocale: alternateLocales(locale),
      type: 'website',
      images: [
        {
          url: 'https://pyomin.com/images/og_image_resize.png',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: ['https://pyomin.com/images/og_image_resize.png'],
    },
  };
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Site' });

  return (
    <html lang={locale} suppressHydrationWarning className={`${pretendard.variable}`}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: t('title'),
              url: "https://pyomin.com",
              description: t('ogDescription'),
              inLanguage: t('htmlLang'),
              publisher: {
                "@type": "Organization",
                name: t('title'),
                logo: {
                  "@type": "ImageObject",
                  url: "https://pyomin.com/images/og_image_resize.png"
                }
              }
            }),
          }}
        />
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <PageViewLogger />
            <FloatingFeedbackButton />
            <main className={styles.content}>
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}