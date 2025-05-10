import styled from "styled-components";
import { Header } from "../../components/user/Header";
import { Footer } from "../../components/user/Footer";
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
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding-left: 16px;
    padding-right: 16px;    

    padding-top: ${({ theme }) => theme.layout.headerHeight.desktop}px;
    padding-bottom: ${({ theme }) => theme.layout.footerHeight.desktop}px;
    
    @media (max-width: 768px) {
        max-width: 100%;
        padding-top: ${({ theme }) => theme.layout.headerHeight.mobile}px;
        padding-bottom: ${({ theme }) => theme.layout.footerHeight.mobile}px;
    }

`;