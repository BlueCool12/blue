import { useState } from 'react';

import styles from './CategorySidebar.module.css';

import { MdOutlineNumbers } from 'react-icons/md';
import { LoadingSpinner } from '../common/LoadingSpinner';

import { Category } from '@/types/category';

interface Props {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export const CategorySidebar = ({ categories, loading, error, selectedCategory, onSelectCategory }: Props) => {

    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    const toggle = (name: string) => {
        setOpenIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(name)) {
                newSet.delete(name);
            } else {
                newSet.add(name);
            }
            return newSet;
        });
    };

    if (error) throw new Error(error);

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <nav>
                    <h3
                        className={`${styles.title} ${selectedCategory === null ? styles.active : ''}`}
                        onClick={() => onSelectCategory(null)}
                    >
                        ALL
                    </h3>

                    <ul className={styles.list}>
                        {categories.map((category) => {
                            const children = category.children ?? [];

                            const isActiveParent = children.some((child) => child.name === selectedCategory);

                            return (
                                <li key={category.name}>
                                    <button
                                        className={`${styles.link} ${category.name === selectedCategory || isActiveParent ? styles.active : ''}`}
                                        onClick={() => toggle(category.name)}
                                    >
                                        {category.name}
                                    </button>

                                    {openIds.has(category.name) && children.length > 0 && (
                                        <ul className={styles.subList}>
                                            {children.map((child) => (
                                                <li key={child.name}>
                                                    <button
                                                        className={`${styles.subLink} ${selectedCategory === child.name ? styles.active : ''}`}
                                                        onClick={() => {
                                                            setOpenIds((prev) => new Set(prev).add(category.name));
                                                            onSelectCategory(child.name);
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