import { PageResponse, PostDetailResponse, PostLatest, PostListResponse } from "@/types/post";
import { getApiBase } from "./apiBase";

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
        if (category) params.set('category', category);
        params.set('page', (page - 1).toString());
        params.set('size', size.toString());

        const response = await fetch(`${getApiBase()}/posts?${params.toString()}`);
        if (!response.ok) throw new Error(`GET /posts 실패: ${response.status}`);
        return response.json();
    },

    getPostBySlug: async (slug: string): Promise<PostDetailResponse> => {
        const response = await fetch(`${getApiBase()}/posts/${slug}`);
        if (!response.ok) throw new Error(`GET /posts/${slug} 실패: ${response.status}`);
        return response.json();
    },

    getLatestPosts: async (): Promise<PostLatest[]> => {
        const response = await fetch(`${getApiBase()}/posts/latest`);
        return response.json();
    }
}