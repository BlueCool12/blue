
export interface CreatePostPayload {
    title: string;
    content: string;
    categories: number[];
    isPublic: boolean;
}

export interface PostListResponse {
    id: number;
    title: string;
    category: string;
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostDetailResponse {
    id: number;
    title: string;
    content: string;
    category: string;
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}
