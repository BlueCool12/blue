import React from "react"
import Header from "../components/Header";


type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    
    return (
        <div className="layout">
            <Header />

            <div className="content-wrapper">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li></li>
                        </ul>
                    </nav>
                </aside>

            </div>
        </div>
    )
};

export default MainLayout;