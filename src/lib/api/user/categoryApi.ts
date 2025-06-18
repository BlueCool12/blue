import api from "../axiosInstance";

import { CategoryListResponse } from "@/types/category";

export const categoryApi = {

    getCategories: async (): Promise<CategoryListResponse[]> => {
        const response = await api.get("/user/categories");
        return response.data;
    },
}