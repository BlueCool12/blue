

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

export interface PostSummary {
    slug: string;
    title: string;
}

export interface PostDetail {
    id: number;
    slug: string;
    title: string;
    description: string;
    category: {
        name: string;
        slug: string;
    };
    content: string;
    createdAt: string;
    previousPost?: PostSummary | null;
    nextPost?: PostSummary | null;
}

export interface PostFormValues {
    title: string;
    content: string;
    categoryId: number | null;
    isPublic: boolean;
}