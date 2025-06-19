import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { commentService } from "@/services/user/commentService";

import { CreateCommentPayload } from "@/types/comment";

interface CommentState {
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    loading: false,
    error: null,
}

export const createComment = createAsyncThunk<void, CreateCommentPayload>(
    "user/createComment",
    async (payload) => {
        await commentService.createComment(payload);
    }
);

const commentSlice = createSlice({
    name: "userComment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 댓글 등록
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "댓글 등록 실패";
            })
    },
});

export default commentSlice.reducer;