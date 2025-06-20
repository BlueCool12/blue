'use client';

import { useEffect, useState } from "react";

import styled from "styled-components";

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { CommentEditor } from "./CommentEditor";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteComment, fetchComments } from "@/store/user/commentSlice";
import { CommentForm } from "./CommentForm";

interface Props {
    postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {

    const dispatch = useAppDispatch();
    const { comments, error } = useAppSelector((state) => state.userComment);

    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const handleDeleteComment = async (commentId: number) => {
        const input = prompt("비밀번호를 입력하세요");

        if (!input || input.length !== 4 || !/^\d{4}$/.test(input)) {
            alert("비밀번호는 4자리 숫자입니다.");
            return;
        }

        try {
            await dispatch(deleteComment({ postId, commentId, password: input })).unwrap();
            alert("댓글이 삭제되었습니다.");
        } catch {
            alert("댓글 삭제에 실패했습니다.");
        }
    }

    const handleEditClick = (commentId: number) => {
        setEditingCommentId(commentId);
    };

    const handleEditSubmit = () => {
        setEditingCommentId(null);
    }

    if (error) throw new Error(error);

    return (
        <Section>

            <CommentList>
                {comments.length === 0 ? (
                    <CommentItem>첫 댓글을 남겨보세요!</CommentItem>
                ) : (
                    comments.map((comment) => (
                        <CommentItem key={comment.id}>

                            {editingCommentId === comment.id ? (
                                <CommentForm
                                    initialContent={comment.content}
                                    onCancel={() => setEditingCommentId(null)}
                                    onSubmit={(content, password) =>
                                        handleEditSubmit()
                                    }
                                />
                            ) : (
                                <CommentBody>
                                    <CommentAuthor>{comment.nickname}</CommentAuthor>
                                    <CommentContent>{comment.content}</CommentContent>
                                </CommentBody>
                            )}

                            <MetaAndActions>
                                <CommentMeta>{comment.createdAt}</CommentMeta>

                                {!comment.isDeleted && (
                                    <ButtonGroup>
                                        <CommentEditButton onClick={() => handleEditClick(comment.id)}>
                                            <MdOutlineEdit />
                                        </CommentEditButton>
                                        <CommentDeleteButton onClick={() => handleDeleteComment(comment.id)}>
                                            <MdOutlineDelete />
                                        </CommentDeleteButton>
                                    </ButtonGroup>
                                )}
                            </MetaAndActions>

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

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CommentAuthor = styled.div`
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--theme-color-9);  
`;

const CommentContent = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-color);
`;

const MetaAndActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
`;

const CommentMeta = styled.div`
    margin-top: 0.5rem;
    font-size: 0.75rem;
    justify-self: end;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const CommentEditButton = styled.button`
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
        color: var(--theme-color-9);
    }
`;

const CommentDeleteButton = styled.button`
    background: none;
    border: none;    
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
        color: var(--theme-color-9);        
    }
`;