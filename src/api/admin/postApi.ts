import api from "../axiosInstance";

export interface CreatePostPayload {
    title: string;
    content: string;
    category: string;
    isPublic: boolean;
}

export interface PostListResponse {
    id: number;
    title: string;
    category: string;
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostDetailResponse {
    id: number;
    title: string;
    content: string;
    category: string;
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export const postApi = {

    createPost: async (payload: CreatePostPayload) => {
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

    updatePost: async (id: number, payload: CreatePostPayload) => {
        const response = await api.put(`/admin/posts/${id}`, payload);
        return response.data;
    }

}