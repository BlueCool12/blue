'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/navigation";
import { toast } from 'react-toastify';
import { MdSearch, MdClose, MdOutlineArrowDropDown } from 'react-icons/md';

import styles from './SearchFilters.module.css';

import type { Category } from '@/types/category';

type Props = {
  categories: Category[];
  initialKeyword?: string;
  initialCategory?: string;
};

export function SearchFilters({
  categories,
  initialKeyword = '',
  initialCategory = '',
}: Props) {
  const t = useTranslations('Posts');
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);

  const goSearch = (k: string, c: string) => {
    const params = new URLSearchParams();
    params.set('keyword', k);
    if (c) params.set('category', c);
    router.push(`/posts/search?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    if (trimmed.length < 2) {
      toast.warning(t('searchTooShort'));
      return;
    }
    goSearch(trimmed, category);
  };

  const handleCategoryChange = (next: string) => {
    setCategory(next);
    const trimmed = keyword.trim();
    if (trimmed.length >= 2) {
      goSearch(trimmed, next);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            aria-label={t('categorySelectAria')}
          >
            <option value="">{t('categoryAllOption')}</option>
            {categories.map((parent) =>
              (parent.children ?? []).length > 0 ? (
                <optgroup key={parent.slug} label={parent.name}>
                  {(parent.children ?? []).map((child) => (
                    <option key={child.slug} value={child.slug}>
                      {child.name} ({child.postCount})
                    </option>
                  ))}
                </optgroup>
              ) : null
            )}
          </select>
          <MdOutlineArrowDropDown className={styles.selectIcon} aria-hidden />
        </div>

        <div className={styles.divider} />

        <form className={styles.form} onSubmit={handleSubmit} role="search">
          <MdSearch className={styles.icon} aria-hidden />
          <input
            type="search"
            className={styles.input}
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label={t('searchInputAria')}
          />
          {keyword && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => setKeyword('')}
              aria-label={t('clearKeywordAria')}
            >
              <MdClose />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
