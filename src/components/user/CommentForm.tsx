import { useState } from "react";

import styled from "styled-components";

import { getRandomAnonymousNickname } from "@/lib/utils/getRandomAnonymousNickname";

interface CommentFormValues {
    nickname: string;
    password: string;
    content: string;
}

interface Props {
    initialValues?: Partial<CommentFormValues>;
    onCancel?: () => void;
    onSubmit: ({ nickname, password, content }: { nickname: string; password: string; content: string; }) => void;
    loading?: boolean;
}

export const CommentForm: React.FC<Props> = ({
    initialValues = {},
    onCancel,
    onSubmit,
    loading = false,
}) => {

    const [form, setForm] = useState<CommentFormValues>({
        nickname: initialValues.nickname ?? "익명의티라노",
        password: "",
        content: initialValues.content ?? "",
    });

    const handleChange = (field: keyof CommentFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        if (!/^\d{4}$/.test(form.password.trim())) {
            alert("비밀번호는 숫자 4자리여야 합니다.");
            return;
        }

        if (!form.content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        const trimmedNickname = form.nickname.trim() || getRandomAnonymousNickname();

        onSubmit({
            nickname: trimmedNickname,
            password: form.password.trim(),
            content: form.content.trim()
        });
    };

    return (
        <FormWrapper>
            <TopInputWrapper>
                <NicknameInput
                    value={form.nickname}
                    onChange={handleChange("nickname")}
                    placeholder="닉네임"
                    maxLength={10}
                />
                <PasswordInput
                    type="password"
                    value={form.password}
                    onChange={handleChange("password")}
                    placeholder="비밀번호"
                    maxLength={4}
                />
            </TopInputWrapper>

            <TextArea
                value={form.content}
                onChange={handleChange("content")}
                placeholder="내용을 입력하세요"
            />

            <InputWrapper>
                <SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? "전송 중..." : "등록"}
                </SubmitButton>
                {onCancel && <CancelButton onClick={onCancel}>취소</CancelButton>}
            </InputWrapper>
        </FormWrapper>
    );
};

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const TopInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NicknameInput = styled.input`
  width: 70%;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const PasswordInput = styled.input` 
  width: 30%; 
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    font-size: 0.9rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    resize: none;
    height: 5rem;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: end;
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: var(--theme-color-9);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: var(--theme-color-8);
    }
`;

const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ccc;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #bbb;
    }
`;