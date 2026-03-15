'use client';

import React, { useState } from 'react';
import { MdOutlineSend, MdKeyboardArrowDown } from 'react-icons/md';

import styled from 'styled-components';

interface FeedbackModalProps {
  onClose: () => void;
}

type FeedbackCategory = 'TYPO' | 'ERROR' | 'COMMENT_DELETE' | 'OTHER';

const categoryLabels: Record<FeedbackCategory, string> = {
  TYPO: '오타 제보',
  ERROR: '잘못된 내용 수정 요청',
  COMMENT_DELETE: '댓글 삭제 요청',
  OTHER: '기타 건의사항'
};

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const [category, setCategory] = useState<FeedbackCategory>('TYPO');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Connect to backend API
      console.log('Submitting feedback:', { category, content });

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      alert('소중한 의견 감사합니다!');
      onClose();
    } catch (error) {
      alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Feedback submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <EditorBox onClick={e => {
        e.stopPropagation();
        if (isDropdownOpen) setIsDropdownOpen(false);
      }}>
        <Header>
          <Title>피드백 보내기</Title>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <SelectContainer onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}>
              <SelectHeader $isOpen={isDropdownOpen}>
                {categoryLabels[category]}
                <MdKeyboardArrowDown size={20} />
              </SelectHeader>
              {isDropdownOpen && (
                <DropdownList>
                  {(Object.keys(categoryLabels) as FeedbackCategory[]).map((cat) => (
                    <DropdownItem
                      key={cat}
                      $isSelected={category === cat}
                      onClick={() => {
                        setCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {categoryLabels[cat]}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </SelectContainer>
          </FormGroup>

          <ContentWrapper>
            <TextArea
              placeholder={`피드백 내용을 적어주세요 :D\n조금만 작성해도 큰 도움이 돼요!`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ContentWrapper>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '전송 중...' : <MdOutlineSend />}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </EditorBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
`;

const EditorBox = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: modal-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes modal-pop {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const SelectHeader = styled.div<{ $isOpen: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? 'var(--theme-color-9)' : 'var(--border-color)')};
  background-color: var(--header-bg);
  color: var(--text-color);
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: var(--text-color-light);
  }

  &:hover {
    border-color: var(--theme-color-9);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: var(--header-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  animation: dropdown-fade 0.2s ease;

  @keyframes dropdown-fade {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: ${({ $isSelected }) => ($isSelected ? 'var(--theme-color-9)' : 'var(--text-color)')};
  background-color: ${({ $isSelected }) => ($isSelected ? 'rgba(20, 91, 111, 0.05)' : 'transparent')};
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-bg, rgba(0, 0, 0, 0.03));
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--header-bg);
  color: var(--text-color);
  font-size: 0.95rem;
  resize: none;
  height: 7rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    border-color: var(--theme-color-9);
    box-shadow: 0 0 0 1px var(--theme-color-9);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 8px;
`;

const ButtonBase = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  font-family: inherit;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(ButtonBase)`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--theme-color-9);
  color: white;
  font-size: 1rem;
  display: flex;    
  justify-content: center;    
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--theme-color-8);
  }
`;
