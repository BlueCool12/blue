import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "@/services/admin/postService";
import { CreatePostPayload, PostDetailResponse, PostListResponse } from "@/lib/api/admin/postApi";

interface PostState {
    postId: number | null;
    posts: PostListResponse[];
    postDetail: PostDetailResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    postId: null,
    posts: [],
    postDetail: null,
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

export const getPost = createAsyncThunk<PostDetailResponse, number>(
    "admin/getPost",
    async (id) => {
        const result = await postService.getPost(id);
        return result;
    }
);

export const updatePost = createAsyncThunk<void, { id: number; payload: CreatePostPayload }>(
    "admin/updatePost",
    async ({ id, payload }) => {
        await postService.updatePost(id, payload);
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
            })


            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postDetail = action.payload;
                state.loading = false;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "글 가져오기 실패";
            })


            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "글 수정 실패";
            });
    }
});

export default postSlice.reducer;