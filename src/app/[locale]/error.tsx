'use client'

import styled from "styled-components";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { OutlineButton } from "@/components/common/OutlineButton";
import { MdOutlineHome, MdOutlineHistory } from 'react-icons/md';

export default function Error({
    error,
    reset
}: {
    error: Error;
    reset: () => void;
}) {

    const t = useTranslations('ErrorPage');
    const router = useRouter();

    const isDev = process.env.NODE_ENV === 'development';

    return (
        <ErrorWrapper>

            <TitleSection>
                <Image
                    src="/images/error.webp"
                    alt={t('imageAlt')}
                    width={256}
                    height={278}
                    priority
                />
                <Title>{t('defaultMessage')}</Title>
                {isDev && error?.message && (
                    <DevDetail>{error.message}</DevDetail>
                )}
            </TitleSection>

            <ActionNav>
                <OutlineButton type="button" icon={<MdOutlineHome size={24} />} label={t('homeButton')} onClick={() => router.push('/')}></OutlineButton>
                <OutlineButton type="button" icon={<MdOutlineHistory size={24} />} label={t('retryButton')} onClick={reset}></OutlineButton>
            </ActionNav>

        </ErrorWrapper>
    );
}

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;    
    height: calc(100vh - 152px);

    @media (max-width: 768px) {
        height: calc(100vh - 120px);
    }
`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: column;   
    align-items: center;
    gap: 16px;
    width: 80%;
    margin-bottom: 3rem;    
`;

const Title = styled.h1`
    font-size: 1.5rem;
`;

const DevDetail = styled.pre`
    margin: 0;
    padding: 0.75rem 1rem;
    max-width: 100%;
    overflow-x: auto;
    font-size: 0.85rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--text-color);
    background-color: var(--card-bg);
    border: 1px dashed var(--border-color);
    border-radius: 0.5rem;
    white-space: pre-wrap;
    word-break: break-word;
`;

const ActionNav = styled.nav`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;    
`;