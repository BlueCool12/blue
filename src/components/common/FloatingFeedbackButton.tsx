'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { MdOutlineWavingHand } from 'react-icons/md';
import { FeedbackModal } from '@/components/common/FeedbackModal';

export const FloatingFeedbackButton = () => {
  const t = useTranslations('Feedback');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonContainer
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        title={t('title')}
        aria-label={t('title')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <MdOutlineWavingHand aria-hidden="true" />
      </ButtonContainer>

      {isOpen && (
        <FeedbackModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: calc(50% - 400px + 1rem);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--theme-color-9);
  color: white;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 999;
  border: none;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: var(--theme-color-8);
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
  }
`;
