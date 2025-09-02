import Link from 'next/link';

import styles from './CategorySidebar.module.css';

import { MdOutlineNumbers } from 'react-icons/md';

import { Category } from '@/types/category';

interface Props {
    categories: Category[];
    categorySlug: string | null;
}

export const CategorySidebar = ({ categories, categorySlug }: Props) => {

    return (
        <aside className={styles.sidebar}>
            <nav>
                <h3
                    className={`${styles.title} ${categorySlug === null ? styles.active : ''}`}
                >
                    <Link href="/posts">ALL</Link>
                </h3>

                <ul className={styles.list}>
                    {categories.map((parent) => {
                        const children = parent.children ?? [];
                        const isActiveParent = children.some((child) => child.slug === categorySlug);

                        return (
                            <li key={parent.slug}>
                                <details open={isActiveParent}>
                                    <summary className={`${styles.link} ${isActiveParent ? styles.active : ''}`}>
                                        {parent.name}
                                    </summary>

                                    {children.length > 0 && (
                                        <ul className={styles.subList}>
                                            {children.map((child) => (
                                                <li key={child.slug}>
                                                    <Link
                                                        className={`${styles.subLink} ${categorySlug === child.slug ? styles.active : ''}`}
                                                        href={`/posts/category/${child.slug}`}
                                                    >
                                                        <MdOutlineNumbers />{child.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </details>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};