import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/user/postService";
import { Post } from "@/types/post";

export const usePosts = (category: string | null = null) => {
    const url = category && category !== 'all'
        ? `/user/posts/?category=${category}`
        : '/user/posts';

    return useQuery<Post[]>({
        queryKey: ['posts', category],
        queryFn: () => postService.getAllPosts(url),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};