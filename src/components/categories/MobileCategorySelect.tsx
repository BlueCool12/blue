'use client';

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import styles from '@/components/categories/MobileCategorySelect.module.css';
import { MdOutlineArrowDropDown } from "react-icons/md";

import { Category } from "@/types/category"

type Props = {
  categories: Category[];
}

export default function MobileCategorySelect({ categories }: Props) {

  const t = useTranslations('Posts');
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
          aria-label={t('mobileCategoryAria')}
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
                    {child.name} ({child.postCount})
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