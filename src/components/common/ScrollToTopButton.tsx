'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { MdKeyboardArrowUp } from 'react-icons/md';

export const ScrollToTopButton = () => {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isPostsPage = pathname.startsWith('/posts');

  useEffect(() => {
    if (!isPostsPage) {
      setVisible(false);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPostsPage]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isPostsPage) return null;

  return (
    <ButtonContainer
      type="button"
      onClick={handleClick}
      title={t('scrollToTop')}
      aria-label={t('scrollToTop')}
      $visible={visible}
    >
      <MdKeyboardArrowUp aria-hidden="true" />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 5.75rem;
  right: calc(50% - 400px + 1rem);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--theme-color-9);
  color: white;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 999;
  border: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '0.5rem')});
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: var(--theme-color-8);
  }

  @media (max-width: 768px) {
    bottom: 5.25rem;
    right: 1rem;
  }
`;
