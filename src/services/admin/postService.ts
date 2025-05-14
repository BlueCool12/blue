import { CreatePostPayload, PostListResponse, postApi } from "../../api/admin/postApi";

const formatDate = (isoDateString: string) => {
    return isoDateString.split("T")[0];
};

export const postService = {
    createPost: async (payload: CreatePostPayload) => {
        const result = await postApi.createPost(payload);
        // 비즈니스 로직
        return result;
    },

    getPosts: async (): Promise<PostListResponse[]> => {
        const posts = await postApi.getPosts();
        return posts.map((post) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
            updatedAt: formatDate(post.updatedAt),
        }));
    }
}