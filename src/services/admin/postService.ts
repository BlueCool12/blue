import { CreatePostPayload, postApi } from "../../api/admin/postApi";


export const postService = {
    createPost: async (payload: CreatePostPayload) => {
        const result = await postApi.createPost(payload);
        // 비즈니스 로직
        return result;
    }
}