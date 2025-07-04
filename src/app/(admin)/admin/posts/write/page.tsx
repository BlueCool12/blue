'use client';

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";

import { useAppDispatch } from '@/store/hooks';
import { createPost } from '@/store/admin/postSlice';
import { fetchCategories } from '@/store/admin/categorySlice';

import type { PostFormValues } from '@/types/post';

const Write = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreate = async (post: PostFormValues) => {

        if (post.categoryId === null || !Number.isInteger(post.categoryId)) {
            alert("카테고리를 선택해주세요.");
            return;
        }

        if (!post.title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        try {
            await dispatch(createPost(post));
            alert("등록 성공");
            router.push('/admin');
        } catch {
            alert("등록 실패");
        }
    };

    return (
        <PostForm mode="create" onSubmit={handleCreate} />
    );
};

export default Write;
