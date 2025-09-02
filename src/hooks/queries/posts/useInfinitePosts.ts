import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { PagedPost } from "@/types/post";

type Options = {
    category?: string | null;
    size?: number;
    startPage?: number | null;
    enabled?: boolean;
    initialData?: InfiniteData<PagedPost>;
}

export const useInfinitePosts = ({
    category = null,
    size = 10,
    startPage = 2,
    enabled = true,
    initialData,
}: Options) => {

    const initialParam = startPage ?? 2;

    return useInfiniteQuery<PagedPost>({
        queryKey: ['posts', category, size],
        initialPageParam: initialParam,
        queryFn: ({ pageParam }) =>
            postService.getAllPosts({ category, page: pageParam as number, size }),
        getNextPageParam: (lastPage) => {
            if (lastPage.isLast) return undefined;
            return lastPage.currentPage + 2;
        },
        enabled: enabled && startPage !== null,
        initialData,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
