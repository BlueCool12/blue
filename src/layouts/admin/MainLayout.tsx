import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const MainLayout = () => {

    return (
        <Wrapper>
            <Header>BlueCool12</Header>
            <Body>
                <Sidebar>
                    <NavItem to="/admin">대시보드</NavItem>
                    <NavItem to="/admin/posts">글 목록</NavItem>
                    <NavItem to="/admin/posts/write">글 작성</NavItem>
                </Sidebar>
                <Main>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Outlet />
                    </Suspense>
                </Main>
            </Body>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const Header = styled.header`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 24px;
    background-color: ${({ theme }) => theme.headerBg};
    color: ${({ theme }) => theme.headerTextColor};
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Body = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    min-width: 0;
`;

const Sidebar = styled.nav`
    width: 240px;
    min-width: 240px;
    background-color: ${({ theme }) => theme.footerBg};
    color: ${({ theme }) => theme.footerTextColor};
    padding: 20px;
    border-right: 1px solid ${({ theme }) => theme.borderColor};
    overflow-y: auto;
`;

const NavItem = styled(Link)`
    display: block;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.textColor};
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: ${({ theme }) => theme.linkHoverColor};
    }
`;

const Main = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
`;
