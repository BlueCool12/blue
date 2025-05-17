import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ErrorImg from '../../assets/images/Error2.png';
import { OutlineButton } from "../../components/common/OutlineButton";

interface ErrorProps {
    message?: string;
}

const Error = ({ message }: ErrorProps) => {

    const navigate = useNavigate();

    return (
        <NotFoundMain>
            
            <TitleSection>
                <ErrorImage src={ErrorImg} />
                <Title>{message}</Title>
            </TitleSection>

            <ActionNav>
                <OutlineButton type="button" icon="home" label="메인 페이지" onClick={() => navigate('/')}></OutlineButton>
                <OutlineButton type="button" icon="history" label="이전 페이지" onClick={() => navigate(-1)}></OutlineButton>
            </ActionNav>

        </NotFoundMain>
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
    flex-direction: column;   
    align-items: center;
    gap: 16px;
    margin-bottom: 3rem;    
`;

const Title = styled.h1`
    font-size: 1.5rem;       
`;

const ErrorImage = styled.img`    
    width: 16rem;    
    height: auto;

    @media (max-width: 768px) {
        width: 14rem;
        margin-top: 14px;
    }
`;

const ActionNav = styled.nav`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;    
`;