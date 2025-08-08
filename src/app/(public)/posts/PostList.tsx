'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import styled from "styled-components";

import { EmptyState } from "@/components/user/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CategorySidebar } from "@/components/user/categories/CategorySidebar";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { useInfinitePosts } from "@/hooks/queries/posts/useInfinitePosts";
import { useCategories } from "@/hooks/queries/categories/useCategories";
import { useIsMobile } from "@/hooks/useIsMobile";

import type { Post } from "@/types/post";
import { useEffect, useRef } from "react";

export default function PostList({ category }: { category?: string }) {

    const router = useRouter();
    const params = useParams();
    const categorySlug = typeof category === 'string'
        ? category
        : typeof params?.category === 'string'
            ? decodeURIComponent(params.category)
            : null;

    const { isMobile, ready } = useIsMobile(1024);
    const size = isMobile ? 7 : 10;

    const posts = useInfinitePosts(categorySlug, size, ready);
    const categories = useCategories();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ready || posts.isLoading || !posts.hasNextPage || posts.isFetchingNextPage) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                posts.fetchNextPage();
            }
        });

        const el = loadMoreRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [ready, posts.hasNextPage, posts.isFetchingNextPage, posts.fetchNextPage, posts.isLoading, loadMoreRef]);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [categorySlug]);

    const handleCategorySlug = (category: string | null) => {
        router.replace(category ? `/posts/category/${encodeURIComponent(category)}` : '/posts');
    };

    if (posts.isError) throw new Error(posts.error.message ?? "글 목록 조회 실패");

    const allPosts = posts.data?.pages?.flatMap((page) => page?.posts ?? []) ?? [];

    return (
        <>
            {isMobile && (
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
            )}

            <PostListSection>
                {/* 처음 로딩 */}
                {(!ready || posts.isLoading) && <LoadingSpinner />}

                {/* 데이터가 없는 경우 */}
                {ready && !posts.isLoading && allPosts.length === 0 && (
                    <EmptyState message="열심히 공부 중입니다..." />
                )}

                {/* 게시글 리스트 */}
                {allPosts.length > 0 && (
                    <>
                        <PostListWrapper>
                            {allPosts.map((post) => (
                                <ListItem key={post.slug}>
                                    <Post>
                                        <Link href={`/posts/${post.slug}`}>
                                            <TitleWrapper>
                                                <Title>{post.title}</Title>
                                                <Category>{post.category}</Category>
                                            </TitleWrapper>
                                            <Content>{post.contentSummary}</Content>
                                            <Meta>
                                                <time dateTime={post.createdAt}>{post.createdAt}</time>
                                            </Meta>
                                        </Link>
                                    </Post>
                                </ListItem>
                            ))}
                        </PostListWrapper>

                        {posts.isFetchingNextPage && <LoadingSpinner />}
                        <div ref={loadMoreRef} style={{ height: "1px" }} />
                    </>
                )}
            </PostListSection>


            {!isMobile && (
                <CategorySidebar
                    categories={categories.data ?? []}
                    loading={categories.isLoading}
                    error={categories.isError ? (categories.error?.message ?? '카테고리 로딩 실패') : null}
                    categorySlug={categorySlug}
                    onCategorySlug={handleCategorySlug}
                />
            )}
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

const PostListSection = styled.section`
    padding: 1rem;    
`;

const PostListWrapper = styled.ul`
    width: 100%;    
`;

const ListItem = styled.li`
    list-style: none;    
    display: flex;
    flex-direction: column;            
    padding: 0 1rem;

    @media (max-width: 768px) {
        padding: 0;
    }
`;

const Post = styled.article`
    padding: 1.2rem 0 0.8rem;    
    border-bottom: 2px solid var(--border-color);

    &:hover {
        border-bottom: 2px solid var(--theme-color-9);
    }

    a {
        display: block;
        text-decoration: none;
        color: inherit;
    }
`;

const TitleWrapper = styled.header`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Title = styled.h2`
    flex: 1;
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Category = styled.span`    
    display: inline-block;
    background-color: var(--theme-color-9);
    color: var(--theme-color-1);
    border-radius: 9999px;
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
`;

const Content = styled.p`
    margin: 0.5rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
    opacity: 0.8;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
`;

const Meta = styled.footer`
    display: flex;        
    justify-content: end;    
    font-size: 0.8rem;
    opacity: 0.6;
`;