import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { PagedPost } from "@/types/post";

type Options = {
    category?: string | null;
    size?: number;
    startPage?: number;
    enabled?: boolean;
}

export const useInfinitePosts = ({
    category = null,
    size = 10,
    startPage = 1,
    enabled = true
}: Options = {}) => {
    return useInfiniteQuery<PagedPost>({
        queryKey: ['posts', category, size, startPage],
        initialPageParam: startPage,
        queryFn: ({ pageParam }) =>
            postService.getAllPosts({ category, page: pageParam as number, size }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.isLast) return undefined;
            const current = (lastPage as any).page ?? startPage + allPages.length - 1;
            return current + 1;
        },
        staleTime: 1000 * 60 * 5,
        enabled,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
};
