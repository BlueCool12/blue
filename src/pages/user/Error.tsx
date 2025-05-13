import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ErrorImg from '../../assets/images/BlueCoolError.png';
import { OutlineButton } from "../../components/common/OutlineButton";

interface ErrorProps {
    message?: string;
}

const Error = ({ message }: ErrorProps) => {

    const navigate = useNavigate();

    return (
        <>
            <NotFoundMain>
                <TitleSection>
                    <Title>{message}</Title>
                    <ErrorImage src={ErrorImg} />
                </TitleSection>

                <ActionNav>
                    <OutlineButton type="button" icon="home" label="메인 페이지" onClick={() => navigate('/')}></OutlineButton>
                    <OutlineButton type="button" icon="history" label="이전 페이지" onClick={() => navigate(-1)}></OutlineButton>
                </ActionNav>

            </NotFoundMain>

        </>
    );
}

export default Error;

const NotFoundMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;    
    height: 80vh;

    @media (max-width: 768px) {
        height: 80vh;
    }
`;

const TitleSection = styled.section`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Title = styled.h1`
    font-size: 2rem;    
`;

const ErrorImage = styled.img`
    width: 280px;    
    height: auto;

    @media (max-width: 768px) {
        margin-top: 14px;
    }
`;

const ActionNav = styled.nav`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;    
`;