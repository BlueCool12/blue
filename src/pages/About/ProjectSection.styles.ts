import styled from "styled-components";

export const ProjectArea = styled.section`
    display: flex;
    gap: 10px;
    padding: 0 30px;

    @media (max-width: 768px) {
        flex-direction: column;        
    }
`;

export const Aside = styled.aside`
    flex: 2;        
    padding: 24px 18px;

    background-color: ${({ theme }) => theme.cardBg};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;

    nav {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;

export const ProjectItem = styled.button<{ isActive: boolean }>`    
    cursor: pointer;    

    font-size: 16px;

    color: ${({ isActive, theme }) =>
        isActive ? theme.linkHoverColor : theme.textColor};

    span {
        display: inline-block;
        border-bottom: ${({ isActive, theme }) => isActive ? `2px solid ${theme.linkHoverColor}` : 'none'};
        transition: border-bottom 0.2s ease;
    } 

    &:hover {
        color: ${({ theme }) => theme.linkHoverColor};
    }
`;

export const Article = styled.article`
    flex: 8;
    padding: 18px 32px;

    background-color: ${({ theme }) => theme.cardBg};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;

    h2 {
        padding: 12px;
        text-align: center;
        border: ${({ theme }) => `1px solid ${theme.borderColor}`};
        background-color: ${({ theme }) => theme.selectionBg};
    }

    p { 
        font-size: 18px;
        margin: 12px 0;     
        display: flex;
        align-items: center;
        gap: 6px;
    }

    h4 {
        display: flex;
        gap: 6px;
        align-items: center;        
        font-size: 18px;
        font-weight: 600;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 12px 8px;
        list-style: none;
        margin-top: 12px;
        padding: 0;
    }

    li {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 4px 10px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 800;
        color: #fff;
        text-align: center;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);

        word-break: break-word;
        white-space: normal;
    }
`;