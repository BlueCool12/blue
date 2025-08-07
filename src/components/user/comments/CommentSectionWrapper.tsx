'use client';

import dynamic from 'next/dynamic';

import { CommentSkeleton } from './CommentSkeleton';

interface Props {
    postId: number;
}

const CommentSection = dynamic<Props>(
    () => import('./CommentSection').then(mod => mod.CommentSection),
    {
        ssr: false,
        loading: () => <CommentSkeleton />,
    }
);

export default function CommentSectionWrapper({ postId }: Props) {
    return <CommentSection postId={postId} />;
}
