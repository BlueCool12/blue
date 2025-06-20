'use client';

import { useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { getPosts } from "@/store/admin/postSlice";

const PostList = () => {

    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector((state: RootState) => state.adminPost);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    if (error) throw new Error(error);

    return (
        <Section>
            <Title>글 목록</Title>
            <Table>
                <thead>
                    <tr>
                        <Th scope="col">ID</Th>
                        <Th scope="col">제목</Th>
                        <Th scope="col">카테고리</Th>
                        <Th scope="col">Slug</Th>
                        <Th scope="col">공개</Th>
                        <Th scope="col">삭제</Th>
                        <Th scope="col">작성일</Th>
                        <Th scope="col">수정일</Th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <Td colSpan={8}>
                                <LoadingSpinner />
                            </Td>
                        </tr>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <Tr key={post.id}>
                                <Td>{post.id}</Td>
                                <Td><Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link></Td>
                                <Td>{post.category}</Td>
                                <Td><Link href={`/posts/${post.slug}`}>{post.slug}</Link></Td>
                                <Td>{post.isPublic ? 'O' : 'X'}</Td>
                                <Td>{post.isDeleted ? 'O' : 'X'}</Td>
                                <Td>{post.createdAt}</Td>
                                <Td>{post.updatedAt}</Td>
                            </Tr>
                        ))
                    ) : (
                        <tr>
                            <EmptyTd colSpan={8}>게시글이 없습니다.</EmptyTd>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Section>
    );
};

export default PostList;

const Section = styled.section`
    padding: 1rem 5rem;
    min-width: 1200px;
`;

const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;    
    background-color: #ffffff;
`;

const Th = styled.th`
    padding: 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    text-align: center;
    color: #111111;    
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #fafafa;
    }
`;

const Td = styled.td`
    padding: 12px;
    border: 1px solid #ddd;    
    color: #333333;
    text-align: center;
`;

const EmptyTd = styled.td`
    text-align: center;
    padding: 20px;
    color: #777;
    border: 1px solid #ddd;
    background-color: #ffffff;
`;