'use client';

import { useEffect, useState } from "react";

import styled from "styled-components";

import { toast } from "react-toastify";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { CommentEditor } from "./CommentEditor";
import { CommentForm } from "./CommentForm";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteComment, fetchComments, updateComment } from "@/store/user/commentSlice";
import { commentService } from "@/services/user/commentService";

interface Props {
    postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {
    const [isClient, setIsClient] = useState(false);

    const dispatch = useAppDispatch();
    const { comments } = useAppSelector((state) => state.userComment);

    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const loadComments = async () => {
            try {
                await dispatch(fetchComments(postId)).unwrap();
            } catch {
                toast.error("댓글을 불러오지 못했습니다.");
            }
        };

        loadComments();
    }, [dispatch, postId]);

    const handleDeleteComment = async (commentId: number) => {
        if (!isClient) return;

        const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");

        if (input === null) return;

        if (!/^\d{4}$/.test(input)) {
            alert("비밀번호는 4자리 숫자입니다.");
            return;
        }

        try {
            await dispatch(deleteComment({ postId, commentId, password: input })).unwrap();
            toast.success("댓글이 삭제되었습니다.");
        } catch {
            toast.error("댓글 삭제에 실패했습니다.");
        }
    }

    const handleEditClick = async (commentId: number) => {
        if (!isClient) return;

        const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");

        if (input === null) return;

        if (!/^\d{4}$/.test(input)) {
            alert("비밀번호는 4자리 숫자입니다.");
            return;
        }

        const matched = await commentService.verifyCommentPassword(commentId, input);

        if (matched) {
            setEditingCommentId(commentId);
        } else {
            toast.error("비밀번호가 일치하지 않습니다.");
        }
    };

    const handleEditSubmit = async ({ nickname, password, content }: { nickname: string; password: string; content: string; }) => {

        if (editingCommentId === null) return;

        try {
            await dispatch(updateComment({ commentId: editingCommentId, postId, data: { nickname, password, content } })).unwrap();

            toast.success("댓글이 수정되었습니다.");
            setEditingCommentId(null);
        } catch {
            toast.error("댓글 수정에 실패했습니다.");
        }

    }

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
                                    initialValues={{ nickname: comment.nickname, content: comment.content }}
                                    onCancel={() => setEditingCommentId(null)}
                                    onSubmit={handleEditSubmit}
                                />
                            ) : (
                                <CommentBody>
                                    <CommentAuthor>{comment.nickname}</CommentAuthor>
                                    <CommentContent>{comment.content}</CommentContent>
                                </CommentBody>
                            )}

                            <MetaAndActions $isEditing={editingCommentId === comment.id}>
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
    padding: 2rem 0 5rem;
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

const MetaAndActions = styled.div<{ $isEditing: boolean }>`
    display: ${({ $isEditing }) => ($isEditing ? 'none' : 'flex')};
    justify-content: space-between;
    align-items: center;    
`;

const CommentMeta = styled.div`    
    font-size: 0.75rem;
    justify-self: end;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    color: var(--text-color);
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