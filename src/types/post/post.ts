

export interface Post {
    slug: string;
    title: string;
    categories: string[];
    contentSummary: string;
    createdAt: string;
}

export interface PostDetail extends Post {
    content: string;
}

export interface PostFormValues {
    title: string;
    content: string;
    categories: number[];
    isPublic: boolean;
}