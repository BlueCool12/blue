'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            const isActiveParent = children.some((child) => child.slug === currentSlug);

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
                            className={`${styles.subLink} ${currentSlug === child.slug ? styles.active : ''}`}
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