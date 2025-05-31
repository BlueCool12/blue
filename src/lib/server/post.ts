
export async function fetchPostBySlug(slug: string) {

    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? process.env.INTERNAL_API_BASE_URL
        : 'http://localhost:8888/api';

    if (isServer) {
        console.log('📡 [SERVER] baseUrl:', baseUrl);
        console.log('📡 [SERVER] ENV:', process.env.INTERNAL_API_BASE_URL);
    } else {
        console.log('📡 [CLIENT] baseUrl:', baseUrl);
    }

    const url = `${baseUrl}/user/posts/${slug}`;

    const response = await fetch(url, {
        cache: 'force-cache',
    });

    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}