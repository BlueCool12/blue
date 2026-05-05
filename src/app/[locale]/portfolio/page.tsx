import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { localizedAlternates } from '@/i18n/metadata';

import ProjectGallery from './ProjectGallery';
import styles from './page.module.css';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Portfolio' });
    const alternates = localizedAlternates(locale, '/portfolio');
    const title = t('metaTitle');
    const description = t('metaDescription');

    return {
        title,
        description,
        alternates,
        openGraph: {
            title,
            description,
            url: `https://pyomin.com${alternates.canonical}`,
        },
        twitter: {
            title,
            description,
        },
    };
}

const Portfolio = () => {
    return (
        <div className={styles['wrapper']}>
            <ProjectGallery />
        </div>
    );
};

export default Portfolio;
