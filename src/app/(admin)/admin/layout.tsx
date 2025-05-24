'use client';

import { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <Wrapper>
            <Header>BlueCool12</Header>
            <Body>
                <Sidebar>
                    <NavItem href="/admin">대시보드</NavItem>
                    <NavItem href="/admin/posts">글 목록</NavItem>
                    <NavItem href="/admin/posts/write">글 작성</NavItem>
                </Sidebar>
                <Main>
                    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
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
    background-color: var(--header-bg);
    color: var(--header-text-color);
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);

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
    background-color: var(--footer-bg);
    color: var(--footer-text-color);
    padding: 20px;
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
`;

const NavItem = styled(Link)`
    display: block;
    margin-bottom: 12px;
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: var(--link-hover-color);
    }
`;

const Main = styled.main`
    flex: 1;
    overflow: auto;
    padding: 24px;
    background-color: var(--bg-color);
    color: var(--text-color);
    box-sizing: border-box;
    min-width: 0;    
`;
