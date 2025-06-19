'use client';

import { useEffect, useRef, useState } from "react";

import styled from 'styled-components';

import { MdOutlineModeComment, MdOutlineSend } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { createComment } from "@/store/user/commentSlice";

interface Props {
    postId: number;
}

export const CommentEditor: React.FC<Props> = ({ postId }) => {

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state: RootState) => state.userComment);

    const [open, setOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');

    const editorRef = useRef<HTMLDivElement>(null);
    const floatingBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                editorRef.current &&
                !editorRef.current.contains(target) &&
                !floatingBtnRef.current?.contains(target)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);


    const handleSubmit = async () => {
        const checkedNickname = nickname.trim() || '익명';
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            alert('댓글을 입력해주세요!');
            return;
        }

        await dispatch(createComment({
            postId,
            parentId: null,
            nickname: checkedNickname,
            content: trimmedContent,
        }));

        alert("댓글이 등록되었습니다!");
        setContent('');
        setOpen(false);
    };

    if (error) throw new Error(error);

    return (
        <>
            <FloatingButton ref={floatingBtnRef} onClick={() => setOpen(prev => !prev)}>
                <MdOutlineModeComment />
            </FloatingButton>

            {open && (
                <EditorBox ref={editorRef}>
                    <NicknameInput
                        placeholder="닉네임 (선택)"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextArea
                        placeholder="소중한 의견 남겨주세요 :D"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <SubmitButton onClick={handleSubmit} disabled={loading}>
                        {loading ? "전송 중..." : (<MdOutlineSend />)}
                    </SubmitButton>

                </EditorBox>
            )}
        </>
    );
};

const FloatingButton = styled.button`
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: var(--theme-color-9);
    color: white;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: var(--theme-color-8);
    }

    @media (max-width: 768px) {
        bottom: 4.5rem;
        right: 1rem;
    }
`;

const EditorBox = styled.div`
    width: 20rem;
    position: fixed;
    bottom: 10rem;    
    right: 2rem;
    padding: 1rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (max-width: 768px) {            
        bottom: 8.5rem;                    
        right: 1rem;
        width: calc(100% - 2rem);
    }
`;

const NicknameInput = styled.input`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    font-size: 0.9rem;    
`;

const TextArea = styled.textarea`
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    font-size: 0.95rem;
    resize: none;
    height: 5rem;
`;

const SubmitButton = styled.button`
    width: 100%;    
    padding: 0.5rem 0;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--theme-color-9);
    color: white;
    font-size: 1rem;
    display: flex;    
    justify-content: center;
    cursor: pointer;

    &:hover {
        background: var(--theme-color-8);
    }
`;
