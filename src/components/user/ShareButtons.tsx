'use client';

import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLink } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
    const shareUrl = `https://pyomin.com/posts/${slug}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('링크가 복사되었습니다 ^__^');
        } catch {
            alert('복사 실패 ㅠ__ㅠ');
        }
    };

    return (
        <Wrapper>
            <ShareButton aria-label='페이스북 공유' title='페이스북 공유' onClick={() =>
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
            }>
                <FaFacebookF />
            </ShareButton>

            <ShareButton aria-label='트위터 공유' title='트위터 공유' onClick={() =>
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
            }>
                <FaTwitter />
            </ShareButton>

            <ShareButton aria-label='네이버 공유' title='네이버 공유' onClick={() =>
                window.open(`https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`, '_blank')
            }>
                <SiNaver />
            </ShareButton>

            <ShareButton aria-label='링크 공유' title='링크 공유' onClick={handleCopy}>
                <FaLink />
            </ShareButton>
        </Wrapper>
    );
};

export default ShareButtons;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;    
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const ShareButton = styled.button`
    display: flex;
    align-items: center;    
    padding: 0.7rem;
    background-color: var(--btn-bg);
    color: var(--btn-color);
    border: none;
    border-radius: 100%;    
    transition: background 0.2s;

    svg {
        font-size: 1rem;        
    }

    &:hover {
        background-color: var(--btn-hover-color);
    }
`;
