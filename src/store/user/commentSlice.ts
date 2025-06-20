import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { commentService } from "@/services/user/commentService";

import { Comment, CreateCommentPayload } from "@/types/comment";

interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
}

export const createComment = createAsyncThunk<void, CreateCommentPayload>(
    "user/createComment",
    async (payload, { dispatch }) => {
        await commentService.createComment(payload);
        dispatch(fetchComments(payload.postId));
    }
);

export const fetchComments = createAsyncThunk(
    "user/fetchComments",
    async (postId: number) => {
        return await commentService.getAllComments(postId);
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

            // 댓글 리스트
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "댓글 불러오기 실패";
            })
    },
});

export default commentSlice.reducer;