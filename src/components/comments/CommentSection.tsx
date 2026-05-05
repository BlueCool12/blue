'use client';

import styled from "styled-components";
import { useTranslations } from "next-intl";

import { CommentEditor } from "./CommentEditor";
import { SingleComment } from "./SingleComment";

import { useComments } from "@/hooks/queries/comments/useComments";

interface Props {
  postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {

  const t = useTranslations('Comments');
  const comments = useComments(postId);

  return (
    <Section>
      <CommentList>
        {comments.isError ? (
          <CommentItem>{t('loadFailed')}</CommentItem>
        ) : comments.data?.length === 0 ? (
          <EmptyComment>{t('emptyMessage')}</EmptyComment>
        ) : (
          comments.data?.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              postId={postId}
              refetch={comments.refetch}
            />
          ))
        )}
      </CommentList>

      <CommentEditor postId={postId} />

    </Section>
  );
};

const Section = styled.section`
    padding: 2rem 0;
`;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const CommentItem = styled.div`
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);

    display: inline-block;
    width: fit-content;
    max-width: 100%;
    word-break: break-word;

    @media (max-width: 768px) {
        display: block;
        width: 100%;
        max-width: 100%;
    }
`;

const EmptyComment = styled.div`
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    width: 100%;
    max-width: 100%;    
`;