import * as S from './MobileMenu.styles';
import menuLogo from '../../../assets/images/logo/small.png';
import menuLogo_dark from '../../../assets/images/logo/small_dark.png';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface Props {
    onClose: () => void;
}

const MobileMenu = ({ onClose }: Props) => {

    const { themeMode } = useThemeMode();

    return (
        <S.MobileMenu active={true} >
            <S.MobileMenuHeader>
                <span onClick={onClose} className="material-symbols-rounded">
                    close
                </span>
            </S.MobileMenuHeader>

            <S.MobileLogo>
                <img src={themeMode === 'light' ? menuLogo : menuLogo_dark} alt='Logo' />
            </S.MobileLogo>

            <S.MobileNav>
                <li><Link to='/about' onClick={onClose}>ABOUT</Link></li>
                <li>POSTS</li>
                <li>GUESTBOOK</li>
            </S.MobileNav>
        </S.MobileMenu >
    );
};

export default MobileMenu;