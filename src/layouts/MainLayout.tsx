import styled from "styled-components";
import Header from "../components/Header";

type Props = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {

    return (
        <LayoutWrapper>
            <Header />
            <Content>{children}</Content>
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
    padding-top: ${({ theme }) => theme.layout.headerHeight.desktop}px; /* 헤더가 fixed이므로 위쪽 여백 */

    @media (max-width: 768px) {
        padding-top: ${({ theme }) => theme.layout.headerHeight.mobile}px;
    }

    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 40px;
    max-width: 800px;
    margin: 0 auto;
`;