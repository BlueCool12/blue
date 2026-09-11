import { getTranslations } from 'next-intl/server';

import styles from './Footer.module.css';

import { MdRssFeed } from 'react-icons/md';

export const Footer = async () => {
    const t = await getTranslations('Footer');

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles['footer__content']}>
                    <a
                        className={styles['footer__rss-link']}
                        href="/rss.xml"
                        title={t('rssAriaLabel')}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('rssAriaLabel')}
                    >
                        <MdRssFeed size={16} />
                    </a>

                    <p className={styles['footer__text']}>© 2025-2026 BlueCool12 All rights reserved.</p>
                </div>
            </footer >
        </>
    );
};
