'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      toast.warning('검색어는 2글자 이상 입력해주세요.');
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
            aria-label="카테고리 선택"
          >
            <option value="">전체</option>
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
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="게시글 검색"
          />
          {keyword && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => setKeyword('')}
              aria-label="검색어 지우기"
            >
              <MdClose />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
