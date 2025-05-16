import styled from "styled-components";

export const MobileMenu = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'active'
}) <{ active: boolean }>`  
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px;
    background: ${({ theme }) => theme.mobileMenuBg};
    color: ${({ theme }) => theme.mobileMenuTextColor};    
`;

export const MobileMenuHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
`;

export const MobileLogo = styled.div`
    height: 36px;

    img {
        max-height: 100%;
        object-fit: cover;
    }
`;

export const MobileNav = styled.ul`
    list-style: none;
    padding: 2rem 0;
    text-align: center;    
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {        
        font-size: 1rem;
        font-weight: 600;
    }
`;