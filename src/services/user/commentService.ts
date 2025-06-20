import { commentApi } from "@/lib/api/user/commentApi"
import { formatDate } from "@/lib/utils/format";

import { Comment, CreateCommentPayload, DeleteCommentPayload } from "@/types/comment";

export const commentService = {

    createComment: async (payload: CreateCommentPayload) => {
        await commentApi.createComment(payload);
    },

    getAllComments: async (postId: number) => {
        const result = await commentApi.getAllComments(postId);
        return result.map((comment: Comment) => ({
            ...comment,
            nickname: comment.isDeleted ? "알 수 없음" : comment.nickname,
            content: comment.isDeleted ? "삭제된 댓글입니다." : comment.content,
            createdAt: formatDate(comment.createdAt),
        }));
    },

    deleteComment: async (payload: DeleteCommentPayload) => {
        await commentApi.deleteComment(payload);
    }
};