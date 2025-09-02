
export async function fetchPostBySlug(slug: string) {

    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? process.env.INTERNAL_API_BASE_URL
        : process.env.PUBLIC_API_BASE_URL;

    const url = `${baseUrl}/posts/${slug}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}