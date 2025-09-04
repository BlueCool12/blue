import { useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { PagedPost } from "@/types/post";

type Options = {
    category?: string | null;
    size: number;
}

export const useInfinitePosts = ({
    category = null,
    size = 10,
}: Options) => {

    return useInfiniteQuery<PagedPost>({
        queryKey: ['posts', category, size],
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
            postService.getAllPosts({ category, page: pageParam as number, size }),
        getNextPageParam: (page) => {
            if (!page.hasNext) return undefined;
            return page.current + 1;
        },
        enabled: true,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
