import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { localizedAlternates } from "@/i18n/metadata";

import GuestbookPage from "./Guestbook";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'GuestbookPage' });
    const alternates = localizedAlternates(locale, '/guestbooks');
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates,
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: `https://pyomin.com${alternates.canonical}`,
        },
        twitter: {
            title: t('metaTitle'),
            description: t('metaDescription'),
        },
    };
}

export default function GuestBookPage() {
    return <GuestbookPage />
}