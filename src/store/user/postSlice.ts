import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postService } from "@/services/user/postService";

import { Post, PostDetail } from "@/types/post";


interface PostListState {
    posts: Post[];
    postDetail: PostDetail | null;
    loading: boolean;
    error: string | null;
}

const initialState: PostListState = {
    posts: [],
    postDetail: null,
    loading: false,
    error: null,
};

export const loadPostDetail = createAsyncThunk(
    "user/loadPostDetail",
    async (slug: string) => {
        const result = await postService.getPostBySlug(slug);
        return result;
    }
)

const postSlice = createSlice({
    name: "userPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // 상세 글 조회
        builder
            .addCase(loadPostDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.postDetail = null;
            })
            .addCase(loadPostDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.postDetail = action.payload;
            })
            .addCase(loadPostDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "알 수 없는 에러";
            })
    }
})

export default postSlice.reducer;