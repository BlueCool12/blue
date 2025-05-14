import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../../services/admin/postService";
import { CreatePostPayload, PostListResponse } from "../../api/admin/postApi";

interface PostState {
    postId: number | null;
    posts: PostListResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    postId: null,
    posts: [],
    loading: false,
    error: null,
};

export const createPost = createAsyncThunk<number, CreatePostPayload>(
    "admin/createPost",
    async (payload) => {
        const result = await postService.createPost(payload);
        return result.id;
    }
);

export const getPosts = createAsyncThunk<PostListResponse[]>(
    "admin/getPosts",
    async () => {
        const result = await postService.getPosts();
        return result;
    }
);

const postSlice = createSlice({
    name: "adminPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.postId = action.payload;
            })

            
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "글 목록 불러오기 실패";
            });
    }
});

export default postSlice.reducer;