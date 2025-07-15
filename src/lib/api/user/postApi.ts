import { PostLatest } from "@/types/post";
import api from "../axiosInstance";

export const postApi = {
    getAllPosts: async (url: string) => {
        const response = await api.get(url);
        return response.data;
    },

    getPostBySlug: async (slug: string) => {
        const response = await api.get(`/user/posts/${slug}`);
        return response.data;
    },

    getLatestPosts: async (): Promise<PostLatest[]> => {
        const response = await api.get("/user/posts/latest");
        return response.data;
    }
}