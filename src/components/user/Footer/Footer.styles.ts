import styled from "styled-components";

export const FooterWrapper = styled.footer`
    width: 100%;
    padding: ${({ theme }) => `${theme.layout.footerHeight.desktop}px`} 0;
    text-align: center;
    background-color: ${({ theme }) => theme.footerBg};
    color: ${({ theme }) => theme.footerTextColor};

    @media (max-width: 768px) {
        padding: ${({ theme }) => `${theme.layout.footerHeight.mobile}px`} 0;
    }
`;

export const FooterContent = styled.div`
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    padding: 0 20px;
`;

export const IconWrapper = styled.div`
    display: flex;    
    gap: 12px;
`;

export const IconLink = styled.a`
    display: inline-block;
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    & svg path {
        fill: ${({ theme }) => theme.footerTextColor};
        transition: fill 0.3s ease;
    }

    &:hover svg path {
        fill: #6e40c9;
    }
`;

export const SvgIcon = styled.svg`
    width: 24px;
    height: 24px;    
`;

export const FooterText = styled.p`
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.footerTextColor};
`;