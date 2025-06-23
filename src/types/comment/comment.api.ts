export interface CreateCommentPayload {
    postId: number;
    parentId: number | null;
    nickname: string | null;
    password: string;
    content: string;
}

export interface DeleteCommentPayload {
    postId: number;
    commentId: number;
    password: string;
}

export interface UpdateCommentPayload {
    nickname: string;
    password: string;
    content: string;
}