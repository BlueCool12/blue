import styled from "styled-components";
import BlueCool from '../../assets/images/BlueCool1.png';

export const HeroSection = () => {

    return (
        <>
            <Section>
                <Card>
                    <TextContent>
                        <Intro>안녕하세요 👋</Intro>
                        <Title>
                            저는 풀스택 개발자 <br />
                            <strong>BlueCool12</strong>입니다.
                        </Title>
                        <Email>
                            <span className="material-symbols-rounded">mail</span>
                            <a href="mailto:pmini1203@gmail.com">pmini1203@gmail.com</a>
                        </Email>

                    </TextContent>

                    <MascotWrapper>
                        <Mascot src={BlueCool} alt="BlueCool12 마스코트 이미지" />
                    </MascotWrapper>
                </Card>
            </Section>
        </>
    );
};

const Section = styled.section`
    width: 100%;
    padding: 30px;    
    padding-bottom: 0;
`;

const Card = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;    
    flex-wrap: wrap;

    background-color: ${({ theme }) => theme.cardBg};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 28px 34px;
    gap: 24px;

    width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        text-align: center;
    }
`;

const TextContent = styled.div`
    flex: 6;        
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Intro = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.textColor};    
`;

const Title = styled.h1`
    text-align: center;
    font-size: 22px;
    font-weight: 600;   
    line-height: 1.5;
    
    strong {
        color: ${({ theme }) => theme.textColor};
    }
`;

const Email = styled.p`    
    font-size: 14px;    
    display: flex;
    align-items: center;    
    gap: 6px;
    margin-top: auto;
    margin-bottom: 0;

    @media (max-width: 768px) {
        margin-top: 18px;
        justify-content: center;        
    }
`;

const MascotWrapper = styled.div`
    flex: 4;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-width: 120px;
    justify-content: end;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const Mascot = styled.img`
    width: 100%;
    max-width: 160px;
    height: auto;
    object-fit: contain;    

    @media (max-width: 768px) {
        max-width: 120px;
    }

    animation: fadeIn 0.8s ease-in;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;