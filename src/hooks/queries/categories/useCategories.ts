import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types/category';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false
  });
};
