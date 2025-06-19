export interface Comment {
    id: number;
    postId: number;
    parentId?: number;
    nickname: string;
    content: string;
    createdAt: string;
}