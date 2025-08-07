import type { Metadata } from 'next';
import PostList from "./PostList";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const title = '전체 글 목록';
    const description = 'BlueCool 블로그의 전체글 목록입니다. 다양한 기술과 개발 이야기를 확인해보세요.';

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
            url: 'https://pyomin.com/posts',
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