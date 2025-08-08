'use client';

import { Fragment, useState } from "react";

import styled from "styled-components";

import { toast } from "react-toastify";
import { MdOutlineDelete, MdOutlineEdit, MdSubdirectoryArrowRight } from "react-icons/md";
import { CommentEditor } from "./CommentEditor";
import { CommentForm } from "./CommentForm";

import { commentService } from "@/services/user/commentService";
import { useComments } from "@/hooks/queries/comments/useComments";

interface Props {
    postId: number;
}

export const CommentSection: React.FC<Props> = ({ postId }) => {

    const comments = useComments(postId);

    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

    const handleDeleteComment = async (commentId: number) => {

        const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");

        if (input === null) return;

        if (!/^\d{4}$/.test(input)) {
            toast.error('비밀번호는 4자리 숫자입니다.');
            return;
        }

        try {
            await commentService.deleteComment({ postId, commentId, password: input });
            toast.success("댓글이 삭제되었습니다.");
            comments.refetch();
        } catch {
            toast.error("댓글 삭제에 실패했습니다.");
        }
    }

    const handleEditClick = async (commentId: number) => {

        const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");

        if (input === null) return;

        if (!/^\d{4}$/.test(input)) {
            toast.error('비밀번호는 4자리 숫자입니다.');
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
            await commentService.updateComment(editingCommentId, { nickname, password, content });
            toast.success("댓글이 수정되었습니다.");
            setEditingCommentId(null);
            comments.refetch();
        } catch {
            toast.error("댓글 수정에 실패했습니다.");
        }

    }

    const handleReplySubmit = async (
        parentId: number,
        { nickname, password, content }: { nickname: string; password: string; content: string }
    ) => {
        try {
            await commentService.createComment({
                postId,
                parentId,
                nickname,
                password,
                content,
            });

            toast.success('답글이 등록되었습니다.');
            setReplyToCommentId(null);
            comments.refetch();
        } catch {
            toast.error('답글 등록에 실패했습니다.');
        }
    }

    return (
        <Section>

            <CommentList>
                {comments.isError ? (
                    <CommentItem>댓글을 불러오는 데 실패했습니다. 새로고침 해주세요.</CommentItem>
                ) : comments.data?.length === 0 ? (
                    <CommentItem>첫 댓글을 남겨보세요! ( =&#39;X&#39;= )</CommentItem>
                ) : (
                    comments.data?.map((comment) => (
                        <Fragment key={comment.id}>
                            {/* 댓글 */}
                            <CommentItem>
                                {editingCommentId === comment.id ? (
                                    <CommentForm
                                        initialValues={{ nickname: comment.nickname, content: comment.content }}
                                        onCancel={() => setEditingCommentId(null)}
                                        onSubmit={handleEditSubmit}
                                    />
                                ) : (
                                    <>
                                        <CommentHeader>
                                            <CommentAuthor>{comment.nickname}</CommentAuthor>
                                            <CommentDate>{comment.createdAt}</CommentDate>
                                        </CommentHeader>

                                        <CommentContent>{comment.content}</CommentContent>
                                    </>
                                )}

                                <CommentFooter $isEditing={editingCommentId === comment.id}>
                                    {!comment.isDeleted && (
                                        <>
                                            <ReplyButton onClick={() => {
                                                setReplyToCommentId((prev) =>
                                                    prev === comment.id ? null : comment.id
                                                )
                                            }}>
                                                <MdSubdirectoryArrowRight size={14} />답글 달기
                                            </ReplyButton>

                                            <ButtonGroup>
                                                <CommentEditButton onClick={() => handleEditClick(comment.id)} aria-label="댓글 수정">
                                                    <MdOutlineEdit size={14} />
                                                </CommentEditButton>
                                                <CommentDeleteButton onClick={() => handleDeleteComment(comment.id)} aria-label="댓글 삭제">
                                                    <MdOutlineDelete size={14} />
                                                </CommentDeleteButton>
                                            </ButtonGroup>
                                        </>
                                    )}
                                </CommentFooter>
                            </CommentItem>

                            {/* 대댓글 작성 폼 */}
                            {replyToCommentId === comment.id && (
                                <ReplyFormWrapper>
                                    <CommentForm
                                        initialValues={{ nickname: '', content: '' }}
                                        placeholder={`@${comment.nickname}`}
                                        onCancel={() => setReplyToCommentId(null)}
                                        onSubmit={(data) => handleReplySubmit(comment.id, data)}
                                    />
                                </ReplyFormWrapper>
                            )}

                            {/* 대댓글 */}
                            {comment.children.map((child) => (
                                <ReplyCommentItem key={child.id}>
                                    {editingCommentId === child.id ? (
                                        <CommentForm
                                            initialValues={{ nickname: child.nickname, content: child.content }}
                                            onCancel={() => setEditingCommentId(null)}
                                            onSubmit={handleEditSubmit}
                                        />
                                    ) : (
                                        <>
                                            <CommentHeader>
                                                <CommentAuthor>{child.nickname}</CommentAuthor>
                                                <CommentDate>{child.createdAt}</CommentDate>
                                            </CommentHeader>

                                            <CommentContent>{child.content}</CommentContent>
                                        </>
                                    )}

                                    <CommentFooter $isEditing={editingCommentId === child.id} $isReply={true}>
                                        {!child.isDeleted && (
                                            <ButtonGroup>
                                                <CommentEditButton onClick={() => handleEditClick(child.id)} aria-label="댓글 수정">
                                                    <MdOutlineEdit size={14} />
                                                </CommentEditButton>
                                                <CommentDeleteButton onClick={() => handleDeleteComment(child.id)} aria-label="댓글 삭제">
                                                    <MdOutlineDelete size={14} />
                                                </CommentDeleteButton>
                                            </ButtonGroup>
                                        )}
                                    </CommentFooter>
                                </ReplyCommentItem>
                            ))}
                        </Fragment>
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

const ReplyCommentItem = styled(CommentItem)`
    width: 95%;
    margin-left: auto;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.div`
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--theme-color-9);  
`;

const CommentDate = styled.div`    
    font-size: 0.8rem;    
`;

const CommentContent = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-color);
`;

const CommentFooter = styled.div<{ $isEditing: boolean; $isReply?: boolean }>`
    display: ${({ $isEditing }) => ($isEditing ? 'none' : 'flex')};    
    align-items: center;    
    justify-content: ${({ $isReply }) => ($isReply ? 'flex-end' : 'space-between')};
`;

const ButtonGroup = styled.div`
    display: flex;        
    gap: 0.5rem;    
`;

const ReplyButton = styled.button`
    display: flex;
    font-size: 0.7rem;
    align-items: center;
    color: var(--text-color);

    svg {
        color: var(--text-color);        
    }

    &:hover {
        color: var(--link-hover-color);

        svg {
            color: var(--link-hover-color);
        }
    }
`;

const CommentEditButton = styled.button`    
    svg {
        color: var(--text-color);        
    }

    &:hover {
        color: var(--theme-color-9);

        svg {
            color: var(--link-hover-color);
        }
    }
`;

const CommentDeleteButton = styled.button`         
    svg {
        color: var(--text-color);
    }

    &:hover {
        color: var(--theme-color-9);  
        
        svg {
            color: var(--link-hover-color);
        }
    }
`;

const ReplyFormWrapper = styled.div`    
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    padding: 0.5rem 1rem 1rem;
    border-radius: 0.75rem;
`;