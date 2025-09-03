import { getApiBase } from "./apiBase";

import { CategoryListResponse } from "@/types/category";

export const categoryApi = {

    getCategories: async (): Promise<CategoryListResponse[]> => {
        const response = await fetch(`${getApiBase()}/categories`);
        return response.json();
    },
}