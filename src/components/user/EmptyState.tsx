import styled, { keyframes } from "styled-components";

import emptyLogo from '../../assets/images/empty_org.png';

export const EmptyState = ({ message }: { message?: string }) => {

    return (

        <Wrapper>
            <Illustration src={emptyLogo} alt="글이 없을때의 일러스트" />
            <Message>
                {message?.split("").map((char, idx) => char === " "
                    ? <span key={idx}>&nbsp;</span>
                    : (
                        <WobbleChar key={idx} $delay={idx * 0.12}>
                            {char}
                        </WobbleChar>
                    ))}
            </Message>
        </Wrapper>
    );
}

const Wrapper = styled.section`    
    display: flex;
    flex-direction: column;
    align-items: center;   
    justify-content: center;
    height: 80vh;
    gap: 2rem;
    padding: 3rem 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.textColor};
`;

const Illustration = styled.img`        
    border-radius: 100%;
    width: 100%;
    height: 100%;
    max-width: 20rem;
    max-height: 20rem;
    aspect-ratio: 1/1;
    object-fit: cover;        

    @media (max-width: 768px) {
        max-width: 15rem;
        max-height: 15rem;
    }
`;

const cry = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  30% {
    transform: translateY(2px) rotate(-1deg);
    opacity: 0.6;
  }
  60% {
    transform: translateY(-1px) rotate(1deg);
    opacity: 0.85;
  }
`;

const WobbleChar = styled.span<{ $delay: number }>`
  display: inline-block;
  animation: ${cry} 1.6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
`

const Message = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.textColor};    
`;