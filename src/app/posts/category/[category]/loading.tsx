import page from '../../page.module.css';
import styles from './loading.module.css';

function Box({ h = 40, w = '100%' }: { h?: number, w?: string | number }) {
    return (
        <div
            aria-hidden
            style={{
                height: h,
                width: w,
                borderRadius: 12,
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
            }}
        />
    );
}

export default function Loading() {
    return (
        <>
            {/* 모바일 카테고리 셀렉트 자리 */}
            <div className={page['posts--mobile']}>
                <Box h={40} />
            </div>

            {/* 좌측 카테고리 사이드바 자리 */}
            <aside aria-hidden>
                <Box h={300} w={220} />
            </aside>

            {/* 본문 목록 스켈레톤 */}
            <section className={page.section} aria-busy="true">
                <ul
                    className={styles['post-list-skeleton']}
                    role="status"
                    aria-live="polite"
                    aria-label="목록 불러오는 중"
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