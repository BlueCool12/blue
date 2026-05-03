import { useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { PagedPost } from "@/types/post";

type Options = {
    keyword: string;
    category?: string | null;
    size: number;
    initialPage?: number;
}

export const useInfiniteSearchPosts = ({
    keyword,
    category = null,
    size = 10,
    initialPage = 0,
}: Options) => {

    return useInfiniteQuery<PagedPost>({
        queryKey: ['search-posts', keyword, category, size],
        initialPageParam: initialPage + 1,
        queryFn: ({ pageParam }) =>
            postService.searchPosts({ keyword, category, page: pageParam as number, size }),
        getNextPageParam: (page) => {
            if (!page.hasNext) return undefined;
            return page.current + 1;
        },
        enabled: keyword.trim().length >= 2,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
