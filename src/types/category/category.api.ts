export interface CategoryListResponse {
    name: string;
    slug: string;
    postCount: number;
    children: CategoryListResponse[];
}