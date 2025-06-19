import { categoryApi } from "@/lib/api/admin/categoryApi";

import type { Category, CreateCategoryPayload } from "@/types/category";

export const categoryService = {

    createCategory: async (payload: CreateCategoryPayload) => {
        await categoryApi.createCategory(payload);
    },

    getCategories: async (): Promise<Category[]> => {
        return await categoryApi.getCategories();
    }
}