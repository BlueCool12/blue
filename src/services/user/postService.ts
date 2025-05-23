import { postApi } from "@/api/user/postApi";

interface PostDetail {
    slug: string;
    title: string;
    category: string;
    contentSummary: string;
    createdAt: string;
    content: string;
}

export const postService = {
    getAllPosts: async () => {
        const result = await postApi.getAllPosts();
        return result.map((post: PostDetail) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
        }));
    },

    getPostBySlug: async (slug: string) => {
        const post = await postApi.getPostBySlug(slug);
        return {
            ...post,
            createdAt: formatDate(post.createdAt),
        };
    }
};

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
}