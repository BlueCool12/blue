import styled from "styled-components";

export const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background: ${({ theme }) => theme.headerBg};
    z-index: 1000;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const HeaderInner = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 15px 40px;

    @media (max-width: 768px) {
        padding: 12px 24px;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Logo = styled.div`
    height: 50px;

    @media (max-width: 768px) {
        height: 40px;
    }

    img {
        max-height: 100%;
        object-fit: cover;
        display: block;
    }
`;

export const Icons = styled.div`
    display: flex;
    column-gap: 20px;

    span {
        cursor: pointer;
    }
`;

export const MobileMenuToggle = styled.span`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
    }
`;