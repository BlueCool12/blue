export interface CreateCategoryPayload {
    name: string;
    parentId: number | null;
}

export interface CategoryListResponse {
    id: number;
    name: string;
    parentId: number | null;
}

export interface Category extends CategoryListResponse {
    children: Category[];
}