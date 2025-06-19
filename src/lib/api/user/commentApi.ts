import { CreateCommentPayload } from "@/types/comment";
import api from "../axiosInstance";

export const commentApi = {
    createComment: async (payload: CreateCommentPayload): Promise<void> => {
        await api.post("/user/comments", payload);
    }
}