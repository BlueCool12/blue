import api from "../axiosInstance";

export interface CreatePostPayload {
    title: string;
    content: string;
    category: string;
    isPublic: boolean;
}

export const postApi = {
    createPost: async (payload: CreatePostPayload) => {
        const response = await api.post("/admin/posts", payload);
        return response.data;
    }
}