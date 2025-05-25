'use client'

import { useRouter } from "next/navigation";

import { OutlineButton } from "@/components/common/OutlineButton";

import styled from "styled-components";
import Image from "next/image";
import { MdOutlineHome, MdOutlineHistory } from 'react-icons/md';

export default function Error({
    error,
    reset
}: {
    error: Error;
    reset: () => void;
}) {

    const router = useRouter();

    return (
        <ErrorMain>

            <TitleSection>
                <Image
                    src="/images/Error2.png"
                    alt="에러 이미지"
                    width={256}
                    height={278}
                    priority
                />
                <Title>{error?.message || '예상치 못한 오류가 발생했습니다.'}</Title>
            </TitleSection>

            <ActionNav>
                <OutlineButton type="button" icon={<MdOutlineHome size={24} />} label="메인 페이지" onClick={() => router.push('/')}></OutlineButton>
                <OutlineButton type="button" icon={<MdOutlineHistory size={24} />} label="다시 시도" onClick={reset}></OutlineButton>
            </ActionNav>

        </ErrorMain>
    );
}

const ErrorMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;    
    height: 100vh;
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