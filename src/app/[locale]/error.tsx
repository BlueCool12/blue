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
                <Title>{error?.message || t('defaultMessage')}</Title>
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

const ActionNav = styled.nav`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;    
`;