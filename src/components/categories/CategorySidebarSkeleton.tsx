import styles from './CategorySidebar.module.css';
import skeleton from './CategorySidebarSkeleton.module.css';

export const CategorySidebarSkeleton = () => {
    return (
        <aside className={styles.sidebar}>
            <nav>
                <h3
                    className={`${styles.title} ${skeleton.box}`}
                    style={{
                        width: '60%',
                        margin: '0.5rem 0 1rem'
                    }}
                />
                <ul className={styles.list}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                            <div className={`${styles.link} ${skeleton.box}`} style={{ width: '90%' }} />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
