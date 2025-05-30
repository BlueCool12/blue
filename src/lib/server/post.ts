
export async function fetchPostBySlug(slug: string) {
    const encodedSlug = encodeURIComponent(slug);
    const url = `https://bluecool.pyomin.com/api/user/posts/${encodedSlug}`;
    console.log('📡 [fetchPostBySlug] 요청 URL:', url);

    const response = await fetch(url, {
        cache: 'force-cache',
    });

    console.log('📡 [fetchPostBySlug] 응답 상태:', response.status);

    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}