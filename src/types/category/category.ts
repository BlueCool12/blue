export interface Category {
    name: string;
    slug: string;
    postCount: number;
    children?: Category[];
}