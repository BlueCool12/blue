
export async function fetchPostBySlug(slug: string) {
    const response = await fetch(`https://bluecool.pyomin.com/api/user/posts/${slug}`, {
        cache: 'force-cache',
    });
    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    const data = await response.json();
    return data;
}