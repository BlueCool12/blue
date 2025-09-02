import { notFound } from "next/navigation";

import { highlightCodeBlocksWithShiki } from "@/lib/utils/highlight";
import { formatDate } from "@/lib/utils/format";
import { postApi } from "@/lib/api/postApi";
import { fetchPostBySlug } from "@/lib/server/post";

import type { PagedPost, PageResponse, Post, PostDetail, PostDetailResponse, PostLatest, PostListResponse } from "@/types/post";

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
            createdAt: post.createdAt,
            createdAtText: formatDate(post.createdAt),
        }));

        return {
            posts,
            totalPages: result.totalPages,
            totalElements: result.totalElements,
            currentPage: result.number,
            isLast: result.last,
        };
    },

    getPostBySlug: async (slug: string): Promise<PostDetail> => {
        try {
            const response: PostDetailResponse = await fetchPostBySlug(slug);
            const highlightedContent = await highlightCodeBlocksWithShiki(response.content);
            const formattedCreatedAt = formatDate(response.createdAt);

            const postDetail: PostDetail = {
                ...response,                
                content: highlightedContent,
                createdAtText: formattedCreatedAt,                
            };

            return postDetail;
        } catch {
            notFound();
        }
    },

    getLatestPosts: async (): Promise<PostLatest[]> => {
        const result = await postApi.getLatestPosts();
        return result.map((post) => ({
            ...post,
            createdAtText: formatDate(post.createdAt),
        }));
    },
};