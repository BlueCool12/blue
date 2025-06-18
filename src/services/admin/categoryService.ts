import { categoryApi } from "@/lib/api/admin/categoryApi";

import type { Category, CreateCategoryPayload } from "@/types/category";

export const categoryService = {

    createCategory: async (payload: CreateCategoryPayload) => {
        const result = await categoryApi.createCategory(payload);
        return result;
    },

    getCategories: async (): Promise<Category[]> => {
        return await categoryApi.getCategories();
    }
}