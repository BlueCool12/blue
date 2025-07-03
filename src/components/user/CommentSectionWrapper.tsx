'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useEffect, useState } from 'react';

interface Props {
    postId: number;
}

const CommentSection = dynamic<Props>(
    () => import('./CommentSection').then(mod => mod.CommentSection),
    { ssr: false }
);

export default function CommentSectionWrapper({ postId }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <LoadingSpinner />;

    return <CommentSection postId={postId} />;
}
