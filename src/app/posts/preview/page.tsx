'use client';

import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import styles from '@/app/posts/[slug]/page.module.css';

interface PostPreviewData {
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function PreviewPage() {
  const [post, setPost] = useState<PostPreviewData | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      const isAllowed = origin.endsWith('.pyomin.com');
      if (!isAllowed) return;

      if (event.data.type === 'PREVIEW_DATA') setPost(event.data.payload);
    }

    window.addEventListener('message', handleMessage);
    if (window.parent) window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const contentHtml = useMemo(() => ({ __html: post?.content || '' }), [post?.content]);

  if (!post) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <article className={styles.article} style={{ animation: 'fadeIn 0.3s ease-in' }}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <time className={styles.date}>{post.createdAt}</time>
          <span className={styles.category}>
            {post?.category || '임시 카테고리'}
          </span>
        </div>

        <h1 className={styles.title}>{post?.title}</h1>
      </header>

      <div
        className={`${styles.content} lexical-theme`}
        dangerouslySetInnerHTML={contentHtml}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
}