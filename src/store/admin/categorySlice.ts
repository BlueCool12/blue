import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { categoryService } from "@/services/admin/categoryService";

import { Category, CreateCategoryPayload } from "@/types/category";

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const createCategory = createAsyncThunk<number, CreateCategoryPayload>(
    "admin/createCategory",
    async (payload) => {
        const result = await categoryService.createCategory(payload);
        return result.id;
    }
);

export const fetchCategories = createAsyncThunk<Category[]>(
    "admin/fetchCategories",
    async () => {
        const result = await categoryService.getCategories();
        return result;
    }
);

const categorySlice = createSlice({
    name: "adminCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 카테고리 등록
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "카테고리 등록 실패";
            })

            // 카테고리 조회
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "카테고리 조회 실패";
            })
    },
});

export default categorySlice.reducer;