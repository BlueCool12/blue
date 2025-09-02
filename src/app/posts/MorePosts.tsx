'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";

import styles from './page.module.css';

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { useInfinitePosts } from "@/hooks/queries/posts/useInfinitePosts";

import type { PagedPost, Post } from "@/types/post";

type Props = {
    startPage: number | null;
    size: number;
    categorySlug?: string | null;
};

export default function MorePosts({ startPage, size, categorySlug = null }: Props) {

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinitePosts({
        category: categorySlug,
        size,
        startPage: startPage ?? 2,
        enabled: startPage !== null,
    });

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver(async (entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting || isFetchingNextPage) return;

            io.unobserve(entry.target);
            try {
                if (hasNextPage) {
                    await fetchNextPage();
                }
            } finally {
                if (document.contains(entry.target)) io.observe(entry.target);
            }
        }, { rootMargin: '200px', threshold: 0 });

        io.observe(el);
        return () => io.disconnect();
    }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

    const more: Post[] = data?.pages.flatMap((p: PagedPost) => p?.posts ?? []) ?? [];

    return (
        <>
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

            {(isFetchingNextPage) && (
                <LoadingSpinner />
            )}

            <div ref={sentinelRef} style={{ height: 1 }} />
        </>
    );
};