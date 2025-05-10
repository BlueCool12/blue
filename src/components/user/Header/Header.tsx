import { useState } from 'react';
import { HeaderWrapper, HeaderInner, Logo, Icons, MobileMenuToggle } from './Header.styles';
import mainLogo from '../../../assets/images/logo/big.png';
import mainLogo_dark from '../../../assets/images/logo/big_dark.png';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { themeMode, toggleTheme } = useThemeMode();

    return (
        <>
            <HeaderWrapper>
                <HeaderInner>
                    <Logo>
                        <Link to='/'>
                            <img src={themeMode === 'light' ? mainLogo : mainLogo_dark} alt='Logo' />
                        </Link>
                    </Logo>

                    <DesktopNav />

                    <Icons>
                        <span
                            className="material-symbols-rounded"
                            onClick={toggleTheme}
                        >
                            {themeMode === 'light' ? 'dark_mode' : 'light_mode'}
                        </span>
                        <MobileMenuToggle
                            className="material-symbols-rounded"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            menu
                        </MobileMenuToggle>
                    </Icons>
                </HeaderInner>
            </HeaderWrapper>

            {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
        </>
    );
};