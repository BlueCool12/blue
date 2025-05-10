import { Link } from 'react-router-dom';
import * as S from './DesktopNav.styles';

const DesktopNav = () => {

    return (
        <S.DesktopNav>
            <ul>
                <S.NavItem>
                    <Link to='/about'>ABOUT</Link>
                </S.NavItem>
                <S.NavItem>
                    <Link to='/posts'>POSTS</Link>
                </S.NavItem>
                <S.NavItem>
                    <Link to='/guestbooks'>GUESTBOOK</Link>
                </S.NavItem>
            </ul>
        </S.DesktopNav>
    );
};

export default DesktopNav;