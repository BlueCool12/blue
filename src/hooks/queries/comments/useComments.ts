import { useQuery } from "@tanstack/react-query"
import { commentService } from "@/services/user/commentService"


export const useComments = (postId: number) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => commentService.getAllComments(postId),
        staleTime: 1000 * 60,
        gcTime: 5 * 60 * 1000,
    })
}