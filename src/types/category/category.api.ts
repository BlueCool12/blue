export interface CreateCategoryPayload {
    name: string;
    parentId: number | null;
}

export interface CategoryListResponse {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    children: CategoryListResponse[];
}