import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { categoryService } from "@/services/user/categoryService";

import { Category } from "@/types/category";

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

export const fetchCategories = createAsyncThunk<Category[]>(
    "user/fetchCategories",
    async () => {
        const result = await categoryService.getCategories();
        return result;
    }
);

const categorySlice = createSlice({
    name: "userCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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