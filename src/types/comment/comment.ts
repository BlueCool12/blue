export interface Comment {
    id: number;
    adminId: number;
    postId: number;
    parentId?: number;
    nickname: string;
    content: string;
    isDeleted: boolean;
    createdAt: string;
    children: Comment[];
}