import { getTranslations } from 'next-intl/server';
import page from '@/app/[locale]/posts/(list)/page.module.css';
import styles from '@/app/[locale]/posts/(list)/category/[category]/loading.module.css';

export default async function Loading() {
  const t = await getTranslations('Posts');
  return (
    <>
      <section className={page.section} aria-busy="true">
        <ul
          className={styles['post-list-skeleton']}
          role="status"
          aria-live="polite"
          aria-label={t('listSkeletonAria')}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i} className={styles['post-list-skeleton__item']}>
              <article className={styles['post-list-skeleton__post']}>
                <div className={styles['post-list-skeleton__title-wrapper']}>
                  <div className={`${styles['post-list-skeleton__title']} ${styles['post-list-skeleton__base']}`} />
                  <div className={`${styles['post-list-skeleton__category']} ${styles['post-list-skeleton__base']}`} />
                </div>

                <div className={`${styles['post-list-skeleton__line']} ${styles['post-list-skeleton__base']}`} />
                <div className={`${styles['post-list-skeleton__line']} ${styles['post-list-skeleton__base']}`} />
                <div className={`${styles['post-list-skeleton__line']} ${styles['post-list-skeleton__line--short']} ${styles['post-list-skeleton__base']}`} />

                <footer className={styles['post-list-skeleton__meta']}>
                  <div className={`${styles['post-list-skeleton__meta-skeleton']} ${styles['post-list-skeleton__base']}`} />
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}