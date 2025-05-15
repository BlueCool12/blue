import { CreatePostPayload, PostDetailResponse, PostListResponse, postApi } from "../../api/admin/postApi";

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
    },

    getPost: async (id: number): Promise<PostDetailResponse> => {
        const post = await postApi.getPost(id);
        return post;
    },

    updatePost: async (id: number, payload: CreatePostPayload) => {
        const result = await postApi.updatePost(id, payload);
        return result;
    }

}