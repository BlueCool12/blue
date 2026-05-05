'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MdSearch } from 'react-icons/md';

import styles from './SearchBar.module.css';
import headerStyles from './Header.module.css';

export function SearchBar() {
  const t = useTranslations('Header');
  return (
    <Link
      href="/posts/search"
      className={styles.iconLink}
      aria-label={t('searchAria')}
      prefetch={false}
    >
      <MdSearch size={24} className={headerStyles['header__icon']} />
    </Link>
  );
}
