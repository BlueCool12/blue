'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";

import { useAppDispatch } from "@/store/hooks";
import { fetchCategories } from "@/store/admin/categorySlice";
import { updatePost } from "@/store/admin/postSlice";
import { getPost } from "@/store/admin/postSlice";

import type { PostFormValues } from "@/types/post";

const Edit = () => {

    const pathname = usePathname();
    const router = useRouter();

    const dispatch = useAppDispatch();

    const id = pathname.split('/').at(-2); // '/admin/posts/[id]/edit' → id 추출
    const [postData, setPostData] = useState<PostFormValues | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!id) return;

        dispatch(getPost(Number(id))).unwrap()
            .then((result) => {
                setPostData({
                    title: result.title,
                    content: result.content,
                    categoryId: result.category.id,
                    isPublic: result.isPublic,
                });
            })
            .catch((error) => {
                throw new Error(error);
            });

    }, [dispatch, id]);

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