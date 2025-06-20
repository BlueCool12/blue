import { useState } from "react";

import styled from "styled-components";

interface Props {
    initialNickname?: string;
    initialContent?: string;
    onCancel?: () => void;
    onSubmit: (content: string, password: string) => void;
    loading?: boolean;
}

export const CommentForm: React.FC<Props> = ({
    initialNickname = "",
    initialContent = "",
    onCancel,
    onSubmit,
    loading = false,
}) => {

    const [nickname, setNickname] = useState(initialNickname);
    const [content, setContent] = useState(initialContent);
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!/^\d{4}$/.test(password.trim())) {
            alert("비밀번호는 숫자 4자리여야 합니다.");
            return;
        }

        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        onSubmit(content.trim(), password.trim());
    };

    return (
        <FormWrapper>
            <TopInputWrapper>
                <NicknameInput
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                    maxLength={10}
                />
                <PasswordInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    maxLength={4}
                />
            </TopInputWrapper>

            <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
            />

            <InputWrapper>
                <SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? "전송 중..." : "확인"}
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
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const PasswordInput = styled.input`
  width: 6rem;
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