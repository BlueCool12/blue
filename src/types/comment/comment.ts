export interface Comment {
    id: number;
    adminId: number;
    postId: number;
    parentId?: number;
    nickname: string;
    content: string;
    status: CommentStatus;
    createdAt: string;
    children: Comment[];
}

export const COMMENT_STATUS = {
    PUBLISHED: 'PUBLISHED',
    HIDDEN: 'HIDDEN',
    DELETED: 'DELETED',
} as const;

export type CommentStatus = typeof COMMENT_STATUS[keyof typeof COMMENT_STATUS];