'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { FaFacebookF, FaTwitter, FaLink } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

import { useIsMobile } from '@/hooks/useIsMobile';
import { MdIosShare } from 'react-icons/md';
import { toast } from 'react-toastify';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
    const t = useTranslations('Share');
    const { isMobile, ready } = useIsMobile();

    const shareUrl = `https://pyomin.com/posts/${slug}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success(t('linkCopied'));
        } catch {
            toast.error(t('copyFailed'));
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url: shareUrl,
                });
            } catch (error: unknown) {
                if (typeof error === 'object' && error !== null) {
                    const shareError = error as { name?: string; message?: string };
                    if (shareError.name === 'AbortError') return;
                    if (typeof shareError.message === 'string' && shareError.message.includes('cancel')) return;
                }

                toast.error(t('shareFailed'));
            }
        } else {
            handleCopy();
        }
    }

    if (!ready) return null;

    return (
        <Wrapper>

            {isMobile ? (
                <ShareButton aria-label={t('shareLabel')} title={t('shareLabel')} onClick={handleNativeShare}>
                    <MdIosShare />
                </ShareButton>
            ) : (
                <>
                    <ShareButton aria-label={t('facebook')} title={t('facebook')} onClick={() =>
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
                    }>
                        <FaFacebookF />
                    </ShareButton>

                    <ShareButton aria-label={t('twitter')} title={t('twitter')} onClick={() =>
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
                    }>
                        <FaTwitter />
                    </ShareButton>

                    <ShareButton aria-label={t('naver')} title={t('naver')} onClick={() =>
                        window.open(`https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`, '_blank')
                    }>
                        <SiNaver />
                    </ShareButton>

                    <ShareButton aria-label={t('linkShare')} title={t('linkShare')} onClick={handleCopy}>
                        <FaLink />
                    </ShareButton>
                </>
            )}
        </Wrapper >
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
    transition: background-color 0.2s ease transform 0.2s ease;

    svg {
        font-size: 1rem;        
    }

    &:hover {
        background-color: var(--btn-hover-color);
        transform: scale(1.1);
    }
`;
