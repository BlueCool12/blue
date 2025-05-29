import styles from './page.module.css';

import { Metadata } from 'next';
import { postService } from '@/services/user/postService';

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const post = await postService.getPostBySlug(params.slug);

    return {
        title: post.title,
        openGraph: {
            title: post.title,
            type: 'article',
            url: `https://www.pyomin.com/posts/${params.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
        },
    };
}

export default async function PostDetail({ params }: { params: { slug: string } }) {

    const post = await postService.getPostBySlug(params.slug);

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