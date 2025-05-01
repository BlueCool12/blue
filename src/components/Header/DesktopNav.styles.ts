import styled from "styled-components";

export const Nav = styled.nav`
  ul {
    display: flex;
    gap: 50px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const NavItem = styled.li`
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.headerTextColor};
  position: relative;

  &:hover {
    color: ${({theme}) => theme.linkHoverColor};
  }
`;

export const DesktopNav = styled(Nav)`
  @media (max-width: 768px) {
    display: none;
  }
`;