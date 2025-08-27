
export async function fetchPostBySlug(slug: string) {

    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? process.env.INTERNAL_API_BASE_URL
        : 'https://bluecool.pyomin.com/api/v1';

    const url = `${baseUrl}/posts/${slug}`;

    const response = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}