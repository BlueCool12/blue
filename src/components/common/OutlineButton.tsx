import styled from "styled-components";

const StyledOutlineButton = styled.button`
    display: flex;
    gap: 1px;
    align-items: center;
    padding: 12px 20px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-color);
    transition: background-color 0.3s;
    font-size: 14px;        

    &:hover {
        background-color: var(--contrast-bg-color);
        color: var(--contrast-text-color);
    }    
`;

interface OutlineButtonProps {
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
}

export const OutlineButton = ({ type = 'button', icon, label, onClick }: OutlineButtonProps) => {

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <StyledOutlineButton onClick={handleClick} type={type}>
            {icon && icon}
            {label}
        </StyledOutlineButton>
    );
}