import { useMutation } from '@tanstack/react-query';
import { feedbackService } from '@/services/feedbackService';
import { FeedbackRequest } from '@/types/feedback';

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: (payload: FeedbackRequest) => feedbackService.submitFeedback(payload),
  });
};
