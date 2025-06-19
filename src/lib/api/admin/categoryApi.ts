import api from "../axiosInstance";

import type { CategoryListResponse, CreateCategoryPayload } from "@/types/category";

export const categoryApi = {

    createCategory: async (payload: CreateCategoryPayload): Promise<void> => {
        await api.post("/admin/categories", payload);
    },

    getCategories: async (): Promise<CategoryListResponse[]> => {
        const response = await api.get("/admin/categories");
        return response.data;
    },
}