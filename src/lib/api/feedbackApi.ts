import { FeedbackCategoryResponse, FeedbackRequest } from "@/types/feedback";
import api from "./axiosInstance";

export const feedbackApi = {
    getCategories: async (): Promise<FeedbackCategoryResponse[]> => {
        const response = await api.get('/feedbacks/categories');
        return response.data;
    },

    submitFeedback: async (payload: FeedbackRequest): Promise<void> => {
        await api.post('/feedbacks', payload);
    }
};
