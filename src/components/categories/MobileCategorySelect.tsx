'use client';

import { useParams, useRouter } from "next/navigation";

import styles from '@/components/categories/MobileCategorySelect.module.css';
import { MdOutlineArrowDropDown } from "react-icons/md";

import { Category } from "@/types/category"

type Props = {
  categories: Category[];
}

export default function MobileCategorySelect({ categories }: Props) {

  const router = useRouter();
  const params = useParams();

  const current = typeof params?.category === 'string'
    ? decodeURIComponent(params.category)
    : '';

  const handleChange = (v: string) => {
    if (!v) router.push('/posts');
    else router.push(`/posts/category/${v}`);
  };

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <select
          className={styles.select}
          value={current}
          aria-label="글 카테고리 선택"
          onChange={(e) =>
            handleChange(e.target.value)
          }
        >
          <option value="">ALL</option>
          {categories.map((parent) =>
            (parent.children ?? []).length > 0 ? (
              <optgroup key={parent.slug} label={parent.name}>
                {(parent.children ?? []).map((child) => (
                  <option key={child.slug} value={child.slug}>
                    {child.name}
                  </option>
                ))}
              </optgroup>
            ) : null
          )}
        </select>
        <MdOutlineArrowDropDown className={styles.icon} aria-hidden />
      </div>
    </>
  );
}