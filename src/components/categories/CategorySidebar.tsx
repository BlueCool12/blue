'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import styles from '@/components/categories/CategorySidebar.module.css';
import { MdOutlineNumbers } from 'react-icons/md';

import { Category } from '@/types/category';

interface Props {
  categories: Category[];
}

export const CategorySidebar = ({ categories }: Props) => {

  const pathname = usePathname();

  const getCurrentSlug = (path: string) => {
    const match = path.match(/\/category\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  const currentSlug = getCurrentSlug(pathname);

  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const parent = categories.find(p => p.children?.some(child => child.slug === currentSlug));
    if (parent) {
      setOpenSlug(parent.slug);
    }
  }, [categories, currentSlug]);

  return (
    <aside className={styles.sidebar}>
      <nav>
        <h3
          className={`${styles.title} ${currentSlug === null ? styles.active : ''}`}
        >
          <Link href="/posts">ALL</Link>
        </h3>

        <ul className={styles.list}>
          {categories.map((parent) => {
            const children = parent.children ?? [];
            const isOpen = openSlug === parent.slug;

            return (
              <li key={parent.slug}>
                <button 
                  className={`${styles.link} ${isOpen ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenSlug(isOpen ? null : parent.slug);
                  }}
                >
                  {parent.name}
                </button>

                {children.length > 0 && (
                  <div className={`${styles.subListWrapper} ${isOpen ? styles.open : ''}`}>
                    <ul className={styles.subList}>
                      {children.map((child) => (
                        <li key={child.slug}>
                          <Link
                            className={`${styles.subLink} ${currentSlug === child.slug ? styles.active : ''}`}
                            href={`/posts/category/${child.slug}`}
                          >
                            <MdOutlineNumbers />{child.name} <span className={styles.count}>({child.postCount})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};