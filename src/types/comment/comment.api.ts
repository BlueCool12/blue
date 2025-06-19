export interface CreateCommentPayload {
    postId: number;
    parentId: number | null;
    nickname: string | null;
    content: string;
}