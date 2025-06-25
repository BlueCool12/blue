'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import styled from "styled-components";

import { EmptyState } from "@/components/user/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CategorySidebar } from "@/components/user/CategorySidebar";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { RootState } from "@/store/store";
import { loadPosts } from "@/store/user/postSlice";
import { fetchCategories } from "@/store/user/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useIsMobile } from "@/hooks/useIsMobile";

import type { Post } from "@/types/post";

export default function PostList() {

    const dispatch = useAppDispatch();

    const isMobile = useIsMobile(1024);

    const { posts, loading: postLoading, error: postError } = useAppSelector((state: RootState) => state.userPost);
    const { categories, loading: categoryLoading, error: categoryError } = useAppSelector((state: RootState) => state.userCategory);

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const handleSelectedCategory = (category: string | null) => {
        const newParams = new URLSearchParams(searchParams);
        if (category) {
            newParams.set('category', category);
        } else {
            newParams.delete('category');
        }
        router.replace(`/posts?${newParams.toString()}`);
    };

    useEffect(() => {
        dispatch(loadPosts(selectedCategory));
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (postError) throw new Error(postError);

    return (
        <>
            {isMobile && (
                <MobileCategorySelectWrapper>
                    <MobileCategorySelect
                        value={selectedCategory ?? ''}
                        onChange={(e) =>
                            handleSelectedCategory(e.target.value === '' ? null : e.target.value)
                        }
                    >
                        <option value="">ALL</option>
                        {categories.map((parent) =>
                            parent.children && parent.children.length > 0 && (
                                <optgroup key={parent.name} label={parent.name}>
                                    {parent.children.map((child) => (
                                        <option key={child.name} value={child.name}>
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
                {postLoading ? (
                    <LoadingSpinner />
                ) : posts.length === 0 ? (
                    <EmptyState message="열심히 공부 중입니다..." />
                ) : (
                    <PostListWrapper>
                        {posts.map((post: Post) => (
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
                )}
            </PostListSection>

            {!isMobile && (
                <CategorySidebar
                    categories={categories}
                    loading={categoryLoading}
                    error={categoryError}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectedCategory}
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