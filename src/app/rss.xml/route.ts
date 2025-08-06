import { PostListResponse } from "@/types/post";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

const SITE_URL = 'https://pyomin.com';
const BLOG_TITLE = 'BlueCool | 풀스택 개발자 성장 기록';
const BLOG_DESCRIPTION = '풀스택 개발자의 개인 블로그입니다. 개발 경험과 프로젝트 기록, 서버 운영, 성능 최적화 등 다양한 실전 기술을 공유합니다.';

async function fetchPosts(): Promise<PostListResponse[]> {
    try {
        const response = await fetch(`${process.env.INTERNAL_API_BASE_URL}/user/posts`, {
            cache: 'no-store',
        });
        if (!response.ok) throw new Error('글 불러오기 실패');
        const json = await response.json();
        return json.content;
    } catch {
        return [];
    }
}

export async function GET() {
    const posts = await fetchPosts();
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const latestPostDate = posts.length > 0
        ? new Date(posts[0].updatedAt).toUTCString() : new Date().toUTCString();

    const items = posts.map((post) => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${SITE_URL}/posts/${post.slug}</link>            
            <guid>${SITE_URL}/posts/${post.slug}</guid>
            <description><![CDATA[${post.description || ''}]]></description>
            <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>            
            <category>${post.category}</category>
            <media:thumbnail url="https://pyomin.com/images/empty.webp" />
            <enclosure url="https://pyomin.com/images/empty.webp" type="image/webp" />
        </item>
    `).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
            <channel>
                <title>${BLOG_TITLE}</title>
                <link>${SITE_URL}</link>
                <atom:link href="https://pyomin.com/rss.xml" rel="self" type="application/rss+xml" />
                <description>${BLOG_DESCRIPTION}</description>
                <language>ko</language>
                <lastBuildDate>${latestPostDate}</lastBuildDate>
                ${items}
            </channel>
        </rss>`;

    return new NextResponse(rss, {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}