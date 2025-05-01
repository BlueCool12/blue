import { Link } from 'react-router-dom';
import * as S from './DesktopNav.styles';

const DesktopNav = () => {

    return (
        <S.DesktopNav>
            <ul>
                <S.NavItem>
                    <Link to='/About'>ABOUT</Link>
                </S.NavItem>
                <S.NavItem>
                    <Link to='/Posts'>POSTS</Link>
                </S.NavItem>
                <S.NavItem>
                    <Link to='/Guestbooks'>GUESTBOOK</Link>
                </S.NavItem>
            </ul>
        </S.DesktopNav>
    );
};

export default DesktopNav;