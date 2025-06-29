import api from "../axiosInstance";

import type { CreatePostPayload, PostListResponse, PostDetailResponse, PostCreateResponse } from "@/types/post";

export const postApi = {

    createPost: async (payload: CreatePostPayload): Promise<PostCreateResponse> => {
        const response = await api.post("/admin/posts", payload);
        return response.data;
    },

    getPosts: async (): Promise<PostListResponse[]> => {
        const response = await api.get("/admin/posts");
        return response.data;
    },

    getPost: async (id: number): Promise<PostDetailResponse> => {
        const response = await api.get(`/admin/posts/${id}`);
        return response.data;
    },

    updatePost: async (id: number, payload: CreatePostPayload): Promise<void> => {
        await api.put(`/admin/posts/${id}`, payload);
    }

}