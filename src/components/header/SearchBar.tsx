'use client';

import Link from 'next/link';
import { MdSearch } from 'react-icons/md';

import styles from './SearchBar.module.css';
import headerStyles from './Header.module.css';

export function SearchBar() {
  return (
    <Link
      href="/posts/search"
      className={styles.iconLink}
      aria-label="검색"
      prefetch={false}
    >
      <MdSearch size={24} className={headerStyles['header__icon']} />
    </Link>
  );
}
