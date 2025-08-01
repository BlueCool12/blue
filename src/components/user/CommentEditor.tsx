'use client';

import { useEffect, useRef, useState } from "react";

import styled from 'styled-components';

import { MdOutlineModeComment, MdOutlineSend } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { createComment } from "@/store/user/commentSlice";

import { getRandomAnonymousNickname } from "@/lib/utils/getRandomAnonymousNickname";

interface Props {
    postId: number;
}

export const CommentEditor: React.FC<Props> = ({ postId }) => {

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state: RootState) => state.userComment);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        nickname: '',
        content: '',
        password: '',
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'password' && !/^\d*$/.test(value)) return;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const trimmedNickname = form.nickname.trim() || getRandomAnonymousNickname();
        const trimmedPassword = form.password.trim();
        const trimmedContent = form.content.trim();

        if (!/^\d{4}$/.test(trimmedPassword)) {
            alert('숫자 4자리의 비밀번호를 입력해주세요.');
            return;
        }

        if (!trimmedContent) {
            alert('내용을 적어주세요.');
            return;
        }

        await dispatch(createComment({
            postId,
            parentId: null,
            nickname: trimmedNickname,
            password: form.password,
            content: trimmedContent,
        }));

        alert("댓글이 등록되었습니다!");
        setForm({ nickname: '', content: '', password: '' });
        setOpen(false);
    };

    if (error) throw new Error(error);

    return (
        <>
            <FloatingButton
                ref={floatingBtnRef}
                onClick={() => setOpen(prev => !prev)}
                aria-label="댓글 작성하기"
            >
                <MdOutlineModeComment />
            </FloatingButton>

            {open && (
                <EditorBox ref={editorRef}>

                    <NicknamePasswordWrapper>
                        <NicknameInput
                            placeholder="닉네임 (선택)"
                            maxLength={10}
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                        />
                        <PasswordInput
                            placeholder="비밀번호"
                            maxLength={4}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </NicknamePasswordWrapper>

                    <TextArea
                        placeholder="소중한 의견 남겨주세요 :D"
                        name="content"
                        value={form.content}
                        onChange={handleChange}
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
    bottom: 5.5rem;
    right: calc(50% - 400px + 1rem);
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
    right: calc(50% - 400px + 1rem);
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

const NicknamePasswordWrapper = styled.div`    
    display: flex;
    gap: 0.5rem;    
    width: 100%;
`;

const NicknameInput = styled.input`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    font-size: 0.9rem;    
    width: 70%;
`;

const PasswordInput = styled.input`    
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    font-size: 0.9rem;
    width: 30%;
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

    &:hover {
        background: var(--theme-color-8);
    }
`;
