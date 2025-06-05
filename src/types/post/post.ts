

export interface Post {
    slug: string;
    title: string;
    category: string;
    contentSummary: string;
    createdAt: string;
}

export interface PostDetail extends Post {
    content: string;
}

export interface PostFormValues {
    title: string;
    content: string;
    category: string;
    isPublic: boolean;
}