import styles from './page.module.css';

import { Metadata } from 'next';
import { postService } from '@/services/user/postService';
import { notFound } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(props: any): Promise<Metadata> {
    const post = await postService.getPostBySlug(props?.params?.slug);

    return {
        title: post.title,
        openGraph: {
            title: post.title,
            type: 'article',
            url: `https://www.pyomin.com/posts/${props?.params?.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostDetail(props: any) {
    const post = await postService.getPostBySlug(props?.params?.slug);
    if (!post) notFound();

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <div className={styles.meta}>
                    <time className={styles.date} dateTime={post.createdAt}>
                        {post.createdAt}
                    </time>

                    <span className={styles.category}>{post.category}</span>
                </div>

                <h1 className={styles.title}>{post.title}</h1>
            </header>

            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}