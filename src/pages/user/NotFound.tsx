import { useNavigate } from "react-router-dom";

import { OutlineButton } from "../../components/common/OutlineButton";

import styled from "styled-components";
import ErrorImg from '../../assets/images/BlueCoolError.png';

const NotFound = () => {

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

export default NotFound;

const NotFoundMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;    
    height: 80vh;    
`;

const TitleSection = styled.section`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Title = styled.h1`
    font-size: 6rem;    

    @media (max-width: 768px) {
        font-size: 4rem;
    }
`;

const ErrorImage = styled.img`
    width: 18rem;    
    height: auto;

    @media (max-width: 768px) {
        width: 15rem;
    }
`;

const Description = styled.p`
    font-size: 1.5rem;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

const ActionNav = styled.nav`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;    
`;