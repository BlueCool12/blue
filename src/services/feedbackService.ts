import { feedbackApi } from "@/lib/api/feedbackApi";
import { FeedbackCategoryResponse, FeedbackRequest } from "@/types/feedback";

export const feedbackService = {
    getCategories: async (): Promise<FeedbackCategoryResponse[]> => {
        return await feedbackApi.getCategories();
    },

    submitFeedback: async (payload: FeedbackRequest): Promise<void> => {
        return await feedbackApi.submitFeedback(payload);
    }
};
