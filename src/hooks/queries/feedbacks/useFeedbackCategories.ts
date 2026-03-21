import { useQuery } from '@tanstack/react-query';
import { feedbackService } from '@/services/feedbackService';
import { FeedbackCategoryResponse } from '@/types/feedback';

export const useFeedbackCategories = () => {
  return useQuery<FeedbackCategoryResponse[]>({
    queryKey: ['feedbackCategories'],
    queryFn: () => feedbackService.getCategories(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false
  });
};
