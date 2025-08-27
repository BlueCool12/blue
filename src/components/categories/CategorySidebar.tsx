import { useEffect, useState } from 'react';

import styles from './CategorySidebar.module.css';

import { MdOutlineNumbers } from 'react-icons/md';
import { CategorySidebarSkeleton } from './CategorySidebarSkeleton';

import { Category } from '@/types/category';

interface Props {
    categories: Category[];
    loading: boolean;
    error: string | null;
    categorySlug: string | null;
    onCategorySlug: (category: string | null) => void;
}

export const CategorySidebar = ({ categories, loading, error, categorySlug, onCategorySlug }: Props) => {

    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    const toggle = (slug: string) => {
        setOpenIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(slug)) {
                newSet.delete(slug);
            } else {
                newSet.add(slug);
            }
            return newSet;
        });
    };

    if (error) throw new Error(error);

    useEffect(() => {
        if (!categorySlug) return;
        const parent = categories.find(cat => (cat.children ?? []).some(ch => ch.slug === categorySlug));
        if (parent) {
            setOpenIds(prev => (prev.has(parent.slug) ? prev : new Set(prev).add(parent.slug)));
        }
    }, [categorySlug, categories]);

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <CategorySidebarSkeleton />
            ) : (
                <nav>
                    <h3
                        className={`${styles.title} ${categorySlug === null ? styles.active : ''}`}
                        onClick={() => onCategorySlug(null)}
                    >
                        ALL
                    </h3>

                    <ul className={styles.list}>
                        {categories.map((category) => {
                            const children = category.children ?? [];

                            const isActiveParent = children.some((child) => child.slug === categorySlug);

                            return (
                                <li key={category.slug}>
                                    <button
                                        className={`${styles.link} ${category.slug === categorySlug || isActiveParent ? styles.active : ''}`}
                                        onClick={() => toggle(category.slug)}
                                    >
                                        {category.name}
                                    </button>

                                    {openIds.has(category.slug) && children.length > 0 && (
                                        <ul className={styles.subList}>
                                            {children.map((child) => (
                                                <li key={child.slug}>
                                                    <button
                                                        className={`${styles.subLink} ${categorySlug === child.slug ? styles.active : ''}`}
                                                        onClick={() => {
                                                            setOpenIds((prev) => new Set(prev).add(category.slug));
                                                            onCategorySlug(child.slug);
                                                        }}
                                                    >
                                                        <MdOutlineNumbers />{child.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                </nav>
            )}
        </aside>
    );
};