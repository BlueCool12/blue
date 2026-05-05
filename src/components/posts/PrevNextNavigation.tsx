import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import styles from './PrevNextNavigation.module.css';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { PostSummary } from '@/types/post';

interface PrevNextNavigationProps {
    prev?: PostSummary | null;
    next?: PostSummary | null;
}

export const PrevNextNavigation = async ({ prev, next }: PrevNextNavigationProps) => {
    const t = await getTranslations('Posts');
    return (
        <nav aria-label={t('prevNextNavAria')} className={styles.nav}>
            {prev ? (
                <Link href={`/posts/${prev.slug}`} className={styles.link}>
                    <div className={styles.prevLabel}>{t('prevLabel')}</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <MdArrowCircleLeft size={24} className={styles.icon} />
                        <div className={styles.title}>{prev.title}</div>
                    </div>
                </Link>
            ) : (
                <div className={styles.link}>
                    <div className={styles.prevLabel}>{t('prevLabel')}</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <MdArrowCircleLeft size={24} className={styles.icon} />
                        <div className={styles.title}>{t('prevEmpty')}</div>
                    </div>
                </div>
            )}
            {next ? (
                <Link href={`/posts/${next.slug}`} className={`${styles.link}`}>
                    <div className={styles.nextLabel}>{t('nextLabel')}</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <div className={styles.title}>{next.title}</div>
                        <MdArrowCircleRight size={24} className={styles.icon} />
                    </div>
                </Link>
            ) : (
                <div className={`${styles.link}`}>
                    <div className={styles.nextLabel}>{t('nextLabel')}</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <div className={styles.title}>{t('nextEmpty')}</div>
                        <MdArrowCircleRight size={24} className={styles.icon} />
                    </div>
                </div>
            )}
        </nav>
    );
};