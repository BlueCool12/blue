import { commentService } from "@/services/commentService";
import { Comment, COMMENT_STATUS } from "@/types/comment";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CommentForm } from "./CommentForm";
import { MdOutlineDelete, MdOutlineEdit, MdStars, MdSubdirectoryArrowRight } from "react-icons/md";

interface SingleCommentProps {
  comment: Comment;
  postId: number;
  refetch: () => void;
  depth?: number;
}

export const SingleComment: React.FC<SingleCommentProps> = ({ comment, postId, refetch, depth = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const isAdmin = comment.adminId !== null;

  const handleDelete = async () => {
    const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");
    if (!input) return;
    if (!/^\d{4}$/.test(input)) return toast.error('비밀번호는 4자리 숫자입니다.');

    try {
      await commentService.deleteComment({ postId, commentId: comment.id, password: input });
      toast.success("댓글이 삭제되었습니다.");
      refetch();
    } catch {
      toast.error("댓글 삭제에 실패했습니다.");
    }
  };

  const handleEditClick = async () => {
    const input = prompt("⬇️ 비밀번호를 입력해 주세요 ⬇️");
    if (!input) return;
    if (!/^\d{4}$/.test(input)) return toast.error('비밀번호는 4자리 숫자입니다.');

    const matched = await commentService.verifyCommentPassword(comment.id, input);
    if (matched) {
      setIsEditing(true);
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
  };

  const onEditSubmit = async (data: { nickname: string; password: string; content: string; }) => {
    try {
      await commentService.updateComment(
        comment.id,
        { nickname: data.nickname, password: data.password, content: data.content }
      );
      toast.success("댓글이 수정되었습니다.");
      setIsEditing(false);
      refetch();
    } catch {
      toast.error("댓글 수정에 실패했습니다.");
    }
  };

  const onReplySubmit = async (data: { nickname: string; password: string; content: string; }) => {
    try {
      await commentService.createComment({
        postId,
        parentId: comment.id,
        ...data,
      });

      toast.success('답글이 등록되었습니다.');
      setIsReplying(false);
      refetch();
    } catch {
      toast.error('답글 등록에 실패했습니다.');
    }
  };

  return (
    <CommentWrapper $depth={depth}>
      <CommentItem $isReply={depth > 0} $isAdmin={isAdmin}>
        {isEditing ? (
          <CommentForm
            initialValues={{ nickname: comment.nickname, content: comment.content }}
            onCancel={() => setIsEditing(false)}
            onSubmit={onEditSubmit}
          />
        ) : (
          <>
            <CommentHeader>
              <CommentAuthor $isAdmin={isAdmin}>
                {comment.nickname}
                {isAdmin && (
                  <AdminBadge aria-label="관리자 계정 인증 배지">
                    <MdStars size={16} />
                  </AdminBadge>
                )}
              </CommentAuthor>

              {!isAdmin && comment.status !== COMMENT_STATUS.DELETED && (
                <ButtonGroup>
                  <CommentEditButton onClick={handleEditClick} aria-label="댓글 수정">
                    <MdOutlineEdit size={14} />
                  </CommentEditButton>

                  <CommentDeleteButton onClick={handleDelete} aria-label="댓글 삭제">
                    <MdOutlineDelete size={14} />
                  </CommentDeleteButton>
                </ButtonGroup>
              )}
            </CommentHeader>

            <CommentContent>{comment.content}</CommentContent>
          </>
        )}

        <CommentFooter $isEditing={isEditing} $isReply={depth > 0}>
          {comment.status !== COMMENT_STATUS.DELETED && (
            <>
              <ReplyButton onClick={() => setIsReplying(!isReplying)}>
                <MdSubdirectoryArrowRight size={14} />답글 달기
              </ReplyButton>

              <CommentDate>{comment.createdAt}</CommentDate>
            </>
          )}
        </CommentFooter>
      </CommentItem>

      {isReplying && (
        <ReplyFormWrapper>
          <CommentForm
            initialValues={{ nickname: '', content: '' }}
            placeholder={`@${comment.nickname}`}
            onCancel={() => setIsReplying(false)}
            onSubmit={onReplySubmit}
          />
        </ReplyFormWrapper>
      )}

      {comment.children && comment.children.length > 0 && (
        <ChildList>
          {comment.children.map((child) => (
            <SingleComment
              key={child.id}
              comment={child}
              postId={postId}
              refetch={refetch}
              depth={depth + 1}
            />
          ))}
        </ChildList>
      )}
    </CommentWrapper>
  );
};

// Styled
const CommentWrapper = styled.div<{ $depth: number }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;    
  margin-left: ${({ $depth }) => ($depth === 1 ? '1.5rem' : '0')};
`;

const ChildList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 0.5rem;
`;

const CommentItem = styled.div<{ $isReply: boolean; $isAdmin: boolean }>`
  padding: 0.8rem 1rem;
  border: 1px solid ${({ $isAdmin }) => $isAdmin ? 'var(--theme-color-9)' : 'var(--border-color)'};
  border-radius: 0.75rem;
  background-color: var(--card-bg);
  width: fit-content;
  max-width: 100%;
  word-break: break-word;
  position: relative;

  ${({ $isReply, $isAdmin }) => $isReply && `
    &::before {
      content: '';
      position: absolute;
      top: -10px; left: 14px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${$isAdmin ? 'var(--theme-color-9)' : 'var(--border-color)'};
    }
    &::after {
      content: '';
      position: absolute;
      top: -9px; left: 15px;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 9px solid var(--card-bg);
    }
  `}

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  margin-bottom: 0.6rem;
`;

const CommentAuthor = styled.div<{ $isAdmin: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--theme-color-9);  
`;

const AdminBadge = styled.span`
  display: inline-flex;
  align-items: center;
  color: var(--theme-color-9);  
  cursor: help;
`;

const ButtonGroup = styled.div`
  display: flex;        
  gap: 0.5rem;    
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

const CommentContent = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const CommentFooter = styled.div<{ $isEditing: boolean; $isReply?: boolean }>`
  display: ${({ $isEditing }) => ($isEditing ? 'none' : 'flex')};    
  align-items: center;    
  justify-content: ${({ $isReply }) => ($isReply ? 'space-between' : 'space-between')};
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

const CommentDate = styled.div`    
  font-size: 0.75rem;
  opacity: 0.6;
`;

const ReplyFormWrapper = styled.div`    
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  padding: 0.5rem 1rem 1rem;
  border-radius: 0.75rem;
`;