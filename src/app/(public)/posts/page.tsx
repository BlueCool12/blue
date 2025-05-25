'use client';

import { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { loadPosts } from "@/store/user/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/user/EmptyState";
import { RootState } from "@/store/store";

export default function PostList() {

    interface Post {
        slug: string;
        title: string;
        category: string;
        contentSummary: string;
        createdAt: string;
    }

    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector((state: RootState) => state.userPost);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (loading) { return <LoadingSpinner /> }
    if (error) throw error;
    if (posts.length === 0) return <EmptyState message="열심히 공부 중입니다..." />

    return (
        <PostListSection>
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
        </PostListSection>
    );
};

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
`;

const Meta = styled.footer`
    display: flex;        
    justify-content: end;    
    font-size: 0.8rem;
    opacity: 0.6;
`;