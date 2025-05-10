import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../../services/admin/postService";
import { CreatePostPayload } from "../../api/admin/postApi";

interface PostState {
    postId: number | null;
}

const initialState: PostState = {
    postId: null,
};

export const createPost = createAsyncThunk<number, CreatePostPayload>(
    "admin/createPost",
    async (payload) => {
        const result = await postService.createPost(payload);
        return result.id;
    }
);

const postSlice = createSlice({
    name: "adminPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.postId = action.payload;
        });
    }
});

export default postSlice.reducer;