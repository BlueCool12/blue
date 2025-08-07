import { commentApi } from "@/lib/api/user/commentApi"
import { formatDate } from "@/lib/utils/format";

import { Comment, CreateCommentPayload, DeleteCommentPayload, UpdateCommentPayload } from "@/types/comment";

export const commentService = {

    createComment: async (payload: CreateCommentPayload) => {
        await commentApi.createComment(payload);
    },

    getAllComments: async (postId: number) => {
        try {
            const result = await commentApi.getAllComments(postId);

            const formatComment = (comment: Comment): Comment => ({
                ...comment,
                nickname: comment.isDeleted ? "알 수 없음" : comment.nickname,
                content: comment.isDeleted ? "삭제된 댓글입니다." : comment.content,
                createdAt: formatDate(comment.createdAt),
                children: comment.children?.map(formatComment) ?? [],
            });

            return result.map(formatComment);
        } catch {
            return [];
        }
    },

    deleteComment: async (payload: DeleteCommentPayload) => {
        await commentApi.deleteComment(payload);
    },

    verifyCommentPassword: async (commentId: number, password: string): Promise<boolean> => {
        return await commentApi.verifyCommentPassword(commentId, password);
    },

    updateComment: async (commentId: number, payload: UpdateCommentPayload): Promise<void> => {
        await commentApi.updateComment(commentId, payload);
    },
};