import styles from './PostListSkeleton.module.css';

type Props = { count?: number };

export function PostListSkeleton({ count = 7 }: Props) {
    return (
        <ul
            className={styles['post-list-skeleton']}
            role="status"
            aria-live="polite"
            aria-label="목록 불러오는 중"
        >
            {Array.from({ length: count }).map((_, i) => (
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
    );
}