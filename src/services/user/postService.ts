import { highlightCodeBlocksWithShiki } from "@/lib/utils/highlight";

import { notFound } from "next/navigation";

import { postApi } from "@/lib/api/user/postApi";
import { fetchPostBySlug } from "@/lib/server/post";

import type { PostDetail } from "@/types/post";

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
    }
};

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}