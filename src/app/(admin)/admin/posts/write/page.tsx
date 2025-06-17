'use client';

import React from 'react';
import { useRouter } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";

import { useAppDispatch } from '@/store/hooks';
import { createPost } from '@/store/admin/postSlice';

import type { PostFormValues } from '@/types/post';

const Write = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleCreate = async (post: PostFormValues) => {
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
