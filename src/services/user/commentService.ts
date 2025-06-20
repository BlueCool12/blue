import { commentApi } from "@/lib/api/user/commentApi"

import { CreateCommentPayload } from "@/types/comment";

export const commentService = {

    createComment: async (payload: CreateCommentPayload) => {
        await commentApi.createComment(payload);
    },

    getAllComments: async (postId: number) => {
        return await commentApi.getAllComments(postId);
    },
}