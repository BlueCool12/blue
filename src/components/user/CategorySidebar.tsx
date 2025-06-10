
import styles from './CategorySidebar.module.css';

const categories = [
    { name: '전체', slug: 'all' },
    { name: '개발', slug: 'dev' },
    { name: '일상', slug: 'life' },
    { name: '리뷰', slug: 'review' },
];

export const CategorySidebar = () => {

    return (
        <aside className={styles.sidebar}>
            <nav>
                <h3 className={styles.title}>CATEGORY</h3>

                <ul className={styles.list}>
                    {categories.map((category) => (
                        <li key={category.slug}>
                            <a className={styles.link}>
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};