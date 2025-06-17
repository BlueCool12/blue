import api from "../axiosInstance";

import type { CategoryListResponse, CreateCategoryPayload } from "@/types/category";

export const categoryApi = {

    createCategory: async (payload: CreateCategoryPayload): Promise<any> => {
        const response = await api.post("/admin/categories", payload);
        return response.data;
    },

    getCategories: async (): Promise<CategoryListResponse[]> => {
        const response = await api.get("/admin/categories");
        return response.data;
    },
}