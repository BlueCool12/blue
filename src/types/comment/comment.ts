export interface Comment {
    id: number;
    postId: number;
    parentId?: number;
    nickname: string;
    content: string;
    isDeleted: boolean;
    createdAt: string;
}