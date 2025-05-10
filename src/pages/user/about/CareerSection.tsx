import styled from "styled-components";

export const CareerSection = () => {

    const careers = [
        { date: '2025.03 ~ Now', title: '바로연' },
        { date: '2024.03 ~ 2024.08', title: '중앙정보처리학원' },
    ];

    return (
        <>
            <TimelineWrapper>
                <VerticalLine />
                {careers.map((career, index) => (
                    <TimelineItem key={index}>
                        <Dot isLast={index === careers.length - 1} />
                        <Content isLeft={index % 2 === 0}>
                            <Date>{career.date}</Date>
                            <Title>{career.title}</Title>
                        </Content>
                    </TimelineItem>
                ))}
            </TimelineWrapper>
        </>
    );
};

const TimelineWrapper = styled.section`
    position: relative;    
    margin: 40px 0;    
`;

const TimelineItem = styled.div`
    position: relative;    
    width: 100%;
    margin-bottom: 32px;    
    display: flex;
    justify-content: center;
`;

const VerticalLine = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.themeColor5};
    transform: translateX(-50%);    
`;

const Dot = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLast',
}) <{ isLast: boolean }>`
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.bgColor};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;    
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;

    background-color: ${({ isLast, theme }) => isLast ? theme.bgColor : theme.themeColor5};

    border: 2px solid ${({ theme }) => theme.themeColor5};
`;

const Content = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLeft',
}) <{ isLeft: boolean }>`    
    display: flex;
    flex-direction: column;
    text-align: ${({ isLeft }) => (isLeft ? 'right' : 'left')};
    align-items: ${({ isLeft }) => (isLeft ? "flex-end" : "flex-start")};
    margin-left: ${({ isLeft }) => (isLeft ? "0" : "160px")};
    margin-right: ${({ isLeft }) => (isLeft ? "160px" : "0")};
`;

const Date = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textColor};
`;

const Title = styled.h4`
    font-size: 16px;
    font-weight: 700;
    margin: 4px 0;
`;