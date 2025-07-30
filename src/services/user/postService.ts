import { notFound } from "next/navigation";

import { highlightCodeBlocksWithShiki } from "@/lib/utils/highlight";
import { formatDate } from "@/lib/utils/format";
import { postApi } from "@/lib/api/user/postApi";
import { fetchPostBySlug } from "@/lib/server/post";

import type { PagedPost, PageResponse, Post, PostLatest, PostListResponse } from "@/types/post";

export const postService = {
    getAllPosts: async ({
        category,
        page,
        size,
    }: {
        category?: string | null;
        page?: number;
        size?: number;
    }): Promise<PagedPost> => {
        const result: PageResponse<PostListResponse> = await postApi.getAllPosts({ category, page, size });

        const posts: Post[] = result.content.map((post) => ({
            id: post.id,
            title: post.title,
            category: post.category,
            slug: post.slug,
            contentSummary: post.contentSummary,
            createdAt: formatDate(post.createdAt),            
        }));

        return {
            posts,
            totalPages: result.totalPages,
            totalElements: result.totalElements,
            currentPage: result.number,
            isLast: result.last,
        };
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