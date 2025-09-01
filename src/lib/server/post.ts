import { Post } from "@/types/post";

export async function fetchPostBySlug(slug: string) {

    const baseUrl = 'http://localhost:8888/api/v1';

    const url = `${baseUrl}/posts/${slug}`;

    const response = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}

export type PagePayload = { posts: Post[]; nextPage?: number };

export async function fetchPostsPage(opts: { page?: number; size: number; category?: string | null }) {
    const { page = 1, size, category = null } = opts;

    const qs = new URLSearchParams({ page: String(page), size: String(size) });
    if (category) qs.set('category', category);

    const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/posts?${qs.toString()}`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('첫페이지 불러오기 실패');

    const data = (await res.json()) as PagePayload;
    return data;
}