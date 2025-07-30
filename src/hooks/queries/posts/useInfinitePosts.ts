import { useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "@/services/user/postService";
import { PagedPost } from "@/types/post";

export const useInfinitePosts = (category: string | null = null, size: number = 10, enabled = true) => {
    return useInfiniteQuery<PagedPost>({
        queryKey: ['posts', category, size],
        queryFn: ({ pageParam }) =>
            postService.getAllPosts({ category, page: pageParam as number, size }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.isLast ? undefined : allPages.length + 1;
        },
        staleTime: 1000 * 60 * 5,
        enabled,
    });
};
