import { categoryApi } from "@/lib/api/user/categoryApi";

import { Category } from "@/types/category";

export const categoryService = {
    getCategories: async (): Promise<Category[]> => {
        return await categoryApi.getCategories();
    }
}