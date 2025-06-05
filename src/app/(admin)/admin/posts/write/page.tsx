'use client';

import React from 'react';
import { useRouter } from "next/navigation";

import { postApi } from "@/lib/api/admin/postApi";
import { PostForm } from "@/components/admin/PostForm";

import type { PostFormValues } from '@/types/post';

const Write = () => {

    const router = useRouter();

    const handleCreate = async (post: PostFormValues) => {
        try {
            const result = await postApi.createPost(post);
            console.log("등록 성공", result);
            router.push('/admin');
            // 성공 후 로직
        } catch (error) {
            console.error("등록 실패", error);
            // 실패 후 로직
        }
    };

    return (
        <PostForm mode="create" onSubmit={handleCreate} />
    );
};

export default Write;
