

export interface Post {
    slug: string;
    title: string;
    category: string;
    contentSummary: string;
    createdAt: string;
}

export interface PagedPost {
    posts: Post[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    isLast: boolean;
}

export interface PostDetail extends Post {
    id: number;
    content: string;
}

export interface PostFormValues {
    title: string;
    content: string;
    categoryId: number | null;
    isPublic: boolean;
}