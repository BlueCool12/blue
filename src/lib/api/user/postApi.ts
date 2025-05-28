import api from "../axiosInstance"


export const postApi = {
    getAllPosts: async () => {
        const response = await api.get("/user/posts");
        return response.data;
    },

    getPostBySlug: async (slug: string) => {
        const response = await api.get(`/user/posts/${slug}`);
        return response.data;
    }
}