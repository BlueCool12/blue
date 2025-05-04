import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ErrorImg from '../../assets/images/BlueCoolError.png';
import { OutlineButton } from "../../components/common/OutlineButton";

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <>
            <NotFoundMain>
                <TitleSection>
                    <Title>404</Title>
                    <ErrorImage src={ErrorImg} />
                </TitleSection>

                <Description>페이지를 찾을 수 없습니다</Description>

                <ActionNav>                    
                    <OutlineButton type="button" icon="home" label="메인 페이지" onClick={() => navigate('/')}></OutlineButton>
                    <OutlineButton type="button" icon="history" label="이전 페이지" onClick={() => navigate(-1)}></OutlineButton>
                </ActionNav>

            </NotFoundMain>

        </>
    );
}

const NotFoundMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;    
    height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight.desktop}px - ${theme.layout.footerHeight.desktop}px)`};

    @media (max-width: 768px) {
        height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight.mobile}px - ${theme.layout.footerHeight.mobile}px)`};
    }
`;

const TitleSection = styled.section`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Title = styled.h1`
    font-size: 6rem;    
`;

const ErrorImage = styled.img`
    width: 280px;    
    height: auto;
`;

const Description = styled.p`
    font-size: 1.5rem;        
`;

const ActionNav = styled.nav`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;    
`;