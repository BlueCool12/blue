'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface Props {
    postId: number;
}

const CommentSection = dynamic<Props>(
    () => import('./CommentSection').then(mod => mod.CommentSection),
    {
        ssr: false,
        loading: () => <LoadingSpinner />,
    }
);

export default function CommentSectionWrapper({ postId }: Props) {
    return <CommentSection postId={postId} />;
}
