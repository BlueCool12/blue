

export interface Post {
    slug: string;
    title: string;
    category: string;
    contentSummary: string;
    createdAt: string;
}

export interface postDetail extends Post {
    content: string;
}