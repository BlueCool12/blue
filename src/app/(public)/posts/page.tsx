import type { Metadata } from 'next';
import PostList from "./PostList";

export async function generateMetadata(
    props: any
): Promise<Metadata> {
    const category = typeof props?.searchParams?.category === 'string' ? props.searchParams.category : null;

    const title = category ? `${category} 카테고리 글 목록` : '전체 글 목록';
    const description = category
        ? `BlueCool 블로그의 "${category}" 카테고리 글 목록입니다.`
        : 'BlueCool 블로그의 전체글 목록입니다. 다양한 기술과 개발 이야기를 확인해보세요.';

    return {
        title,
        description,
        alternates: {
            canonical: '/posts',
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: category
                ? `https://pyomin.com/posts?category=${encodeURIComponent(category)}`
                : 'https://pyomin.com/posts',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
};

export default function Page() {
    return <PostList />
};