import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PostList from "../../PostList";

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;

    const decoded = decodeURIComponent(category);
    if (!decoded) return notFound();

    const title = `${decoded} 카테고리 글 목록`;
    const description = `BlueCool 블로그의 "${decoded}" 카테고리 글 목록입니다.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/posts/category/${encodeURIComponent(decoded)}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://pyomin.com/posts/category/${encodeURIComponent(decoded)}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decoded = decodeURIComponent(category);
    return <PostList category={decoded} />;
}
