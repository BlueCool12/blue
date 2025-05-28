
export async function getPostBySlug(slug: string) {
    const response = await fetch(`https://bluecool.pyomin.com/api/user/posts/${slug}`, {
        cache: 'no-store',
    });
    if (!response.ok) throw new Error('게시글이 존재하지 않습니다.');
    return response.json();
}