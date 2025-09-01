'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styled from "styled-components";

import styles from './page.module.css';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { PostListSkeleton } from "@/components/posts/PostListSkeleton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CategorySidebar } from "@/components/categories/CategorySidebar";

import { useInfinitePosts } from "@/hooks/queries/posts/useInfinitePosts";
import { useCategories } from "@/hooks/queries/categories/useCategories";
import { useIsMobile } from "@/hooks/useIsMobile";

import type { Post } from "@/types/post";

type Props = {
    startPage: number;
    size: number;
    categorySlug?: string | null;
};

export default function PostList({ startPage, size, categorySlug = null }: Props) {

    const [started, setStarted] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfinitePosts({
        category: categorySlug,
        size,
        startPage,
        enabled: false
    });

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver(async (entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;

            io.unobserve(entry.target);
            try {
                if (!started) {
                    await refetch();
                    setStarted(true);
                } else if (hasNextPage) {
                    await fetchNextPage();
                }
            } finally {
                if (document.contains(entry.target)) io.observe(entry.target);
            }
        }, { rootMargin: '200px', threshold: 0 });

        io.observe(el);
        return () => io.disconnect();
    }, [started, hasNextPage, refetch, fetchNextPage]);

    const more: Post[] = data?.pages.flatMap((p: any) => p?.posts ?? []) ?? [];

    return (
        <>
            {/* {isMobile && (
                <MobileCategorySelectWrapper>
                    <MobileCategorySelect
                        value={categorySlug ?? ''}
                        onChange={(e) =>
                            handleCategorySlug(e.target.value === '' ? null : e.target.value)
                        }
                        aria-label="글 카테고리 선택"
                    >
                        <option value="">ALL</option>
                        {categories.data?.map((parent) =>
                            parent.children && parent.children.length > 0 && (
                                <optgroup key={parent.slug} label={parent.name}>
                                    {parent.children.map((child) => (
                                        <option key={child.slug} value={child.slug}>
                                            {child.name}
                                        </option>
                                    ))}
                                </optgroup>
                            )
                        )}

                    </MobileCategorySelect>
                    <SelectIcon />
                </MobileCategorySelectWrapper>
            )} */}

            {more.map((post) => (
                <li key={post.slug} className={styles.item}>
                    <article className={styles.post}>
                        <Link href={`/posts/${post.slug}`} prefetch={false}>
                            <header className={styles.titleRow}>
                                <h2 className={styles.title}>{post.title}</h2>
                                <span className={styles.badge}>{post.category}</span>
                            </header>
                            <p className={styles.content}>{post.contentSummary}</p>
                            <footer className={styles.meta}>
                                <time dateTime={post.createdAt}>
                                    {post.createdAtText ?? post.createdAt}
                                </time>
                            </footer>
                        </Link>
                    </article>
                </li>
            ))}

            {(isFetching || isFetchingNextPage) && (
                <LoadingSpinner />
            )}

            <div ref={sentinelRef} style={{ height: 1 }} />


            {/* {!isMobile && (
                <CategorySidebar
                    categories={categories.data ?? []}
                    loading={categories.isLoading}
                    error={categories.isError ? (categories.error?.message ?? '카테고리 로딩 실패') : null}
                    categorySlug={categorySlug}
                    onCategorySlug={handleCategorySlug}
                />
            )} */}
        </>
    );
};

// 모바일 카테고리 시작
const MobileCategorySelectWrapper = styled.div`
  position: relative;
  padding: 0.75rem 0;
  margin: 0 1rem;
  border-bottom: 1px solid var(--border-color);
`;

const MobileCategorySelect = styled.select`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem; /* 오른쪽 여백 추가 */
  font-size: 0.9rem;
  border-radius: 6px;
  color: var(--text-color);
  appearance: none; /* 기본 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;  
  border: 1px solid var(--border-color);
`;

const SelectIcon = styled(MdOutlineArrowDropDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-color);
  font-size: 1.2rem;
`;
// 모바일 카테고리 끝