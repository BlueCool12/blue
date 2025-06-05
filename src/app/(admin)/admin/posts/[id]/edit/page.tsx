'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";
import { postApi } from "@/lib/api/admin/postApi";

import { useAppDispatch } from "@/store/hooks";
import { updatePost } from "@/store/admin/postSlice";

import type { PostFormValues } from "@/types/post";

const Edit = () => {

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const id = pathname.split('/').at(-2); // '/admin/posts/[id]/edit' → id 추출

    const [postData, setPostData] = useState<PostFormValues | undefined>(undefined);

    useEffect(() => {
        if (!id) return;

        const getPost = async () => {
            try {
                const result = await postApi.getPost(Number(id));
                setPostData({
                    title: result.title,
                    content: result.content,
                    category: result.category,
                    isPublic: result.isPublic,
                });
            } catch (error) {
                console.error('글 불러오기 실패', error);
            }
        };

        getPost();
    }, [id]);

    const handleUpdate = (post: PostFormValues) => {
        if (!id) return;

        dispatch(updatePost({ id: Number(id), payload: post }))
            .unwrap()
            .then(() => {
                router.push('/admin/posts');
            })
            .catch((error) => {
                console.error('수정 실패', error);
            });
    };

    return (
        <PostForm
            mode="edit"
            initialData={postData}
            onSubmit={handleUpdate}
        />
    );
}

export default Edit;