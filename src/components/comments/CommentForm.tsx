import styled from "styled-components";

import { toast } from "react-toastify";

import { getRandomAnonymousNickname } from "@/lib/utils/getRandomAnonymousNickname";
import { CommentFormValues, useCommentForm } from "@/hooks/useCommentForm";

interface Props {
    initialValues?: Partial<CommentFormValues>;
    placeholder?: string;
    onCancel?: () => void;
    onSubmit: (data: { nickname: string; password: string; content: string; parentId?: number }) => void;
    loading?: boolean;
    maxLength?: number;
}

export const CommentForm: React.FC<Props> = ({
    initialValues = {},
    placeholder = '',
    onCancel,
    onSubmit,
    loading = false,
    maxLength = 200,
}) => {
    const { form, handleChange, isOver } = useCommentForm(initialValues, maxLength);

    const handleSubmit = () => {
        if (!/^\d{4}$/.test(form.password.trim())) {
            toast.error('비밀번호는 숫자 4자리여야 합니다.');
            return;
        }

        if (!form.content.trim()) {
            toast.error('내용을 입력해주세요.');
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
                    placeholder="닉네임 (선택)"
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

            <ContentWrapper>
                <TextArea
                    value={form.content}
                    onChange={handleChange("content")}
                    placeholder={placeholder || "내용을 입력하세요"}
                />

                <CharCount isOver={isOver}>
                    {form.content.length}/{maxLength}
                </CharCount>
            </ContentWrapper>

            <InputWrapper>
                <SubmitButton onClick={handleSubmit} type="button" disabled={loading}>
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
    gap: 0.8rem;
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

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    resize: none;
    height: 5rem;
`;

const CharCount = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isOver",
}) <{ isOver: boolean }>`
    width: 100%;
    color: ${({ isOver }) => (isOver ? '#dc2626' : 'inherit')};
    font-weight: ${({ isOver }) => (isOver ? '500' : 'normal')};
    font-size: 0.8rem;
    text-align: right;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: var(--theme-color-9);
    color: #fff;
    border: none;
    border-radius: 0.5rem;    

    &:hover {
        background-color: var(--theme-color-8);
    }
`;

const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 0.5rem;    

    &:hover {
        background-color: #bbb;
    }
`;