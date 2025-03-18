import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import NavBar from './NavBar';
import LoginModal from './LoginModal';

const Header: React.FC = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const toggleMenu = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <header className="header">
            <div className='header-container'>                

                {/* 네비게이션 */}
                <NavBar />

                {/* 로고 */}
                <Link to="/">
                    <img className='logo' src='/main_logo.png'></img>
                </Link>

                {/* 관리자 모드 버튼 */}
                <button className='admin-button' onClick={() => setIsLoginModalOpen(true)}>
                    <span className="material-symbols-rounded">
                        person
                    </span>
                </button>

                {/* 다크 모드 토글 */}
                <button onClick={toggleTheme} className="theme-toggle">
                    <span className="material-symbols-rounded">
                        {theme === "light" ? "dark_mode" : "light_mode"}
                    </span>
                </button>


                {/* 햄버거 버튼 (모바일 전용) */}
                <button className="menu-toggle material-symbols-rounded" onClick={toggleMenu}>
                    menu
                </button>

                {/* Offcanvas 네비게이션 (모바일용) */}
                <div className={`offcanvas-nav ${isOffcanvasOpen ? "offcanvas-open" : ""}`}>
                    <button className="close-btn" onClick={toggleMenu}>✖</button>
                    <ul className="nav-list">
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                        <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
                    </ul>
                </div>
            </div>

            {/* 관리자 로그인 모달 */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Header;