import Link from 'next/link';
import styles from './PrevNextNavigation.module.css';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { PostSummary } from '@/types/post';

interface PrevNextNavigationProps {
    prev?: PostSummary | null;
    next?: PostSummary | null;
}

export const PrevNextNavigation = ({ prev, next }: PrevNextNavigationProps) => {
    return (
        <nav aria-label="이전 다음 글 이동" className={styles.nav}>
            {prev ? (
                <Link href={`/posts/${prev.slug}`} className={styles.link}>
                    <div className={styles.prevLabel}>이전 글</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <MdArrowCircleLeft size={24} className={styles.icon} />
                        <div className={styles.title}>{prev.title}</div>
                    </div>
                </Link>
            ) : (
                <div className={styles.link}>
                    <div className={styles.prevLabel}>이전 글</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <MdArrowCircleLeft size={24} className={styles.icon} />
                        <div className={styles.title}>(· . · ) 이전 글이 없습니다</div>
                    </div>
                </div>
            )}
            {next ? (
                <Link href={`/posts/${next.slug}`} className={`${styles.link}`}>
                    <div className={styles.nextLabel}>다음 글</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <div className={styles.title}>{next.title}</div>
                        <MdArrowCircleRight size={24} className={styles.icon} />
                    </div>
                </Link>
            ) : (
                <div className={`${styles.link}`}>
                    <div className={styles.nextLabel}>다음 글</div>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                        <div className={styles.title}>다음 글이 없습니다 ( · . ·)</div>
                        <MdArrowCircleRight size={24} className={styles.icon} />
                    </div>
                </div>
            )}
        </nav>
    );
};
