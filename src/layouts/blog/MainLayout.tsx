import styled from "styled-components";
import { Header } from "../../components/blog/Header";
import { Footer } from "../../components/blog/Footer";
import { Outlet } from "react-router-dom";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { Suspense } from "react";

export const MainLayout = () => {

    return (
        <LayoutWrapper>
            <Header />
            <Content>
                <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                </Suspense>
            </Content>
            <Footer />
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.main`
    flex: 1;
    padding-top: ${({ theme }) => theme.layout.headerHeight.desktop}px;
    padding-bottom: ${({ theme }) => theme.layout.footerHeight.desktop}px;

    @media (max-width: 768px) {
        padding-top: ${({ theme }) => theme.layout.headerHeight.mobile}px;
        padding-bottom: ${({ theme }) => theme.layout.footerHeight.mobile}px;
    }

    padding-left: 16px;
    padding-right: 16px;    
    max-width: 960px;
    margin: 0 auto;
`;