'use client';

import { useRouter } from "next/navigation";

import styles from './MobileCategorySelect.module.css';
import { MdOutlineArrowDropDown } from "react-icons/md";

import { Category } from "@/types/category"

type Props = {
    categories: Category[];
    current?: string | null;
}

export default function MobileCategorySelect({ categories, current = null }: Props) {

    const router = useRouter();

    const handleChange = (v: string) => {
        if (!v) router.push('/posts');
        else router.push(`/posts/category/${v}`);
    };

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <select
                    className={styles.select}
                    defaultValue={current ?? ''}
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