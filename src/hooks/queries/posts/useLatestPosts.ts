import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/user/postService"
import { PostLatest } from "@/types/post";

export const useLatestPosts = () => {
    return useQuery<PostLatest[]>({
        queryKey: ["latest-posts"],
        queryFn: () => postService.getLatestPosts(),
        staleTime: 1000 * 60 * 5,
    });
}