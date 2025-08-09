import { PageResponse, PostDetailResponse, PostLatest, PostListResponse } from "@/types/post";
import api from "../axiosInstance";

export const postApi = {
    getAllPosts: async ({
        category,
        page = 1,
        size = 10,
    }: {
        category?: string | null;
        page?: number;
        size?: number;
    }): Promise<PageResponse<PostListResponse>> => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (page) params.append('page', (page - 1).toString());
        if (size) params.append('size', size.toString());

        const response = await api.get(`/user/posts?${params.toString()}`);
        return response.data;
    },

    getPostBySlug: async (slug: string): Promise<PostDetailResponse> => {        
        const response = await api.get(`/user/posts/${slug}`);        
        return response.data;
    },

    getLatestPosts: async (): Promise<PostLatest[]> => {
        const response = await api.get("/user/posts/latest");
        return response.data;
    }
}