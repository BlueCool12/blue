export interface Post {
    slug: string;
    title: string;
    category: string;
    contentSummary: string;
    createdAt: string;
    createdAtText: string;
}

export interface PagedPost {
    posts: Post[];
    current: number;
    hasNext: boolean;
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
    createdAtText: string;
    previousPost?: PostSummary | null;
    nextPost?: PostSummary | null;
}