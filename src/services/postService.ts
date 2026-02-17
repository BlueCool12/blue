import { notFound } from "next/navigation";

import { highlightCodeBlocks } from "@/lib/utils/highlight";
import { formatDate } from "@/lib/utils/format";
import { postApi } from "@/lib/api/postApi";

import type { PagedPost, PageResponse, Post, PostDetail, PostDetailResponse, PostLatest, PostListResponse } from "@/types/post";

export const postService = {
    getAllPosts: async ({
        category,
        page = 0,
        size = 10,
    }: {
        category?: string | null;
        page: number;
        size: number;
    }): Promise<PagedPost> => {
        const result: PageResponse<PostListResponse> = await postApi.getAllPosts({ category, page, size });

        const posts: Post[] = result.content.map((post) => ({
            id: post.id,
            title: post.title,
            category: post.category,
            slug: post.slug,
            contentSummary: post.contentSummary,
            coverPath: post.coverPath,
            createdAt: post.createdAt,
            publishedAt: post.publishedAt,
            publishedAtText: formatDate(post.publishedAt),
        }));        

        return {
            posts,
            current: result.number,
            hasNext: result.hasNext,
        };
    },

    getPostBySlug: async (slug: string): Promise<PostDetail> => {
        try {
            const response: PostDetailResponse = await postApi.getPostBySlug(slug);
            const highlightedContent = await highlightCodeBlocks(response.content);
            const formattedPublihsedAt = formatDate(response.publishedAt);

            const postDetail: PostDetail = {
                ...response,
                content: highlightedContent,
                publishedAtText: formattedPublihsedAt,
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
            publishedAtText: formatDate(post.publishedAt),
        }));
    },
};