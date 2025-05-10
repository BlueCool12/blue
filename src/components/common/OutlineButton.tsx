import styled from "styled-components";

const StyledOutlineButton = styled.button`
    display: flex;
    gap: 1px;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 8px;
    color: ${({ theme }) => theme.textColor};
    transition: background-color 0.3s;
    font-size: 14px;

    &:hover {
        background-color: ${({ theme }) => theme.contrastBgColor};
        color: ${({ theme }) => theme.contrastTextColor};
    }
`;

interface OutlineButtonProps {
    type?: 'button' | 'submit' | 'reset';
    icon?: string;
    label: string;
    onClick?: () => void;
}

export const OutlineButton = ({ type = 'button', icon, label, onClick }: OutlineButtonProps) => {

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <StyledOutlineButton onClick={handleClick} type={type}>
            {icon && <span className="material-symbols-rounded">{icon}</span>}
            {label}
        </StyledOutlineButton>
    );
}