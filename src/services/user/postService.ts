import { notFound } from "next/navigation";

import { highlightCodeBlocksWithShiki } from "@/lib/utils/highlight";
import { formatDate } from "@/lib/utils/format";
import { postApi } from "@/lib/api/user/postApi";
import { fetchPostBySlug } from "@/lib/server/post";

import type { PostDetail, PostLatest } from "@/types/post";

export const postService = {
    getAllPosts: async (url: string) => {
        const result = await postApi.getAllPosts(url);
        return result.map((post: PostDetail) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
        }));
    },

    getPostBySlug: async (slug: string) => {
        try {
            const post = await fetchPostBySlug(slug);
            const highlightedContent = await highlightCodeBlocksWithShiki(post.content);
            return {
                ...post,
                content: highlightedContent,
                createdAt: formatDate(post.createdAt),
            };
        } catch {
            notFound();
        }
    },

    getLatestPosts: async (): Promise<PostLatest[]> => {
        const result = await postApi.getLatestPosts();
        return result.map((post) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
        }));
    },
};