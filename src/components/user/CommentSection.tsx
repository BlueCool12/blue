'use client';

import { useEffect } from "react";

import styled from "styled-components";

import { CommentEditor } from "./CommentEditor";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchComments } from "@/store/user/commentSlice";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface Props {
    postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {

    const dispatch = useAppDispatch();
    const { comments, loading, error } = useAppSelector((state) => state.userComment);

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    if (error) throw new Error(error);

    return (
        <Section>            

            <CommentList>
                {loading ? (
                    <LoadingSpinner />
                ) : comments.length === 0 ? (
                    <CommentItem>첫 댓글을 남겨보세요!</CommentItem>
                ) : (
                    comments.map((comment) => (
                        <CommentItem key={comment.id}>
                            <CommentAuthor>{comment.nickname}</CommentAuthor>
                            <CommentContent>{comment.content}</CommentContent>
                        </CommentItem>
                    ))
                )}
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