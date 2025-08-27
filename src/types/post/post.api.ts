export interface PostListResponse {
    id: number;
    title: string;
    category: string;
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    contentSummary: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface PostSummaryResponse {
    slug: string;
    title: string;
}

export interface PostDetailResponse {
    id: number;
    title: string;
    description: string;
    content: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    isPublic: boolean;
    isDeleted: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    previousPost?: PostSummaryResponse | null;
    nextPost?: PostSummaryResponse | null;
}

export interface PostLatest {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
}