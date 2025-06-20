import { Comment, CreateCommentPayload, DeleteCommentPayload } from "@/types/comment";
import api from "../axiosInstance";

export const commentApi = {
    createComment: async (payload: CreateCommentPayload): Promise<void> => {
        await api.post("/user/comments", payload);
    },

    getAllComments: async (postId: number): Promise<Comment[]> => {
        const response = await api.get('/user/comments', {
            params: { postId },
        });
        return response.data.comments;
    },

    deleteComment: async (payload: DeleteCommentPayload): Promise<void> => {
        await api.delete(`/user/comments/${payload.commentId}`, {
            data: { password: payload.password },
        });
    }
};