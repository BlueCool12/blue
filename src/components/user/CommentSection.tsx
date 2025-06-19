'use client';

import styled from "styled-components";

import { CommentEditor } from "./CommentEditor";

interface Props {
    postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {

    return (
        <Section>

            <CommentList>
                <CommentItem>
                    <CommentAuthor>작성자</CommentAuthor>
                    <CommentContent>댓글 내용입니다. 여기에 실제 댓글 내용이 출력됩니다.</CommentContent>
                </CommentItem>
            </CommentList>

            <CommentEditor postId={postId} />

        </Section>
    );
};

const Section = styled.section`
    padding-bottom: 5rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  background-color: var(--card-bg);
`;

const CommentAuthor = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--theme-color-9);
  margin-bottom: 0.4rem;
`;

const CommentContent = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color);
`;